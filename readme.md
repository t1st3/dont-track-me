# dont-track-me [![Build Status](https://travis-ci.org/t1st3/dont-track-me.svg?branch=master)](https://travis-ci.org/t1st3/dont-track-me) [![codecov](https://codecov.io/gh/t1st3/dont-track-me/badge.svg?branch=master)](https://codecov.io/gh/t1st3/dont-track-me?branch=master)

> WebExtension that prevents you from being tracked by Facebook/Twitter when you browse the web.


## About

### Motivation

Thanks to "Share" buttons that are heavily present on the web, social networks can track what you do on the websites you visit, provided these websites have such social buttons. When a page you browse has, for example, a "Share on Facebook" button, then the button can gather some data about your browsing on that page and send it directly to Facebook! This is the kind of tracking this extension is all about: stop the social networks from tracking you when you you're not even browsing them.

Tracking your browsing left aside, the assets which need to be downloaded for the sake of these "Share" buttons are quite heavy. Downloading such assets considerably increase the load time of the pages you visit when those pages have "Share" buttons. So disabling the tracking also leads you to improved load times of the pages you love :) Nice, isn't it?

This browser extension makes it best of both worlds: prevent social networks from tracking your activity on the web, but still let you see your wall, your tweets when you browse the social networks directly. Social networks won't be able to track you unless you browse their own pages; on the rest of the web, you'll be free from their tracking.

But there is obviously a catch to all this: "Share" buttons and other social features probably won't work anymore on the websites you browse; **social things will break**.

This extension currently prevents you from being tracked by:

* Facebook
* Twitter

### Inspiration

This module borrows some concept ideas from the following existing projects:

* [Disconnect for Facebook](https://addons.mozilla.org/en-US/firefox/addon/facebook-disconnect-ii/)
* [Google Disconnect](https://addons.mozilla.org/en-US/firefox/addon/gdc) (legacy: not ported to WebExtensions (yet?))
* [Twitter Disconnect](https://addons.mozilla.org/en-US/firefox/addon/twdc) (legacy: not ported to WebExtensions (yet?))


## Compatibility

This extension has been tested on:

* Firefox 57 (LinuxMint)

While the extension works well with Firefox 57, **this extension is known not work with Chrome, Opera and Edge**, as its development is in first steps. Lower versions than 57 of Firefox haven't been tested.


## License

MIT © [t1st3](https://t1st3.com)
