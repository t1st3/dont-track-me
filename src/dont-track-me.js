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
	/* Create an instance of DontTrackMe */
	constructor() {
		this.networks = networks;
	}

	/* Check if a URL is a "privileged" URL,
	 * like "about:config" on Firefox,
	 * or "chrome://extensions/" on Chromium
	 *
	 * @param {string} url - The URL to check
	 * @return {null|Array} - null if URL isn't privileged, matchesarray otherwise
	 */
	static isPrivilegedUrl (url) {
		return url.match(/^(about|chrome|file|javascript|data):/);
	}

	/* Check whether a tab, given its url, may allow requests to social networks.
	 * Checks whether the tab URL is a privileged URL (see isPrivilegedUrl)
	 * Checks whether the tab URL matches social network URLs
	 *
	 * @param {string} tabUrl - The tab URL to check
	 * @return {boolean} - Whether the tab should allow requests
	 */
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

	/* Build the list of URLs to which this plugin applies
	 * The list is based on the options of the extension.
	 *
	 * @return {array} - The URL list in an array
	 */
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

	/* Handle requests
	 *
	 * @param {object} details - The details of the request
	 * @return {promise} - Promise that resolves in an object containing request cancellation info
	 */
	static handleRequest(details) {
		return getTabInfo(details.tabId, tabInfo => {
			return {cancel: !DontTrackMe.isAllowingTab(tabInfo.url)};
		}, err => {
			return err;
		});
	}
}
