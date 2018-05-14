modules.define('i-bem-dom', [
    'i-bem__internal',
    'i-bem-dom__collection',
    'functions',
    'objects'
], function (provide, bemInternal, BemDomCollection, functions, objects, bemDom) {
    var undef;

    var MOD_DELIM = bemInternal.MOD_DELIM;
    var ELEM_DELIM = bemInternal.ELEM_DELIM;

    var getEntityName = function (query, ctx) {
        if (functions.isFunction(query)) {
            return query.getEntityName();
        }

        if (typeof query === 'string') {
            return ctx.__self._blockName + ELEM_DELIM + query;
        }

        var blockName;
        var elemName;

        if (typeof query !== 'object' || (!query.block && !query.elem)) {
            throw new Error('Invalid query');
        }

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
    };

    var modsToStrArr = function (query, entityName, entitySelector) {
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
                        entityName +
                        MOD_DELIM +
                        mod.name +
                        MOD_DELIM +
                        '"]');
                strArr.push(entitySelector + MOD_DELIM + mod.name);
            } else if (mod.val === '' || mod.val === false) {
                postfixes.push(':not([class*="' + entityName + MOD_DELIM + mod.name + '"])');
            } else {
                strArr.push(entitySelector + MOD_DELIM + mod.name +
            (mod.val === true ? '' : MOD_DELIM + mod.val));
            }
        });

        if (!strArr.length) {
            strArr.push(entitySelector);
        }

        postfixes.forEach(function (postfix) {
            strArr = strArr.map(function (str) {
                return str + postfix;
            });
        });

        return strArr;
    };

    var buildSelector = function (query, ctx) {
        var entityName = getEntityName(query, ctx);
        var entitySelector = '.' + entityName;

        var strArr = modsToStrArr(query, entityName, entitySelector);

        if (!strArr.length) {
            strArr.push(entitySelector);
        }

        var mixes = Array.isArray(query.mix) ? query.mix : (query.mix ? [query.mix] : []);

        var mixPostfixes = [];
        mixes.forEach(function (mix) {
            var mixEntityName = getEntityName(mix, ctx);
            var mixEntitySelector = '.' + mixEntityName;
            var mixStrArr = modsToStrArr(mix, mixEntityName, mixEntitySelector);
            mixPostfixes = mixPostfixes.concat(mixStrArr);
        });

        mixPostfixes.forEach(function (mixPostfix) {
            strArr = strArr.map(function (str) {
                return str + mixPostfix;
            });
        });

        return strArr.join(',');
    };

    var BemDomEntityInBlockProto = bemDom.Block.__parent.prototype;
    var BemDomEntityInElemProto = bemDom.Elem.__parent.prototype;
    var initEntity = bemDom._initEntity;

    var extension = {
        _buildSelectorByQuery: buildSelector,

        findChild: function (query) {
            return this._queryEntities('find', query, true);
        },

        findChilds: function (query) {
            return this._queryEntities('find', query, false);
        },

        findParent: function (query) {
            return this._queryEntities('parents', query, true);
        },

        findParents: function (query) {
            return this._queryEntities('parents', query, false);
        },

        findMix: function (query) {
            return this._queryEntities('filter', query, true);
        },

        findMixes: function (query) {
            return this._queryEntities('filter', query, false);
        },

        _queryEntities: function (select, query, onlyFirst) {
            var selector = buildSelector(query, this);
            var entityName = getEntityName(query, this);
            var domElems = this.domElem[select](selector);

            if (onlyFirst) {
                return domElems[0] ?
                    initEntity(entityName, domElems.eq(0), undef, true)._setInitedMod() :
                        null;
            }

            var res = [];
            var uniqIds = {};

            domElems.each(function (i, domElem) {
                var block = initEntity(entityName, $(domElem), undef, true)._setInitedMod();
                if (!uniqIds[block._uniqId]) {
                    uniqIds[block._uniqId] = true;
                    res.push(block);
                }
            });

            return new BemDomCollection(res);
        }
    };

    objects.extend(BemDomEntityInBlockProto, extension);
    objects.extend(BemDomEntityInElemProto, extension);

    provide(bemDom);
});
