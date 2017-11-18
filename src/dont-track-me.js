const networks = {
	facebook: {
		urls: [
			'*://*.facebook.com/*',
			'*://*.fbcdn.com/*',
			'*://*.fbcdn.net/*'
		],
		urlMatch: /^https:\/\/(mobile.)?facebook.com/,
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

class DontTrackMe { // eslint-disable-line no-unused-vars
	constructor() {
		this.networks = networks;
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
		for (const i in networks) {
			if (typeof details.documentUrl === 'undefined' || details.documentUrl.match(networks[i].urlMatch)) {
				return {cancel: false};
			}
		}
		return {cancel: true};
	}
}
