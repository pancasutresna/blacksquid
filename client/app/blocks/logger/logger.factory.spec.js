/* jshint -W117, -W030 */
describe('blocks.logger', function() {

    var $log;
    var toastr;
    var logger;

    beforeEach(module('blocks.logger'));

    beforeEach(module(function ($provide) {
        $provide.constant('toastr', {
            error: sinon.spy(),
            info: sinon.spy(),
            success: sinon.spy(),
            warning: sinon.spy()
        });

        $provide.constant('$log', {
            error: sinon.spy(),
            info: sinon.spy(),
            success: sinon.spy(),
            warn: sinon.spy()
        });

    }));

    beforeEach(inject(function(_$log_, _logger_, _toastr_) {
        $log = _$log_;
        logger = _logger_;
        toastr = _toastr_;
    }));

    describe('logger', function() {
        var message = 'Log this';

        it('should log error category message', function() {
            logger.error(message);
            expect($log.error.calledOnce).to.be.true;
            expect(toastr.error.calledOnce).to.be.true;
        });

        it('should log info category message', function() {
            logger.info(message);
            expect($log.info.calledOnce).to.be.true;
            expect(toastr.info.calledOnce).to.be.true;
        });

        it('should log success category message', function() {
            logger.success(message);
            expect($log.success.calledOnce).to.be.true;
            expect(toastr.success.calledOnce).to.be.true;
        });

        it('should log warning category message', function() {
            logger.warning(message);
            expect($log.warn.calledOnce).to.be.true;
            expect(toastr.warning.calledOnce).to.be.true;
        });

    });
});
