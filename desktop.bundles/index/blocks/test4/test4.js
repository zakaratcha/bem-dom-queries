modules.define('test4', ['i-bem-dom'], function (provide, bemDom) {
    provide(bemDom.declBlock(this.name, {}));
});
