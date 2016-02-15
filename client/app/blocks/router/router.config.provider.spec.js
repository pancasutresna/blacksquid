/* jshint -W117, -W030 */
describe('blocks.router', function() {

    var RouterConfig;

    beforeEach(module('blocks.router'));

    beforeEach(inject(function(_RouterConfig_) {
        RouterConfig = _RouterConfig_;
    }));

    describe('RouterConfig', function() {
        it('should have a dummy test', function() {
            expect(true).to.equal(true);
        });

        it('should have RouterConfig defined', inject(function() {
            expect(RouterConfig).to.be.defined;
        }));

        it('should have configuration', inject(function() {
            expect(RouterConfig.config).to.be.defined;
        }));

    });

});
