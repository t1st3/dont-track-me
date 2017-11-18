const checkboxes = {
	blockFacebookTracking: document.querySelector("#block-facebook-tracking"),
	blockTwitterTracking: document.querySelector("#block-twitter-tracking")
};

function storeSettings() {
  let blockedNetworks = {
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
  console.error(e);
}

browser.storage.local.get().then(updateUI, onError);

for (let i in checkboxes) {
	checkboxes[i].addEventListener("change", storeSettings);
}
