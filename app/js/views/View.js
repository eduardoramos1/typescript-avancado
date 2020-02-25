// namespaces servem para ajudar achar classes usando o autocomplete do ts
var Views;
(function (Views) {
    // abstract sao classes que nao permitem serem instanciadas
    class View {
        constructor(seletor) {
            this._elemento = $(seletor);
        }
        update(model) {
            this._elemento.html(this.template(model));
        }
    }
    Views.View = View;
})(Views || (Views = {}));
