import { NegociacoesView, MensagemView } from './../views/index';
import { Negociacoes, Negociacao } from './../models/index';
import { domInject } from '../helpers/decorators/index';

export class NegociacaoController {
	@domInject('#data')
	private _inputData: JQuery;

	@domInject('#quantidade')
	private _inputQuantidade: JQuery;

	@domInject('#valor')
	private _inputValor: JQuery;

	private _negociacoes: Negociacoes = new Negociacoes();
	private _negociacoesView = new NegociacoesView('#negociacoesView');
	private _mensagemView = new MensagemView('#mensagemView');

	constructor() {
		this._negociacoesView.update(this._negociacoes);
	}

	adiciona(event: Event) {
		event.preventDefault();

		let date = new Date(this._inputData.val().replace(/-/g, ','));

		if (!this.ehDiaUtil(date)) {
			this._mensagemView.update('Negociações no sabado ou domingo não são permitidas');
			return;
		}

		const negociacao = new Negociacao(
			date,
			parseInt(this._inputQuantidade.val()),
			parseFloat(this._inputValor.val())
		);

		console.log(this._negociacoes);
		this._negociacoes.adiciona(negociacao);
		this._negociacoesView.update(this._negociacoes);
		this._mensagemView.update('Negociação adicionada com sucessos');
	}

	ehDiaUtil(date: Date) {
		return date.getDay() != DiaDaSemana.Sabado && date.getDay() != DiaDaSemana.Domingo;
	}
}

enum DiaDaSemana {
	Domingo,
	Segunda,
	Terça,
	Quarta,
	Quinta,
	Sexta,
	Sabado
}
