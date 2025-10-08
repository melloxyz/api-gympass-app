// Erro: Distância máxima excedida
export class MaxDistanceError extends Error {
    constructor() {
        super('Max distance exceeded');
    }
}