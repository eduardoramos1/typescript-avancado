import { NegociacoesView, MensagemView } from './../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from './../models/index';
import { domInject, throttle } from '../helpers/decorators/index';

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

		fetch('http://localhost:8080/dados')
			.then(res => isOk(res))
			.then(res => res.json())
			.then((dados: NegociacaoParcial[]) => {
				dados
					.map(dado => new Negociacao(new Date(), dado.montante, dado.vezes))
					.forEach(negociacao => this._negociacoes.adiciona(negociacao));

				this._negociacoesView.update(this._negociacoes);
			})
			.catch(error => console.log(error.message));
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
