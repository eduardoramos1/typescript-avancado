// readonly é util quando se tem propriedades que só vao receber valor uma vez e depois disso não podem ser alteradas, somente visualizadas
export class Negociacao {
	constructor(
		readonly data: Date,
		readonly quantidade: number,
		readonly valor: number
	) {}

	get volume() {
		return this.quantidade * this.valor;
	}
}
