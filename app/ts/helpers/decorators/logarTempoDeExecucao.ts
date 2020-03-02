//  uma função decorator, deve retornar outra função
export function logarTempoDeExecucao(emSegundos: boolean = false) {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		// value é o método que o decorator vai interceptar
		const metodoOriginal = descriptor.value;

		descriptor.value = function(...args: any[]) {
			// para verificar se o tempo de execução mostrado será em segundos ou ms
			let unidade = 'ms';
			let divisor = 1;
			if (emSegundos) {
				unidade = 's';
				divisor = 1000;
			}

			console.log('---------------------------');
			console.log(`parametros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
			const t1 = performance.now();

			const retorno = metodoOriginal.apply(this, args);

			const t2 = performance.now();
			console.log(`O retorno do método ${propertyKey} é : ${JSON.stringify(retorno)}`);
			console.log(`O método ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);
			return retorno;
		};

		return descriptor;
	};
}
