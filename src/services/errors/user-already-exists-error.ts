// Erro: Indica que o usuário já existe
export class UserAlreadyExistError extends Error {
    constructor() {
        super('Email already exists');
    }
}