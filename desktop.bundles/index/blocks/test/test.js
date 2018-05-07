modules.define('test', [
    'button',
    'i-bem__internal',
    'test2',
    'test__el',
    'functions',
    'jquery',
    'i-bem-dom'
], function (
        provide,
        Button,
        bemInternal,
        Test2,
        TestEl,
        functions,
        $,
        bemDom) {
    var ELEM_DELIM = bemInternal.ELEM_DELIM;
    var MOD_DELIM = bemInternal.MOD_DELIM;

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    window.$ = $;

                    var test = this;
                    var testQueries = {

                        // 1)
                        '.test__el': [
                            TestEl,
                            {elem: TestEl},
                            {elem: 'el'},
                            'el'
                        ],

                        // 2)
                        '.test__el_modifyed': [
                            {elem: TestEl, mods: {modifyed: true}}
                        ],

                        // 3)
                        '.test__el_mod1_val1': [
                            {elem: 'el', mods: {mod1: 'val1'}},
                            {elem: 'el', mods: {mod1: ['val1']}}
                        ],

                        // 4)
                        '.test__el_num_1': [
                            {elem: 'el', mods: {num: 1}},
                            {elem: 'el', mods: {num: '1'}},
                            {elem: 'el', mods: {num: [1]}},
                            {elem: 'el', mods: {num: ['1']}}
                        ],

                        // 5)
                        '.test__el_mod1_val1,.test__el_mod1_val2': [
                            {elem: 'el', mods: {mod1: ['val1', 'val2']}}
                        ],

                        // 6)
                        '[class*="test__el_modifyed_"],.test__el_modifyed': [
                            {elem: 'el', mods: {modifyed: '*'}}
                        ],

                        // 7)
                        // eslint-disable-next-line max-len
                        '.test__el_mod1_val1,.test__el_mod1_val2,[class*="test__el_mod2_"],.test__el_mod2': [
                            {
                                elem: 'el', mods: {
                                    mod1: ['val1', 'val2'],
                                    mod2: '*'
                                }
                            },
                            {
                                elem: TestEl, mods: {
                                    mod1: ['val1', 'val2'],
                                    mod2: '*'
                                }
                            }
                        ],

                        // 8)
                        '.test__el:not([class*="test__el_modifyed"])': [
                            {elem: 'el', mods: {modifyed: false}},
                            {elem: 'el', mods: {modifyed: ''}}
                        ],

                        // 9)
                        '.button': [
                            Button,
                            {block: Button}
                        ],

                        // 10)
                        '.test__button.button': [
                            {elem: 'button', mix: Button},
                            {elem: 'button', mix: {block: Button}}
                        ],

                        // 11)
                        '.button.test__button.test__action_type_submit': [
                            {
                                block: Button,
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
                                block: Button,
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
                        '.button__inner.test__button': [
                            {
                                block: Button,
                                elem: 'inner',
                                mix: {
                                    elem: 'button',
                                    mods: {}
                                }
                            },
                            {
                                block: Button,
                                elem: 'inner',
                                mix: {
                                    elem: 'button'
                                }
                            }
                        ],

                        // 13)
                        // eslint-disable-next-line max-len
                        '.button__inner_someMod:not([class*="button__inner_someOther"]).test__button_mod1_val1:not([class*="test__button_mod3"]).test__button_mod1_val2:not([class*="test__button_mod3"])[class*="test__button_mod2_"]:not([class*="test__button_mod3"]).test__button_mod2:not([class*="test__button_mod3"]).test__button_num_4:not([class*="test__button_mod3"])': [
                            {
                                block: Button,
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
                                        block: Button,
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

                    keys.forEach(function (key, caseNumber) {
                        var ok = true;
                        testQueries[key].forEach(function (query, queryNumber) {
                            var result = test._buildSelector(query, test);
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

        // _logging: false,
        _logging: true,

        _log: function () {
            if (this._logging) {
                // eslint-disable-next-line no-console
                console.log.apply(console, arguments);
            }
        },

        _buildBaseClass: function (query, ctx) {
            // передан класс
            if (functions.isFunction(query)) {
                return query.getEntityName();
            }

            // передана строка - имя элемента
            if (typeof query === 'string') {
                return ctx.__self._blockName + ELEM_DELIM + query;
            }

            var blockName;
            var elemName;

            // иначе должен быть передан объект, у которого обязательно есть
            // как минимум одно из полей: block или elem
            if (typeof query !== 'object' || (!query.block && !query.elem)) {
                throw new Error('Invalid query');
            }

            // если в качестве elem указан класс - берем blockName и elemName из него
            if (functions.isFunction(query.elem)) {
                blockName = query.elem._blockName;
                elemName = query.elem._name;
            }

            if (typeof query.elem === 'string') {
                elemName = query.elem;
            }

            if (typeof query.block === 'string') {
                throw new Error('Invalid query');
            }

            if (functions.isFunction(query.block)) {
                blockName = query.block._blockName;
            }

            if (!blockName) {
                blockName = ctx.__self._blockName;
            }

            return blockName + (elemName ? ELEM_DELIM + elemName : '');
        },

        _modsToStrArr: function (query, baseClass, baseSelector) {
            var strArr = [];
            var modsArr = [];
            var postfixes = [];

            if (query.mods) {
                Object.keys(query.mods).forEach(function (modName) {
                    if (Array.isArray(query.mods[modName])) {
                        query.mods[modName].forEach(function (modVal) {
                            modsArr.push({
                                name: modName,
                                val: modVal
                            });
                        });
                    } else {
                        modsArr.push({
                            name: modName,
                            val: query.mods[modName]
                        });
                    }
                });
            }

            modsArr.forEach(function (mod) {
                if (mod.val === '*') {
                    strArr.push('[class*="' +
                                        baseClass +
                                        MOD_DELIM +
                                        mod.name +
                                        MOD_DELIM +
                                        '"]');
                    strArr.push(baseSelector + MOD_DELIM + mod.name);
                } else if (mod.val === '' || mod.val === false) {
                    postfixes.push(':not([class*="' + baseClass + MOD_DELIM + mod.name + '"])');
                } else {
                    strArr.push(baseSelector + MOD_DELIM + mod.name +
                            (mod.val === true ? '' : MOD_DELIM + mod.val));
                }
            });

            if (!strArr.length) {
                strArr.push(baseSelector);
            }

            postfixes.forEach(function (postfix) {
                strArr = strArr.map(function (str) {
                    return str + postfix;
                });
            });

            return strArr;
        },

        _buildSelector: function (query, ctx) {
            var _this = this;
            var baseClass = this._buildBaseClass(query, ctx);
            var baseSelector = '.' + baseClass;

            var strArr = this._modsToStrArr(query, baseClass, baseSelector);

            if (!strArr.length) {
                strArr.push(baseSelector);
            }

            var mixes = Array.isArray(query.mix) ? query.mix : (query.mix ? [query.mix] : []);

            var mixPostfixes = [];
            mixes.forEach(function (mix) {
                var mixBaseClass = _this._buildBaseClass(mix, ctx);
                var mixBaseSelector = '.' + mixBaseClass;
                var mixStrArr = _this._modsToStrArr(mix, mixBaseClass, mixBaseSelector);
                mixPostfixes = mixPostfixes.concat(mixStrArr);
            });

            mixPostfixes.forEach(function (mixPostfix) {
                strArr = strArr.map(function (str) {
                    return str + mixPostfix;
                });
            });

            return strArr.join(',');

            // + узнать block и elem
            // + mods
            // + mix
            // избежать коллизий вида .test_m_v .blah-test_m_v в селекторах с маской
            // расширить BemDomEntity своим набором методов (см. _findEntities)
            //      findChild
            //      findChilds
            //      findParent
            //      findParents
            //      findMix
            //      findMixes
        }
    }));
});
