# client-app
[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?)](https://github.com/prettier/prettier)

The client-facing application of The Stuyvesant Spectator, built in [React](https://github.com/facebook/react).

## Contributing

We welcome pull requests from Spec Web developerse and seasoned JavaScript developers alike! Please follow [these steps](CONTRIBUTING.md) to contribute.

## Roadmap

For information on the things which are currently being focused on, please visit the [ROADMAP.md](ROADMAP.md) file.

## Issuu

We use Issuu to host our newspaper PDFs. Every time we send, we have to upload the PDF to this platform and embed it into the website. Here are the instructions:

1. Sign in to <https://issuu.com/> (ask previous editors for credentials).

2. Click the upload icon in the navigation bar and select the newest issue's PDF file. 

3. Name the publication with the format "Volume XXX, Issue N". For the original publication date, use the date printed on the issue. Don't check any of the boxes and click "Publish Now".

4. Go to the [publication list](https://issuu.com/home/publications) and click the `Embed` option for the issue you just published.

5. Go to the "First, the basics." section and change the background color to `#333333`.

6. Scroll down and click "Save & Get Code". Choose the `iFrame` option. It looks something like this:
```
<iframe style="..." src="//e.issuu.com/embed.html#FIRST_NUMBER/SECOND_NUMBER" frameborder="0" allowfullscreen></iframe>
```

7. Copy the SECOND\_NUMBER and, in the constants file, set the `ISSUU_CONFIG` to that number.
```
export const ISSUU_CONFIG = SECOND_NUMBER;
```

## Deploying

We use CircleCI for continuous integration. If you push to the `staging` branch, the code will be synced to our staging S3 bucket. If you push to `master`, it will be synced to the prod bucket (`stuyspec`).

