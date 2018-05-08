Набор методов для экземпляров BemDomEntity для поиска блоков и элементов в DOM дереве.

Вместо findChildBlock, findChildBlocks, findChildElem, findChildElems, findParentBlock, findParentBlocks, findParentElem, findParentElems, findMixedBlock, findMixedBlocks, findMixedElem, findMixedElems предлагается более короткий список методов с более гибким API.

- .findChild
- .findChilds
- .findParent
- .findParents
- .findMix
- .findMixes

Находится в стадии очень ранней разработки, для реальных проектов пока не годится. В i-bem-dom.js код вставлен довольно варварски и при несовпадении версий bem-core может (и обязательно будет) вызывать проблемы.

Документация также еще в стадии написания.

Демо: https://zakaratcha.github.io/bem-dom-queries/