'use strict'

// TODO -> come up with cleaner way of keeping track
// TODO... of update count, preventing bump-version, etc
var _global = { DEV_MODE : false };

var gulp          = require('gulp'),
    uglify        = require('gulp-uglify'),
    pkg           = require('./package.json'),
    source        = require('vinyl-source-stream'),
    buffer        = require('vinyl-buffer'),
    browserify    = require('browserify'),
    watchify      = require('watchify'),
    babelify      = require('babelify'),
    streamify     = require('gulp-streamify'),
    envify        = require('envify/custom'),
    fs            = require('fs'),
    colors        = require('colors'),
    imagemin      = require('gulp-imagemin'),
    useref        = require('gulp-useref'),
    gulpIf        = require('gulp-if'),
    cleanCss      = require('gulp-clean-css'),
    replace       = require('gulp-replace'),
    runSequence   = require('run-sequence'),
    notifier      = require('node-notifier'),
    gulpUtil      = require('gulp-util'),
    stripDebug    = require('gulp-strip-debug'),
    argv          = require('yargs').argv,
    figlet        = require('figlet'),
    Table         = require('cli-table'),
    liveReactLoad = require('livereactload'),
    liveReload    = null;

// build configuration

const Flags =
{
    version_bump      :
    {
        defaultValue : true,
        description  : 'Whether or not to bump versions on successive updates when building'
    },
    success_notice    :
    {
        defaultValue : true,
        description  : 'Displays a success notice in the OS when build is successful'
    },
    error_notice :
    {
        defaultValue : true,
        description  : 'Displays an error notice in the OS when a build fails'
    },
    error_sound       :
    {
        defaultValue : false,
        description  : 'Play a sound when there is an error'
    },
    build_js_debug    :
    {
        defaultValue : false,
        description  : 'Whether or not to include source ' +
        'maps in Javascript release builds'
    },
    export_standalone   :
    {
        defaultValue : false,
        description  : 'Automatically generate a build folder ' +
                        'corresponding to the time you created' +
                        'your package via a builds/[current_date] folder/'
    }
};

// set up build paths config
const Paths   = require('./build-config/paths.json');

// set up module aliases
const AliasesSrc = require('./build-config/aliases.json');
const Aliases = Object.keys(AliasesSrc)
    .reduce((aliases,a)=>
    {
        return aliases.concat({ src:AliasesSrc[a], expose:a });
    }, []);

// assign flag values based on Flags
let FlagValues = {};
Object.keys(Flags).forEach((flag)=>
{
    if(typeof argv[flag] === 'undefined')
    {
        FlagValues[flag] = Flags[flag].defaultValue;
    }
    else { FlagValues[flag] = argv[flag]; }
});

const BABELIFY_CONFIG =
    {
        extensions : [ '.js', '.jsx' ],
        presets    : [ 'es2015', 'react', 'stage-2', 'stage-3' ],
        plugins :
        [
            'transform-remove-strict-mode',
            'transform-decorators-legacy',
            'add-module-exports',
            'react-hot-loader/babel',
            ['module-alias', Aliases]
        ]
    };

const WATCHIFY_CONFIG =
    {
        poll  : true,
        ignoreWatch: ['**/node_modes/**']
    };

let versionFileContent = fs.readFileSync(Paths.VERSION_CONFIG_FILE, 'utf8'),
    updateCount  = 0,
    successNoticeCount = 0,
    timeProcessedCount = 0,
    latestVersion = '---',
    latestVersionBuilt = versionFileContent.match(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi)[0];

let getLatestVersionStrInFile = ()=>
{
    let fileContent = fs.readFileSync(Paths.VERSION_CONFIG_FILE, 'utf8');
    if(fileContent !== null && fileContent.match(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi))
    {
        return fileContent.match(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi)[0];
    }
};

