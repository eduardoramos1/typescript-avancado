System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    //  uma função decorator, deve retorar outra função
    function logarTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            // value é o método que o decorator vai interceptar
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
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
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
