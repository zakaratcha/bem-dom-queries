modules.define('test0', ['i-bem-dom'], function (provide, bemDom) {
    provide(bemDom.declBlock(this.name, {}));
});
