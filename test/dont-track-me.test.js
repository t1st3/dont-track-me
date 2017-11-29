/* global describe it should DontTrackMe */
describe('DontTrackMe.buildUrlList', () => {
	describe('should', () => {
		const dtm = new DontTrackMe();
		it('list all urls (default)', done => {
			dtm.buildUrlList().indexOf('*://*.facebook.com/*').should.equal(0);
			dtm.buildUrlList().indexOf('*://*.fbcdn.com/*').should.equal(1);
			dtm.buildUrlList().indexOf('*://*.fbcdn.net/*').should.equal(2);
			dtm.buildUrlList().indexOf('*://*.twitter.com/*').should.equal(3);
			dtm.buildUrlList().indexOf('*://*.twimg.com/*').should.equal(4);
			done();
		});

		it('list only twitter urls when only twitter is blocked', done => {
			dtm.networks.facebook.blocked = false;
			dtm.buildUrlList().indexOf('*://*.twitter.com/*').should.equal(0);
			dtm.buildUrlList().indexOf('*://*.twimg.com/*').should.equal(1);
			done();
		});

		it('list only facebook urls when only facebook is blocked', done => {
			dtm.networks.facebook.blocked = true;
			dtm.networks.twitter.blocked = false;
			dtm.buildUrlList().indexOf('*://*.facebook.com/*').should.equal(0);
			dtm.buildUrlList().indexOf('*://*.fbcdn.com/*').should.equal(1);
			dtm.buildUrlList().indexOf('*://*.fbcdn.net/*').should.equal(2);
			done();
		});

		it('list only bogus url when no network is blocked', done => {
			dtm.networks.twitter.blocked = false;
			dtm.networks.facebook.blocked = false;
			dtm.buildUrlList().indexOf('https://nonexistingurl.dev').should.equal(0);
			done();
		});
	});
});

describe('DontTrackMe.isPrivilegedUrl', () => {
	describe('should', () => {
		it('return true on privileged URLs', done => {
			DontTrackMe.isPrivilegedUrl('about:config').should.not.be.empty;
			DontTrackMe.isPrivilegedUrl('data:foobar').should.not.be.empty;
			done();
		});

		it('return false on non-privileged URLs', done => {
			should.not.exist(DontTrackMe.isPrivilegedUrl('https://github.com'));
			should.not.exist(DontTrackMe.isPrivilegedUrl('https://data.org'));
			done();
		});
	});
});

describe('DontTrackMe.isAllowingTab', () => {
	describe('should', () => {
		it('return true when tab URL is a social network URL', done => {
			DontTrackMe.isAllowingTab('https://twitter.com').should.equal(true);
			DontTrackMe.isAllowingTab('https://www.facebook.com').should.equal(true);
			done();
		});

		it('return false when tab URL is NOT a social network URL', done => {
			DontTrackMe.isAllowingTab('https://example.com').should.equal(false);
			DontTrackMe.isAllowingTab('https://data.org').should.equal(false);
			done();
		});
	});
});
