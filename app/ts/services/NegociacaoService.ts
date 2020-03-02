import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {
	// hander função como parametro para verificar error
	obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {
		return fetch('http://localhost:8080/dados')
			.then(res => handler(res))
			.then(res => res.json())
			.then((dados: NegociacaoParcial[]) =>
				dados.map(dado => new Negociacao(new Date(), dado.montante, dado.vezes))
			)
			.catch(error => {
				console.log(error.message);
				return error;
			});
	}
}

// aqui estou dizendo que HandlerFunction é uma função que recebe um parametro do tipo Response e retorna um Response
export interface HandlerFunction {
	(res: Response): Response;
}
