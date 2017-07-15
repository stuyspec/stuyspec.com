'use strict'
/*
 *
 * command line arguments
 *
 * https    : whether to run in HTTPS mode
 * ssl_cert : location of ssl certificate file  (default: ./certs/key.pem)
 * ssl_key  : location of ssl key file          (default: ./certs/cert.pem)
 * ssl_ca   : location of ca file if using one  (default: ./certs/ca.pem)
 */
//creating a globally viewable basepath (typically bad-practice)
global.__base = __dirname + '/';

let express   = require('express'),
    path      = require('path'),
    fs        = require('fs'),
    app       = express(),
    http      = require('http'),
    https     = require('https'),
    argv      = require('yargs').argv,        //grabs our app arguments
    colors    = require('colors'),
    Paths     = require('./build-config/paths'),
    RUNTIME   = { PORT : argv.port || 3002 },
    codeDir   = argv.dev ? Paths.DEST_DEV : Paths.DEST_PROD,
    SSL       = (()=>
    {
        if(argv.https)
        {
            let certPath = argv.ssl_cert,
                keyPath  = argv.ssl_key,
                caPath   = argv.ssl_ca,
                SSL      = { HTTPS   : true, options : {} };      

                if(caPath)
                {
                    SSL.options.ca = fs.readFileSync(caPath);
                }
                else if(keyPath && certPath)
                {
                    SSL.options.key  = fs.readFileSync(keyPath);
                    SSL.options.cert = fs.readFileSync(certPath);
                }
                else 
                {
                    console.error('https flag requires "cert" and "key" or "ca" file parameters');
                    process.exit();
                }

            return SSL;
        }
        else return { HTTPS : false };
    })();


//allow cross-domain data requests
let xDomainMiddleware = (req, res, next)=>
{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};

// disable layout
app.set("view options", {layout: false});
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//attach middleware to server
app.use(express.static(path.join(__dirname, codeDir)));
app.use(xDomainMiddleware);

console.log(__dirname + '/' + codeDir);

app.get('/', (req,res)=>
{
    res.render(__dirname + '/' + codeDir + '/index.html');
});


app.get('*', (req, res)=>
{
    res.send('<p>Sorry, the page you requested cannot be found. </p>');
});

let startServer = ((server)=>
{
    let host    = server.address().address,
        port    = server.address().port,
        version = require('./package.json').version,
        appName = require('./package.json').displayName,
        protocol= (SSL.HTTPS ? 'https' : 'http');

    host = ((host == '0.0.0.0'|| host == '::') ? 'localhost' : host);

    console.log('%s '.white + '[v%s] %s', appName, version, argv.dev ? '(DEV MODE)' : '');
    console.log('-> currently running at ' + protocol.blue.bold + '://%s:%s'.blue.bold +
                ' in HTTP %s mode', host, port, SSL.HTTPS ? 'Secure' : 'Insecure');
    if(!SSL.HTTPS)
    {
        console.log('(to enable HTTPS, run app with the flags "https", "ssl_cert" and "ssl_key")');
    }

    return server;
});


let server = (()=>
{
    let server;
    if(SSL.HTTPS)
    {
        server =  https.createServer(SSL.options, app).listen(RUNTIME.PORT, ()=>
        {
            startServer(server);
        });
    }
    else
    {
        server =  http.createServer(app).listen(RUNTIME.PORT, ()=>{ startServer(server); });
    }
})();