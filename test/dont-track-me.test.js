describe('DontTrackMe.buildUrlList', function () {
	describe('should', function () {
		const dtm = new DontTrackMe();
		it('list all urls (default)', function (done) {
			dtm.buildUrlList().indexOf('*://*.facebook.com/*').should.equal(0);
			dtm.buildUrlList().indexOf('*://*.fbcdn.com/*').should.equal(1);
			dtm.buildUrlList().indexOf('*://*.fbcdn.net/*').should.equal(2);
			dtm.buildUrlList().indexOf('*://*.twitter.com/*').should.equal(3);
			dtm.buildUrlList().indexOf('*://*.twimg.com/*').should.equal(4);
			done();
		});

		it('list only twitter urls when only twitter is blocked', function (done) {
			dtm.networks.facebook.blocked = false;
			dtm.buildUrlList().indexOf('*://*.twitter.com/*').should.equal(0);
			dtm.buildUrlList().indexOf('*://*.twimg.com/*').should.equal(1);
			done();
		});

		it('list only facebook urls when only facebook is blocked', function (done) {
			dtm.networks.facebook.blocked = true;
			dtm.networks.twitter.blocked = false;
			dtm.buildUrlList().indexOf('*://*.facebook.com/*').should.equal(0);
			dtm.buildUrlList().indexOf('*://*.fbcdn.com/*').should.equal(1);
			dtm.buildUrlList().indexOf('*://*.fbcdn.net/*').should.equal(2);
			done();
		});

		it('list only bogus url when no network is blocked', function (done) {
			dtm.networks.twitter.blocked = false;
			dtm.networks.facebook.blocked = false;
			dtm.buildUrlList().indexOf('https://nonexistingurl.dev').should.equal(0);
			done();
		});
	});
});

describe('DontTrackMe.handleRequest', function () {
	describe('should', function () {
		it('keep the request (cancel is false) when documentUrl is a social network\'s url', function (done) {
			let details = {
				documentUrl: 'https://twitter.com/?lang=fr'
			};
			DontTrackMe.handleRequest(details).cancel.should.equal(false);
			done();
		});

		it('keep the request (cancel is false) when documentUrl is undefined', function (done) {
			let details = {
				documentUrl: undefined
			};
			DontTrackMe.handleRequest(details).cancel.should.equal(false);
			done();
		});

		it('cancel the request (cancel is true) when documentUrl isn\'t a social network\'s url', function (done) {
			let details = {
				documentUrl: 'https://anyfriendlydomain.org/?lang=de'
			};
			DontTrackMe.handleRequest(details).cancel.should.equal(true);
			done();
		});
	});
});
