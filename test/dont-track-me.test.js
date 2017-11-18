describe('DontTrackMe.buildUrlList', function () {
	describe('should', function () {
		it('list all urls', function (done) {
			const dtm = new DontTrackMe();
			dtm.buildUrlList().indexOf('*://*.facebook.com/*').should.equal(0);
			dtm.buildUrlList().indexOf('*://*.fbcdn.com/*').should.equal(1);
			dtm.buildUrlList().indexOf('*://*.fbcdn.net/*').should.equal(2);
			dtm.buildUrlList().indexOf('*://*.twitter.com/*').should.equal(3);
			dtm.buildUrlList().indexOf('*://*.twimg.com/*').should.equal(4);
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
