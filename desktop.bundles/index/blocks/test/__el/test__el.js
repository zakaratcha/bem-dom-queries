modules.define('test__el', ['i-bem-dom'], function (provide, bemDom) {
    provide(bemDom.declElem('test', 'el', {
        onSetMod: {
            js: {
                inited: function () {
                    console.log('test__el inited');
                }
            }
        }
    }));
});
