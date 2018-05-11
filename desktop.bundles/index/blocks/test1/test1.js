modules.define('test1', [
    'test0',
    'test2',
    'test1__el',
    'jquery',
    'i-bem-dom'
], function (
        provide,
        Test0,
        Test2,
        Test1El,
        $,
        bemDom) {
    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    window.$ = $;

                    var test = this;
                    var testQueries = {

                        // 1)
                        '.test1__el': [
                            Test1El,
                            {elem: Test1El},
                            {elem: 'el'},
                            'el'
                        ],

                        // 2)
                        '.test1__el_modifyed': [
                            {elem: Test1El, mods: {modifyed: true}}
                        ],

                        // 3)
                        '.test1__el_mod1_val1': [
                            {elem: 'el', mods: {mod1: 'val1'}},
                            {elem: 'el', mods: {mod1: ['val1']}}
                        ],

                        // 4)
                        '.test1__el_num_1': [
                            {elem: 'el', mods: {num: 1}},
                            {elem: 'el', mods: {num: '1'}},
                            {elem: 'el', mods: {num: [1]}},
                            {elem: 'el', mods: {num: ['1']}}
                        ],

                        // 5)
                        '.test1__el_mod1_val1,.test1__el_mod1_val2': [
                            {elem: 'el', mods: {mod1: ['val1', 'val2']}}
                        ],

                        // 6)
                        '[class*="test1__el_modifyed_"],.test1__el_modifyed': [
                            {elem: 'el', mods: {modifyed: '*'}}
                        ],

                        // 7)
                        // eslint-disable-next-line max-len
                        '.test1__el_mod1_val1,.test1__el_mod1_val2,[class*="test1__el_mod2_"],.test1__el_mod2': [
                            {
                                elem: 'el', mods: {
                                    mod1: ['val1', 'val2'],
                                    mod2: '*'
                                }
                            },
                            {
                                elem: Test1El, mods: {
                                    mod1: ['val1', 'val2'],
                                    mod2: '*'
                                }
                            }
                        ],

                        // 8)
                        '.test1__el:not([class*="test1__el_modifyed"])': [
                            {elem: 'el', mods: {modifyed: false}},
                            {elem: 'el', mods: {modifyed: ''}}
                        ],

                        // 9)
                        '.test0': [
                            Test0,
                            {block: Test0}
                        ],

                        // 10)
                        '.test1__button.test0': [
                            {elem: 'button', mix: Test0},
                            {elem: 'button', mix: {block: Test0}}
                        ],

                        // 11)
                        '.test0.test1__button.test1__action_type_submit': [
                            {
                                block: Test0,
                                mix: [
                                    {elem: 'button'},
                                    {
                                        elem: 'action',
                                        mods: {
                                            type: 'submit'
                                        }
                                    }
                                ]
                            },
                            {
                                block: Test0,
                                mix: [
                                    {elem: 'button'},
                                    {
                                        elem: 'action',
                                        mods: {
                                            type: ['submit']
                                        }
                                    }
                                ]
                            }
                        ],

                        // 12)
                        '.test0__inner.test1__button': [
                            {
                                block: Test0,
                                elem: 'inner',
                                mix: {
                                    elem: 'button',
                                    mods: {}
                                }
                            },
                            {
                                block: Test0,
                                elem: 'inner',
                                mix: {
                                    elem: 'button'
                                }
                            }
                        ],

                        // 13)
                        // eslint-disable-next-line max-len
                        '.test0__inner_someMod:not([class*="test0__inner_someOther"]).test1__button_mod1_val1:not([class*="test1__button_mod3"]).test1__button_mod1_val2:not([class*="test1__button_mod3"])[class*="test1__button_mod2_"]:not([class*="test1__button_mod3"]).test1__button_mod2:not([class*="test1__button_mod3"]).test1__button_num_4:not([class*="test1__button_mod3"])': [
                            {
                                block: Test0,
                                elem: 'inner',
                                mods: {
                                    someMod: true,
                                    someOther: false
                                },
                                mix: {
                                    elem: 'button',
                                    mods: {
                                        mod1: ['val1', 'val2'],
                                        mod2: '*',
                                        mod3: false,
                                        num: 4
                                    },
                                    mix: {
                                        block: Test0,
                                        elem: 'ignored'
                                    }
                                }
                            }
                        ]
                    };

                    var keys = Object.keys(testQueries);
                    var successSelectors = 0;
                    var successQueries = 0;
                    var totalQueries = 0;
                    console.log('test1', window.t = this);

                    keys.forEach(function (key, caseNumber) {
                        var ok = true;
                        testQueries[key].forEach(function (query, queryNumber) {
                            var result = test._buildSelectorByQuery(query, test);
                            if (result !== key) {
                                test._log('selector ' + (caseNumber + 1) + '.' +
                                        (queryNumber + 1) + ' error: ', key +
                                        ' ### ' + result);
                                ok = false;
                            } else {
                                successQueries++;
                            }
                            totalQueries++;
                        });
                        if (ok) {
                            test._log(caseNumber + 1 + ') OK ', key);
                            successSelectors++;
                        }
                    });

                    test._log([
                        '_buildSelector tests - selectors: ',
                        successSelectors,
                        '/',
                        keys.length,
                        ', queries: ',
                        successQueries,
                        '/',
                        totalQueries
                    ].join(''));
                }
            }
        },

        _logging: false,
        // _logging: true,

        _log: function () {
            if (this._logging) {
                // eslint-disable-next-line no-console
                console.log.apply(console, arguments);
            }
        }
    }));
});
