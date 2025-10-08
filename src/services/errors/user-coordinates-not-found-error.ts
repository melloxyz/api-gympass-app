// Erro: Coordenadas do usuário não encontradas
export class UserCoordinatesNotFoundError extends Error {
    constructor() {
        super('User coordinates not found');
    }
}