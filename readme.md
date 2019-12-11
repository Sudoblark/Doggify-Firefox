# Doggify
[![Github latest release](https://img.shields.io/badge/Github%20Latest%20Release-1.1.0-green.svg)](https://github.com/Sudoblark/Doggify-Firefox/releases)

[![Firefox stable release](https://img.shields.io/badge/Firefox%20Stable%20Release-1.1.0-green.svg)](https://addons.mozilla.org/en-GB/firefox/addon/doggify/)

This is an extension for firefox that will let you:
- Automatically replace all images on a webpage with doggos
- Change your preference for what breed of doggo is displayed via an addon settings menu
- Right click an image and doggify it

You can turn off the automatic replacment of images in the extension's settings menu.

## Acknowledgements
Icon by [Freepik](https://www.flaticon.com/authors/freepik) from [Flaticon](www.flaticon.com)

Uses the [dog-ceo-api](https://dog.ceo/dog-api/) by [ElliottLandsborough](https://github.com/ElliottLandsborough) with the source code in this [repo](https://github.com/ElliottLandsborough/dog-ceo-api)


## Overview
### Continous Doggos
When enabled the plugin will automatically replace all images on a webpage with dogs.

Say for example someone is searching for some nasty cades on google images. Normally, they would see something similar to this:

![NastyCades](documentation/overview/NastyCades.PNG)

But once this extension is installed all we see are lovely doggos!

![LovelyDoggos](documentation/overview/LovelyDoggos.PNG)

### Doggify an image
This extension extends the Firefox context menu to include a "Doggify me!" option whenever clicking on an image:

![Doggify-me-pre](documentation/doggify/Doggify-me-pre.png)

If you select this option then the image in question will be changed to a doggo.

![Doggify-me-post](documentation/doggify/Doggify-me-post.PNG)


## Settings
This can be accessed in firefox by going to "options > addons > extensions > doggify > options".

![Doggify-me-post](documentation/settings/Settings.PNG)

Remember to "save" when you make changes to the settings menu!

## Future Plans
- Every x seconds search the current webpage for non-doggo images and replace them, this will ensure dynamically loaded cades are replaced with doggos

## Setup Checklist

Simply add the extension in Firefox: https://addons.mozilla.org/en-GB/firefox/addon/doggify/

## Development/Debugging
- Download repo
- Open the [about:debugging](https://developer.mozilla.org/en-US/docs/Tools/about:debugging) page in Firefox
- Navigate to the repo and select the ```manifest.json``` file
- Select "Inspect" to see the web console for the settings page
- Continous doggos loads via a content script injected onto the page, so first you'll need to open a web console on that page and then refresh to see the console

Note: Adding an extension via the method above only adds it for that session of Firefox; if you close then start Firefox again the Doggify extension will not be loaded.

Any changes you make to existing files should update automatically on a refresh, although sometimes you'll need to close and open Firefox again.

## Compatibility
- The iteration of images HTMLCollection is done via the following syntax:

```js
for (let image of imagecollection ) {
    // stuff
}
```

- HTMLCollection seems to be compatible on most modern browsers: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
- Let seems to also be compatible on most modern browser, with IE needing to be at least version 11: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
