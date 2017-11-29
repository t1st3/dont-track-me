/* global document window */

const browser = window.browser || window.chrome;

const checkboxes = {
	blockFacebookTracking: document.querySelector('#block-facebook-tracking'),
	blockTwitterTracking: document.querySelector('#block-twitter-tracking')
};

function storeSettings() {
	const blockedNetworks = {
		facebook: checkboxes.blockFacebookTracking.checked,
		twitter: checkboxes.blockTwitterTracking.checked
	};
	browser.storage.local.set({
		blockedNetworks
	});
}

function updateUI(restoredSettings) {
	checkboxes.blockFacebookTracking.checked = restoredSettings.blockedNetworks.facebook;
	checkboxes.blockTwitterTracking.checked = restoredSettings.blockedNetworks.twitter;
}

function onError(e) {
	console.error(e); // eslint-disable-line no-console
}

browser.storage.local.get().then(updateUI, onError);

for (const i in checkboxes) { // eslint-disable-line guard-for-in
	checkboxes[i].addEventListener('change', storeSettings);
}
