modules.define('test', ['button', 'test__el', 'i-bem-dom'], function (provide, Button, testEl, bemDom) {
    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    console.log(testEl);
                }
            }
        }
    }));
});
