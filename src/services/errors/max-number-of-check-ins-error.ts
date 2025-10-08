// Erro: Recurso não encontrado
export class MaxNumberOfCheckInsError extends Error {
    constructor() {
        super('Max number of check-ins exceeded');
    }
}