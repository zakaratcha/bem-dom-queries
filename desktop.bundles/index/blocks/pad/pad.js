modules.define('pad', [
    'test0',
    'test1',
    'test1__el',
    'test2',
    'test3',
    'test4',
    'content',
    'testbox',
    'button',
    'i-bem-dom'
], function (
        provide,
        Test0,
        Test1,
        Test1El,
        Test2,
        Test3,
        Test4,
        Content,
        Testbox,
        Button,
        bemDom) {
    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this._events(Button).on('click', function (e) {
                        var text = e.bemTarget.getText();
                        var test1 = this.queryParent(Content).queryChild(Test1);
                        var found = eval(text);

                        if (!found.size) {
                            found = [found];
                        }

                        found.forEach(function (item) {
                            item.queryMix(Testbox).fire();
                        });
                    });
                }
            }
        }
    }));
});
