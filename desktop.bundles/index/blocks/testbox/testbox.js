modules.define('testbox', [
    'i-bem-dom'
], function (provide, bemDom) {
    provide(bemDom.declBlock(this.name, {
        fire: function () {
            var _this = this;

            clearTimeout(this._fireTimeout);

            this.setMod('found');

            this._fireTimeout = setTimeout(function () {
                _this.delMod('found');
            }, 700);
        }
    }));
});
