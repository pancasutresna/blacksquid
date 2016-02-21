/* jshint -W117, -W030 */
describe('blocks.exception', function() {
    var exceptionConfigProvider;
    var mocks = {
        errorMessage: 'fake error',
        prefix: '[TEST]: '
    };

    beforeEach(function() {
        bard.appModule('blocks.exception', function(_exceptionConfigProvider_) {
            exceptionConfigProvider = _exceptionConfigProvider_;
        });
        bard.inject('$rootScope');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('exceptionConfigProvider', function() {
        it('should have a dummy test', inject(function() {
            expect(true).to.equal(true);
        }));

        it('should have exceptionConfigProvider defined', inject(function() {
            expect(exceptionConfigProvider).to.be.defined;
        }));

        it('should have configuration', inject(function() {
            expect(exceptionConfigProvider.config).to.be.defined;
        }));

        it('should have configuration', inject(function() {
            expect(exceptionConfigProvider.configure).to.be.defined;
        }));

        describe('with appErrorPrefix', function() {
            beforeEach(function() {
                exceptionConfigProvider.configure(mocks.prefix);
            });

            it('should have appErrorPrefix defined', inject(function() {
                expect(exceptionConfigProvider.$get().config.appErrorPrefix).to.be.defined;
            }));

            it('should have appErrorPrefix set properly', inject(function() {
                expect(exceptionConfigProvider.$get().config.appErrorPrefix)
                    .to.equal(mocks.prefix);
            }));

            it('should throw an error when forced', inject(function() {
                expect(functionThatWillThrow).to.throw();
            }));

            it('manual error is handled by decorator', function() {
                var exception;
                exceptionConfigProvider.configure(mocks.prefix);
                try {
                    $rootScope.$apply(functionThatWillThrow);
                }
                catch (ex) {
                    exception = ex;
                    expect(ex.message).to.equal(mocks.prefix + mocks.errorMessage);
                }
            });
        });
    });

    function functionThatWillThrow() {
        throw new Error(mocks.errorMessage);
    }
});
