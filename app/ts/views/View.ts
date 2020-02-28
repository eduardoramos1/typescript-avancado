import { logarTempoDeExecucao } from './../helpers/decorators/logarTempoDeExecucao';

// abstract sao classes que nao permitem serem instanciadas
export abstract class View<T> {
	protected _elemento: JQuery;
	private _escapar: boolean;

	constructor(seletor: string, escapar: boolean = false) {
		this._elemento = $(seletor);
		this._escapar = escapar;
	}

	// permite que eu intercepte a função update, execute algo antes dela iniciar e também posso definir algo depois dela iniciar
	@logarTempoDeExecucao(true)
	update(model: T) {
		let template = this.template(model);
		if (this._escapar) template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
		this._elemento.html(template);
	}

	// método abstrato exige que na classe filho ele seja substituido
	abstract template(model: T): string;
}