let Notices =
    {
        buildSuccess (p)
        {
            notifier.notify(
                {
                    title   : 'Build Successful',
                    message : p.message, sound : false
                });
        },
        /**
         * @param p
         * @param p.message
         */
        errorBuilding (p)
        {
            if(FlagValues.error_notices)
            {
                notifier.notify(
                    {
                        title   : 'Error Building',
                        message : p.message,
                        sound   : FlagValues.error_sound
                    });
            }
        },
        watchingFiles ()
        {
            notifier.notify(
                {
                    title   : 'Watching ' + Paths.DEST_DEV,
                    message : 'Ready to watch for file changes to ' +
                    'build into ' + Paths.DEST_PROD,
                    sound   : false
                });
        }
    };

/** various logging functions */
let Log =
{
    updateBuild (files, updateCountShown)
    {
        if(!Array.isArray(files)) { files = Array.from([files]); }
        files = files.map((file,i)=>
        {
            let dirNameIndex = file.toLowerCase().indexOf(__dirname.toLowerCase());
            return '['+(i+1)+'] '+((dirNameIndex!=-1) ?
                    file.substr(dirNameIndex+__dirname.length+1+Paths.ENTRY_FOLDER.length) :
                    file).bold.magenta;
        });
        console.log('\nFile changes detected ->\n', files.join('\n'), '\n');

        var updatedAt        = new Date(),
            updatedAtDisplay = `[${updatedAt.getHours()}:${updatedAt.getMinutes()}:${(updatedAt.getMilliseconds()+'').substr(0,2)}]`.gray;

        if(updateCountShown)
        {
            console.log(updatedAtDisplay + 'Updated source files ' +
                (++updateCount + '').bold.magenta + ' time' +
                ((updateCount == 1) ? '' : 's') + '. \n');
        }
    },
    watchStarted ()
    {
        console.log(`Getting ready to watching for file changes to build to 
            [${Paths.DEST_PROD.bold}]\n`);
    },
    startNotice (mode)
    {
        let appPrintOut = '\n' + figlet.textSync(pkg.name,
                {
                    font: 'Slant',
                    horizontalLayout: 'default',
                    verticalLayout: 'default'
                });

        console.log(appPrintOut);
        console.log(`\t\tSource Code Builder\n`);
        console.log(`> Running in ${mode == 'build' ? 'Build':'Dev'} Mode\n`);
        console.log('[ gulp tasks: build \u2022 dev-server (default) \u2022 dev ]\n');

        Log.listFlags();

        if(mode != 'build')
        {
            console.log('Note : Initial build may take a bit of time on the first run before cache-ing...\n');
        }
    },
    buildMessage (message)
    {
        if(latestVersionBuilt == getLatestVersionStrInFile())
        {
            console.log(message + '\n');
        }
    },
    errorWhileRebuilding (err)
    {
        var errorAt = new Date(),
            errorAtDisplay = `${errorAt.getHours()}:${errorAt.getMinutes()}.${errorAt.getMilliseconds()}`;
        console.log(`${errorAtDisplay} ${`error occurred during build:\n\t${err.message.red.bold}\n`}`);
        console.log(`Even though building may have finished successfully, ${''
            }there was an error compiling the app sourcecode. ${''
            }This may lead to errors\n`);
    },
    listFlags ()
    {
        let flagTable = new Table(
        {
            head : ['flag'.gray, 'status'.gray, 'description'.gray],
            colWidths: [20, 10, 60]
        });

        for(var flagName in FlagValues)
        {
            let flagValue       = FlagValues[flagName],
                flagDescription = Flags[flagName].description;

            if(flagValue)
            {
                flagValue= flagValue.toString();
            }
            else
            {
                flagValue = flagValue.toString();
            }

            flagTable.push([flagName, flagValue, flagDescription]);
        }
        console.log(flagTable.toString().gray);
        console.log('\n');
    }
};

