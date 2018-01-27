module.exports = {
    extends: 'loris/es5',
    root: true,
    env: {
        browser: true,
        node: true
    },
    globals: {
        $: true,
        modules: true, // ym
        angular: true,
        toastr: true,
        moment: true,
        PlungeItem: true,
        // BEMHTML
        block: true,
        def: true,
        tag: true,
        js: true,
        mix: true,
        attrs: true,
        addAttrs: true,
        addMix: true,
        addMods: true,
        addElemMods:true,
        content: true,
        apply: true,
        applyNext: true,
        applyCtx: true,
        elem: true
    },
    rules: {
        'consistent-this': 'off',
        'max-len': [2, {code: 100, ignoreUrls: true}],
        'no-invalid-this': 'off',
        strict: 'off'
    }
};
