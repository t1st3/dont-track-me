const browser = window.browser || window.chrome;

const dontTrackMe = new DontTrackMe();

browser.storage.onChanged.addListener((newSettings) => {
	for (let i in dontTrackMe.networks) {
		dontTrackMe.networks[i].blocked = newSettings.blockedNetworks.newValue[i];
	}
	updateListener();
});

browser.storage.local.get().then((storedSettings) => {
	if (storedSettings.blockedNetworks) {
		for (let i in dontTrackMe.networks) {
			dontTrackMe.networks[i].blocked = storedSettings.blockedNetworks[i];
		}
	} else {
		let blockedNetworks = {};
		for (let i in dontTrackMe.networks) {
			blockedNetworks[i] = dontTrackMe.networks[i].blocked;
		}
		browser.storage.local.set({blockedNetworks});
	}
	updateListener();
}).catch(()=> {
	console.log('Error retrieving stored settings');
});

function updateListener () {
	if (browser.webRequest.onBeforeRequest.hasListener(DontTrackMe.handleRequest)) {
		browser.webRequest.onBeforeRequest.removeListener(DontTrackMe.handleRequest)
	}
	browser.webRequest.onBeforeRequest.addListener(
		DontTrackMe.handleRequest,
		{urls: dontTrackMe.buildUrlList()},
		['blocking']
	);
}
