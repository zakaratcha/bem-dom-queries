module.exports = {
    block: 'page',
    title: 'test',
    favicon: '/favicon.ico',
    head: [
        {elem: 'meta', attrs: {name: 'description', content: ''}},
        {elem: 'meta', attrs: {name: 'viewport', content: 'width=device-width, initial-scale=1'}},
        {elem: 'css', url: 'index.min.css'}
    ],
    scripts: [{elem: 'js', url: 'index.min.js'}],
    mods: {theme: 'islands'},
    content: [
        {
            block: 'content',
            content: [
                {
                    block: 'test0',
                    mix: {
                        block: 'testbox'
                    },
                    content: [
                        {
                            block: 'testbox',
                            elem: 'title',
                            content: '.test0'
                        },
                        {
                            block: 'test1',
                            mix: {
                                block: 'testbox',
                                mods: {current: true}
                            },
                            content: [
                                {
                                    block: 'testbox',
                                    elem: 'title',
                                    content: '.test1'
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    elemMods: {
                                        first: true
                                    },
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test1__el_first'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    elemMods: {
                                        mod1: 'val1'
                                    },
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test1__el_mod1_val1'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    elemMods: {
                                        mod1: 'val2',
                                        mod2: 'valA'
                                    },
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test1__el_mod1_val2',
                                                {tag: 'br'},
                                                '.test1__el_mod2_valA'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    elemMods: {
                                        mod1: 'val3',
                                        mod2: 'valB'
                                    },
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test1__el_mod1_val3',
                                                {tag: 'br'},
                                                '.test1__el_mod2_valB'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    elemMods: {
                                        mod1: 'val4'
                                    },
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test1__el_mod1_val4'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    elemMods: {
                                        mod1: 'val5'
                                    },
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test1__el_mod1_val5'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: '.test1__el'
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: '.test1__el'
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: '.test1__el'
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    mix: [
                                        {
                                            block: 'testbox'
                                        },
                                        {
                                            block: 'test3'
                                        }
                                    ],
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test3'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test1',
                                    elem: 'el',
                                    mix: [
                                        {
                                            block: 'testbox'
                                        },
                                        {
                                            block: 'test3',
                                            mods: {mod3: true}
                                        },
                                        {
                                            block: 'test4'
                                        }
                                    ],
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: [
                                                '.test1__el',
                                                {tag: 'br'},
                                                '.test3',
                                                {tag: 'br'},
                                                '.test3_mod3',
                                                {tag: 'br'},
                                                '.test4'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'test2',
                                    js: true,
                                    mix: {
                                        block: 'testbox'
                                    },
                                    content: [
                                        {
                                            block: 'testbox',
                                            elem: 'title',
                                            content: '.test2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    block: 'pad',
                    js: true,
                    content: [
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findParent(Test0)'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findMix(Test1)'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChild(Test2)'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChild(\'el\')'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds(\'el\')'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds({elem: \'el\', mods: {first: true}})'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds({elem: \'el\', mods: {first: false}})'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds({elem: \'el\', mods: {mod1: [\'val1\', \'val2\']}})'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds({elem: Test1El, mods: {mod2: \'*\'}})'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds({elem: \'el\', mix: Test3})'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds({elem: \'el\', mix: {block: Test3, mods: {mod3: true}}})'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: {
                                block: 'pad',
                                elem: 'item'
                            },
                            text: 'test1.findChilds({elem: \'el\', mix: [Test3, Test4]})'
                        }

                    ]
                }
            ]
        }
    ]
};
