modules.define('test3', ['i-bem-dom'], function (provide, bemDom) {
    provide(bemDom.declBlock(this.name, {}));
});
