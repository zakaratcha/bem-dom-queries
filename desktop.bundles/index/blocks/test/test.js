modules.define('test', ['button', 'test__el', 'i-bem-dom'], function (provide, Button, TestEl, bemDom) {
    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    var test = this;
                    var testQueries = {

                        '.test__el': [
                            TestEl,
                            {elem: TestEl},
                            {elem: 'el'}
                        ],

                        '.test__el_modifyed': [
                            {elem: TestEl, mods: {modifyed: true}}
                        ],

                        '[class*="test__el_modifyed_"]': [ // TODO: булевы
                            {elem: 'el', mods: {modifyed: '*'}}
                        ],

                        '.test__el:not(.test__el_modifyed)': [
                            {elem: TestEl, mods: {modifyed: false}},
                            {elem: 'el', mods: {modifyed: false}}
                        ],

                        '.button': [
                            Button,
                            {block: Button}
                        ],

                        '.test__button.button': [
                            {elem: 'button', mix: Button},
                            {elem: 'button', mix: {block: Button}}
                        ],

                        '.button.test__button': [
                            {block: Button, mix: {elem: 'button'}}
                        ]
                    };

                    Object.keys(testQueries).forEach(function (key) {
                        var ok = true;
                        testQueries[key].forEach(function (query) {
                            var result = this._buildSelector(query, test);
                            if (result !== key) {
                                console.log('Building selector error');
                                console.log('must be: ', key);
                                console.log('builded: ', result);
                                ok = false;
                            }
                        });
                        if (ok) {
                            console.log('OK: ', key);
                        }
                    });
                }
            }
        },
        _buildSelector: function (entity, ctx) {
            return '';
        }
    }));
});