let Events =
    {
        codebaseUpdated (ms)
        {
            if(updateCount == 0)    // fix for initial build
            {
                latestVersionBuilt = getLatestVersionStrInFile();
                updateCount++;
            }
            if((latestVersionBuilt == getLatestVersionStrInFile()) && successNoticeCount <= updateCount)
            {
                successNoticeCount += 1;
                let version = getLatestVersionStrInFile().match(/([\d]+)[\.]([\d]+)[\.]([\d]+)/gi)[0];
                let getMessage = (osNotice)=>
                {
                    let seconds = ((parseInt(ms)/1000) + ''),
                        printedVersion = version;

                    if(!osNotice)
                    {
                        seconds = seconds.yellow.bold;
                        printedVersion = printedVersion.yellow.bold;
                        return `Successfully compiled source files in ${seconds} seconds.${''+
                        ' '}Build file now on version ${printedVersion}`;
                    }
                    else { return `v${printedVersion} (${seconds}s)`; }
                };

                Log.buildMessage(getMessage(false));
                if(FlagValues.success_notice)
                {
                    notifier.notify({ title : 'Successful build', message : getMessage(true), sound : false });
                }
            }
        }
    };

/**
 *  Builds our javascript code into output; can pass watch var depending on build or dev mode
 *
 * @param p
 * @param p.watch true - dev mode; will continuously watch. false - build mode; builds once
 */
function scripts(p)
{
    let watch = (typeof p.watch !== 'undefined') ?
        p.watch : true;

    //set up our watcher
    let b = browserify(
        {
            extensions   : ['.js', '.json', '.es6', '.jsx'],
            entries      : [Paths.ENTRY_POINT],
            global       : true,
            debug        : _global.DEV_MODE,
            cache        : {},
            packageCache : {},
            plugin       : watch ? [ liveReactLoad ] : []
        }).transform(babelify.configure(BABELIFY_CONFIG))
        .transform(envify({ NODE_ENV: _global.DEV_MODE ? 'development' : 'production' }));

    // wrap in watchify
    if(watch) { b = watchify(b, WATCHIFY_CONFIG); }

    b.on('error', (err)=>
    {
        if(watch) { Log.errorWhileRebuilding(err); }
        else      { Log.errorWhileRebuilding(err);        }
        Notices.errorBuilding({ message : err.message })
    });

    // add a timeout so that updated version registers
    b.on('time',Events.codebaseUpdated);

    /**
     *  sets up the actual js file-bundling logic
     */
    let getBuildStream = function(rebuild)
    {
        var stream = b.bundle();
        stream.on('error', (err)=>
        {
            if(watch) { Log.errorWhileRebuilding(err); }
            else      { Log.errorWhileRebuilding(err); }
            Notices.errorBuilding({ message : err.message });
        });

        //bundle files into build.js
        stream = stream.pipe(source(Paths.BUILDJS_OUT));

        if(watch && rebuild)
        {
            return stream.pipe(gulp.dest(Paths.DEST_DEV));
        }
        else { return stream; }
    };

    if(watch)
    {
        b.on('update', function(files)
        {
            // first make sure version actually changed before building
            // if version already bumped, build the files
            // otherwise, simply re-set up bundler to watch again
            let versionAlreadyBumped = ((latestVersionBuilt != getLatestVersionStrInFile()));
            Log.updateBuild(files,versionAlreadyBumped);

            if(versionAlreadyBumped)
            {
                latestVersionBuilt = getLatestVersionStrInFile();
                return getBuildStream(true);
            }
            else
            {
                runSequence('check-for-version-bump', ()=>(getBuildStream(updateCount === 0)));
            }
        });
    }

    if(watch)
    {
        return runSequence('check-for-version-bump', ()=>
        {
            return getBuildStream(true)
        });
    }
    else { return getBuildStream(true); }
};

gulp.task('dev', function()
{
    _global.DEV_MODE = true;
    Log.startNotice('dev');
    return scripts({ watch : true });
});

