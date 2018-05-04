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
                            {block: 'something-should-be-ignored', elem: TestEl},
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
                        '.test__el_mod1_val1,.test__el_mod1_val2,[class*="test__el_mod2"],.test__el_mod2': [
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
                                    mods: {},
                                    attrs: {}
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
                        '.button[id="uniq"]': [
                            {
                                block: Button,
                                attrs: {
                                    id: 'uniq'
                                }
                            },
                            {
                                block: Button,
                                attrs: {
                                    id: ['uniq']
                                }
                            }
                        ],

                        // 14)
                        '.test2[src="http://ya.ru"][src="http://yandex.ru"][class~="link"]': [
                            {
                                block: Test2,
                                attrs: {
                                    src: ['http://ya.ru', 'http://yandex.ru'],
                                    'class~': 'link'
                                }
                            }
                        ],

                        // 15)
                        'button.button__inner.test__button TODO: дописать эту жесть': [
                            {
                                tag: 'button',
                                attrs: {
                                    id: 'uniq'
                                },
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

//        _logging: false,
        _logging: true,

        _log: function () {
            if (this._logging) {
                // eslint-disable-next-line no-console
                console.log.apply(console, arguments);
            }
        },

        _buildSelector: function (query, ctx) {
            var ELEM_DELIM = bemInternal.ELEM_DELIM;
            var MOD_DELIM = bemInternal.MOD_DELIM;

            // передан класс
            if (functions.isFunction(query)) {
                return '.' + query.getEntityName();
            }

            // передана строка - имя элемента
            if (typeof query === 'string') {
                return '.' + ctx.__self._blockName + ELEM_DELIM + query;
            }

            // иначе должен быть передан объект, у которого обязательно есть
            // как минимум одно из полей: block или elem
            if (typeof query !== 'object' || (!query.block && !query.elem)) {
                throw new Error('Invalid query');
            }

            var blockName;
            var elemName;

            // если в качестве elem указан класс - берем blockName и elemName из него
            if (functions.isFunction(query.elem)) {
                blockName = query.elem._blockName;
                elemName = query.elem._name;
            }

            if (typeof query.elem === 'string') {
                elemName = query.elem;
            }

            // если blockName всё еще не известен - берем из контекста
            if (!blockName) {
                blockName = ctx.__self._blockName;
            }

            // mods
            var modsArr = [];
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

            var entityClass = blockName + (elemName ? ELEM_DELIM + elemName : '');
            var entitySelector = (query.tag || '') + '.' + entityClass;

            var strArr = [];
            var suffixes = [];
            var postfixes = [];

            modsArr.forEach(function (mod) {
                if (mod.val === '*') {
                    strArr.push('[class*="' +
                                        entityClass +
                                        MOD_DELIM +
                                        mod.name +
                                        MOD_DELIM +
                                        '"]');
                    strArr.push(entitySelector + MOD_DELIM + mod.name);
                } else if (mod.val === '' || mod.val === false) {
                    postfixes.push(':not([class*="' + entityClass + MOD_DELIM + mod.name + '"])');
                } else {
                    strArr.push(entitySelector + MOD_DELIM + mod.name +
                            (mod.val === true ? '' : MOD_DELIM + mod.val));
                }
            });

            var mixes;

            if (!strArr.length) {
                strArr.push(entitySelector);
            }

            suffixes.forEach(function (suffix) {
                strArr = strArr.map(function (str) {
                    return str + suffix;
                });
            });

            postfixes.forEach(function (postfix) {
                strArr = strArr.map(function (str) {
                    return str + postfix;
                });
            });

            return strArr.join(',');

            // + узнать block и elem
            // + mods
            // mix
            // tag
            // attrs
            // склеить всю эту срань

            /*
            var entityName = functions.isFunction(entity) ?
                entity.getEntityName() :
                typeof entity === 'object' ?
            //***********************************************
                    entity.block ?
                        entity.block.getEntityName() :
                        typeof entity.elem === 'string' ?
                            this.__self._blockName + ELEM_DELIM + entity.elem :
                            entity.elem.getEntityName() :
                    this.__self._blockName + ELEM_DELIM + entity,
                selector = '.' +
                (typeof entity === 'object' ?
                    buildClassName(
                        entityName,
                        entity.modName,
                        typeof entity.modVal === 'undefined' ?
                            true :
                            entity.modVal) :
                    entityName) +
                (onlyFirst ? ':first' : ''),
                domElems = this.domElem[select](selector);

            if (onlyFirst) {
                return domElems[0] ?
            initEntity(entityName, domElems.eq(0), undef, true)._setInitedMod() :
            null;
            }

            var res = [],
                uniqIds = {};

            domElems.each(function (i, domElem) {
                var block = initEntity(entityName, $(domElem), undef, true)._setInitedMod();
                if (!uniqIds[block._uniqId]) {
                    uniqIds[block._uniqId] = true;
                    res.push(block);
                }
            });

            return new BemDomCollection(res);
            */
        }
    }));

    /*
     *
     * findChild
     * findChilds
     * findParent
     * findParents
     * findMix
     * findMixes
     * findGlobal //??
     *
     */
});
