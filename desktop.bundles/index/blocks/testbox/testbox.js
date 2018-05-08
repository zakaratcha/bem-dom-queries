modules.define('testbox', [
    'i-bem-dom'
], function (provide, bemDom) {
    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            found: {
                true: function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.delMod('found');
                    }, 500);
                }
            }
        }
    }));
});
