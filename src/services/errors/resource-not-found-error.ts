// Erro: Recurso não encontrado
export class ResourceNotFoundError extends Error {
    constructor() {
        super('Resource not found');
    }
}