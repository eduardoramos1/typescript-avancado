// abstract sao classes que nao permitem serem instanciadas
export abstract class View<T> {
	protected _elemento: JQuery;

	constructor(seletor: string) {
		this._elemento = $(seletor);
	}

	update(model: T) {
		this._elemento.html(this.template(model));
	}

	// método abstrato exige que na classe filho ele seja substituido
	abstract template(model: T): string;
}
