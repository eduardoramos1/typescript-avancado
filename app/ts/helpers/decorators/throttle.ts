//  uma função decorator, deve retornar outra função
export function throttle(milisegundos = 500) {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		// value é o método que o decorator vai interceptar
		const metodoOriginal = descriptor.value;

		// cria uma variavel para um timer
		let timer = 0;
		descriptor.value = function(...args: any[]) {
			if (event) event.preventDefault();
			// se o usuario clicar em "importar" diversas vezes, isso será executado. o Timer será resetado e a importaçao so acontecerá após meio segundo sem o usuariom clicar em "importar"
			clearInterval(timer);
			timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
		};

		return descriptor;
	};
}
