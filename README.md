Проект находится в очень ранней стадии разработки, для реальных проектов пока не годится.
Документация еще в стадии написания.

Набор методов для экземпляров BemDomEntity для поиска блоков и элементов в DOM дереве.

Вместо `findChildBlock`, `findChildBlocks`, `findChildElem`, `findChildElems`, `findParentBlock`, `findParentBlocks`, `findParentElem`, `findParentElems`, `findMixedBlock`, `findMixedBlocks`, `findMixedElem`, `findMixedElems` предлагается более короткий список методов с более гибким API.

- `.findChild`
- `.findChilds`
- `.findParent`
- `.findParents`
- `.findMix`
- `.findMixes`

Примеры синтаксиса:

<table>
    <tr>
        <th>Описание</th>
        <th>классический синтаксис</th>
        <th>bem-dom-queries</th>
    </tr>
    <tr>
        <td>Дочерний элемент <code>el</code></td>
        <td>
            <pre>this.findChildElem('el');</pre>
        </td>
        <td>
            <pre>this.findChild('el');</pre>
        </td>
    </tr>
    <tr>
        <td>Родительский блок <code>Form</code></td>
        <td>
            <pre>this.findParentBlock(Form);</pre>
        </td>
        <td>
            <pre>this.findParent(Form);</pre>
        </td>
    </tr>
    <tr>
        <td>Блок <code>Form</code> на той же DOM-node</td>
        <td>
            <pre>this.findMixedBlock(Form);</pre>
        </td>
        <td>
            <pre>this.findMix(Form);</pre>
        </td>
    </tr>
    <tr>
        <td>Дочерний элемент <code>el</code> с модификатором <code>mod1</code> в значении <code>val1</code></td>
        <td>
            <pre>this.findChildElem({
    elem: 'el',
    modName: 'mod1',
    modVal: 'val1'
});</pre>
        </td>
        <td>
            <pre>this.findChild({
    elem: 'el',
    mods: {mod1: 'val1'}
});</pre>
        </td>
    </tr>
    <tr>
        <td>Дочерний элемент <code>el</code> без модификатора <code>mod1</code></td>
        <td>
            <pre>this.findChildElems('el').find(function (el) {
    return !el.hasMod('mod1');
});</pre>
        </td>
        <td>
            <pre>this.findChild({
    elem: 'el',
    mods: {mod1: ''}
});</pre> или
            <pre>this.findChild({
    elem: 'el',
    mods: {mod1: false}
});</pre>
        </td>
    </tr>
    <tr>
        <td>Дочерний элемент <code>el</code> с модификатором <code>mod1</code> в любом значении</td>
        <td>
            <pre>this.findChildElems('el').find(function (el) {
    return el.hasMod('mod1');
});</pre>
        </td>
        <td>
            <pre>this.findChild({
    elem: 'el',
    mods: {mod1: '*'}
});</pre>
        </td>
    </tr>
    <tr>
        <td>Дочерние элементы <code>el</code> с модификатором <code>mod1</code> в значении <code>val1</code> либо в значении <code>val2</code></td>
        <td>
            <pre>this.findChildElems('el').filter(function (el) {
    return el.getMod('mod1') === 'val1' ||
            el.getMod('mod1') === 'val2';
});</pre>
        </td>
        <td>
            <pre>this.findChilds({
    elem: 'el',
    mods: {
        mod1: ['val1', 'val2']
    }
});</pre>
        </td>
    </tr>
    <tr>
        <td>Дочерний элемент <code>el</code> с модификатором <code>mod1</code> в значении <code>val1</code> либо в значении <code>val2</code>, с модификатором <code>mod2</code> в значении <code>true</code>, с модификатором <code>mod3</code> в любом значении и без модификатора <code>mod4</code></td>
        <td>
            <pre>this.findChildElems({
    elem: 'el',
    modName: 'mod2',
    modVal: true
}).find(function (el) {
    return (el.getMod('mod1') === 'val1' ||
                el.getMod('mod1') === 'mod2') &&
            el.hasMod('mod3') &&
            !el.hasMod('mod4');
});</pre>
        </td>
        <td>
            <pre>this.findChild({
    elem: 'el',
    mods: {
        mod1: ['val1', 'val2'],
        mod2: true,
        mod3: '*',
        mod4: false
    }
});</pre>
        </td>
    </tr>
    <tr>
        <td>Дочерний блок <code>Button</code>, находящийся на одной DOM-ноде с элементом <code>control</code> текущего блока</td>
        <td>
            <pre>this.findChildElem('control')
    .findMixedBlock(Button);</pre>
        </td>
        <td>
            <pre>this.findChild({
    block: Button,
    mix: {elem: 'control'}
});</pre>
        </td>
    </tr>
    <tr>
        <td>Дочерние элементы <code>control</code> текущего блока с модификатором <code>type</code> в значении <code>button</code>, находящийся на одной DOM-node с блоком <code>Button</code> без модификатора <code>disabled</code> и с блоком <code>Widget</code></td>
        <td>
            <pre>this.findChildElems({
    elem: 'control',
    modName: 'type',
    modVal: 'button'
}).filter(function (controlEl) {
    return !controlEl.findMixedBlock(Button) ||
            controlEl.findMixedBlock(Button)
                        .hasMod('disabled') ||
            controlEl.findMixedBlock(Widget)
})</pre>
        </td>
        <td>
            <pre>this.findChilds({
    elem: 'control',
    mods: {type: 'button'},
    mix: [
        {
            block: Button,
            mods: {disabled: false},
        },
        Widget
    ]
});</pre>
        </td>
    </tr>
</table>

Из примеров видно, что <code>bem-dom-queries</code> позволяет выражать довольно сложные запросы к DOM в простой и наглядной декларативной форме.

Демо: https://zakaratcha.github.io/bem-dom-queries/
