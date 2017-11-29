/* global browser DontTrackMe */

const dontTrackMe = new DontTrackMe();

/* Listen to options change in storage */
browser.storage.onChanged.addListener(newSettings => {
	for (const i in dontTrackMe.networks) { // eslint-disable-line guard-for-in
		dontTrackMe.networks[i].blocked = newSettings.blockedNetworks.newValue[i];
	}
	updateListener();
});

/* Get the options from storage
 * If options aren't set in storage (e.g. on first run),
 * they are set from defaults.
 */
browser.storage.local.get().then(storedSettings => {
	if (storedSettings.blockedNetworks) {
		for (const i in dontTrackMe.networks) { // eslint-disable-line guard-for-in
			dontTrackMe.networks[i].blocked = storedSettings.blockedNetworks[i];
		}
	} else {
		const blockedNetworks = {};
		for (const i in dontTrackMe.networks) { // eslint-disable-line guard-for-in
			blockedNetworks[i] = dontTrackMe.networks[i].blocked;
		}
		browser.storage.local.set({blockedNetworks});
	}
	updateListener();
}).catch(() => {
	console.log('Error retrieving stored settings'); // eslint-disable-line no-console
});

function updateListener() {
	if (browser.webRequest.onBeforeRequest.hasListener(DontTrackMe.handleRequest)) {
		browser.webRequest.onBeforeRequest.removeListener(DontTrackMe.handleRequest);
	}
	browser.webRequest.onBeforeRequest.addListener(
		DontTrackMe.handleRequest,
		{urls: dontTrackMe.buildUrlList()},
		['blocking']
	);
}
