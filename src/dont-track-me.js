const browser = window.browser || window.chrome;

const networks = {
	facebook: {
		urls: [
			'*://*.facebook.com/*',
			'*://*.fbcdn.com/*',
			'*://*.fbcdn.net/*'
		],
		urlMatch: /^https:\/\/www.facebook.com/,
		blocked: true
	},
	twitter: {
		urls: [
			'*://*.twitter.com/*',
			'*://*.twimg.com/*'
		],
		urlMatch: /^https:\/\/(mobile.)?twitter.com/,
		blocked: true
	}
};

function getTabInfo (tabId, resolve, reject) {
	return browser.tabs.get(tabId).then(resolve, reject);
}

class DontTrackMe { // eslint-disable-line no-unused-vars
	constructor() {
		this.networks = networks;
	}

	static isPrivilegedUrl (url) {
		return url.match(/^(about|chrome|file|javascript|data):/);
	}

	static isAllowingTab (tabUrl) {
		if (DontTrackMe.isPrivilegedUrl(tabUrl)) {
			return true;
		}
		for (const i in networks) {
			if (tabUrl.match(networks[i].urlMatch)) {
				return true;
			}
		}
		return false;
	}

	buildUrlList() {
		const urls = [];
		for (const i in this.networks) {
			if (this.networks[i].blocked === true) {
				for (let j = 0; j < this.networks[i].urls.length; j++) {
					urls.push(this.networks[i].urls[j]);
				}
			}
		}
		return (urls.length === 0) ? ['https://nonexistingurl.dev'] : urls;
	}

	static handleRequest(details) {
		return getTabInfo(details.tabId, tabInfo => {
			return {cancel: !DontTrackMe.isAllowingTab(tabInfo.url)};
		}, err => {
			return err;
		});
	}
}
