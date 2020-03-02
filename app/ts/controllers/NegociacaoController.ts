import { NegociacoesView, MensagemView } from './../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from './../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from './../services/index';

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

	private _negociacaoService = new NegociacaoService();

	constructor() {
		this._negociacoesView.update(this._negociacoes);
	}

	@throttle()
	adiciona() {
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

	@throttle()
	importarDados() {
		function isOk(res: Response) {
			if (res.ok) {
				return res;
			} else {
				throw new Error(res.statusText);
			}
		}

		this._negociacaoService.obterNegociacoes(isOk).then(negociacoes =>
			negociacoes.forEach(negociacao => {
				this._negociacoes.adiciona(negociacao);
				this._negociacoesView.update(this._negociacoes);
			})
		);
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