gulp.task('dev-server', ['dev'], function()
{
    liveReload    = require('gulp-server-livereload');
    _global.DEV_MODE = true;
    return gulp.src(Paths.DEST_DEV)
        .pipe(liveReload(
        {
            host: '0.0.0.0',
            port: 8080
            // TODO | configure live reload
            // TODO | to react to CSS/static asset
            // TODO | changes. currently just JS
        }));
});

gulp.task('html-ref-and-concat-css', function()
{
    return gulp.src(Paths.DEST_DEV + '/index.html')
        .pipe(gulpIf('*.css', cleanCss()))  // minify css files
        .pipe(useref())                     // for html build file markup
        .pipe(gulp.dest(Paths.DEST_PROD));
});

gulp.task('minify-images', function()
{
    return gulp.src(Paths.DEST_DEV + '/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest(Paths.DEST_PROD));
});

gulp.task('copy-extra-to-build', function()
{
    return gulp.src(Paths.DIST_DEV_FILES)
        .pipe(gulp.dest(Paths.DEST_PROD));
});

gulp.task('check-for-version-bump', function()
{
    // first make sure version built is up to date before bumping twice
    let versionFileContent = fs.readFileSync(Paths.VERSION_CONFIG_FILE, 'utf8');
    let versionShouldBeBumped = (versionFileContent.indexOf(latestVersionBuilt) != -1)
        && FlagValues.version_bump;
    if(versionShouldBeBumped)
    {
        return gulp.src([Paths.VERSION_CONFIG_FILE])
            .pipe(replace(/VERSION[\s]*:[\s]*'([\d]+)[\.]([\d]+)[\.]([\d]+)'/gi,
                (vString, major, minor, patch)=>
                {
                    let nextVersion = `VERSION : '${major}.${minor}.${parseInt(patch)+1}'`;
                    return (latestVersion = nextVersion, nextVersion);
                })).pipe(gulp.dest(Paths.VERSION_CONFIG_DIR));
    }
    else return;
});

gulp.task('apply-prod-environment', function()
{
    process.env.NODE_ENV = 'production';
});
gulp.task('welcome-build-notice', function()
{
    Log.startNotice('build');
});

gulp.task('welcome-dev-notice', function()
{
    Log.startNotice('dev');
});

gulp.task('create-js-build', function()
{
    _global.DEV_MODE = false;
    if(FlagValues.build_js_debug)
    {
        return scripts({ watch : false })
            .pipe(buffer())
            .pipe(uglify().on('error', gulpUtil.log))
            .pipe(gulp.dest(Paths.DEST_PROD));
    }
    else
    {
        return scripts({ watch : false })
            .pipe(buffer())
            .pipe(uglify().on('error', gulpUtil.log))
            .pipe(stripDebug())                         //remove console logging
            .pipe(gulp.dest(Paths.DEST_PROD));
    }
});

gulp.task('build', function()
{
    return runSequence(
        'welcome-build-notice',
        'apply-prod-environment',
        [
            'copy-extra-to-build',
            'html-ref-and-concat-css',
            'minify-images',
            'create-js-build',
        ],
        'export-standalone-build'
    );
});

gulp.task('export-standalone-build', ()=>
{
    if(FlagValues.export_standalone)
    {
        let moment = require('moment'),
            packageDir = moment(new Date()).format('YYYY-MM-DD-HHmmss');

        if(fs.existsSync(packageDir + '/'))
        {
            let charSuffix = 'a';

            while(!fs.existsSync(`${packageDir}(${charSuffix})/`))
            {
                charSuffix++;
            }
            packageDir = `${packageDir}(${charSuffix})`;
        }

        let buildDir = `./builds/${packageDir}/`;
        if(!fs.existsSync('./builds/'))
        {
            fs.mkdirSync('./builds/');
        }
        fs.mkdirSync(buildDir);
        console.log(`Creating an exportable production build at:\n\t${buildDir}`);

        return gulp.src(Paths.BUILD_PACKAGE_SOURCES)
            .pipe(gulp.dest(buildDir));
    }
});

gulp.task('default', ['dev-server']);