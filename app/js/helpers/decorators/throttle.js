System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    //  uma função decorator, deve retornar outra função
    function throttle(milisegundos = 500) {
        return function (target, propertyKey, descriptor) {
            // value é o método que o decorator vai interceptar
            const metodoOriginal = descriptor.value;
            // cria uma variavel para um timer
            let timer = 0;
            descriptor.value = function (...args) {
                if (event)
                    event.preventDefault();
                // se o usuario clicar em "importar" diversas vezes, isso será executado. o Timer será resetado e a importaçao so acontecerá após meio segundo sem o usuariom clicar em "importar"
                clearInterval(timer);
                timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
            };
            return descriptor;
        };
    }
    exports_1("throttle", throttle);
    return {
        setters: [],
        execute: function () {
        }
    };
});
