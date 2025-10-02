// Erro: Credenciais inválidas fornecidas
export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid credentials provided');
    }
}