modules.define('test', [
    'button',
    'i-bem__internal',
    'test2',
    'test__el',
    'functions',
    'i-bem-dom'
], function (
        provide,
        Button,
        bemInternal,
        Test2,
        TestEl,
        functions,
        bemDom) {
    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    var test = this;
                    var testQueries = {

                        '.test__el': [
                            TestEl,
                            {elem: TestEl},
                            {elem: 'el'},
                            'el'
                        ],

                        '.test__el_modifyed': [
                            {elem: TestEl, mods: {modifyed: true}}
                        ],

                        '.test__el_mod1_val1': [
                            {elem: 'el', mods: {mod1: 'val1'}},
                            {elem: 'el', mods: {mod1: ['val1']}}
                        ],

                        '.test__el_num_1': [
                            {elem: 'el', mods: {num: 1}},
                            {elem: 'el', mods: {num: '1'}},
                            {elem: 'el', mods: {num: [1]}},
                            {elem: 'el', mods: {num: ['1']}}
                        ],

                        '.test__el_mod1_val1,.test__el_mod1_val2': [
                            {elem: 'el', mods: {mod1: ['val1', 'val2']}}
                        ],

                        '[class*="test__el_modifyed_"],.test__el_modifyed': [
                            {elem: 'el', mods: {modifyed: '*'}}
                        ],

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

                        '.test__el:not(.test__el_modifyed)': [
                            {elem: TestEl, mods: {modifyed: false}},
                            {elem: 'el', mods: {modifyed: false}},
                            {elem: 'el', mods: {modifyed: ''}}
                        ],

                        '.button': [
                            Button,
                            {block: Button}
                        ],

                        '.test__button.button': [
                            {elem: 'button', mix: Button},
                            {elem: 'button', mix: {block: Button}}
                        ],

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

                        '.test2[src="http://ya.ru"][src="http://yandex.ru"][class~="link"]': [
                            {
                                block: Test2,
                                attrs: {
                                    src: ['http://ya.ru', 'http://yandex.ru'],
                                    'class~': 'link'
                                }
                            }
                        ],

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

                    keys.forEach(function (key) {
                        var ok = true;
                        testQueries[key].forEach(function (query) {
                            var result = test._buildSelector(query, test);
                            if (result !== key) {
                                test._log('Building selector error');
                                test._log('must be: ', key);
                                test._log('builded: ', result);
                                ok = false;
                            } else {
                                successQueries++;
                            }
                            totalQueries++;
                        });
                        if (ok) {
                            test._log('OK: ', key);
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

        _logging: true,
        _log: function () {
            if (this._logging) {
                // eslint-disable-next-line no-console
                console.log.apply(console, arguments);
            }
        },
        _buildSelector: function (query, ctx) {
            var ELEM_DELIM = bemInternal.ELEM_DELIM;

            // узнать block и elem
            // tag
            // запомнить селекторы модификаторов в массивы
            // запомнить миксы в массивы
            // запомнить аттрибуты
            // склеить всю эту срань

            // передан класс
            if (functions.isFunction(query)) {
                return '.' + query.getEntityName();
            }

            // передана строка - имя элемента
            if (typeof query === 'string') {
                return '.' + ctx.__self._blockName + ELEM_DELIM + query;
            }

            // иначе должен быть передан объект, у которого обязательно есть
            // одно из полей: block или elem
            if (typeof query !== 'object' || (!query.block && !query.elem)) {
                throw new Error('Invalid query');
            }

            var block;
            var elem;

            /*
            var entityName = functions.isFunction(entity) ?
                entity.getEntityName() :
            //***********************************************
                typeof entity === 'object' ?
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
            return '***';
        }
    }));
});
