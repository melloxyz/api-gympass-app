// Erro: Validação de check-in atrasada
export class LateCheckInValidationError extends Error {
    constructor() {
        super('Check-in validation time limit exceeded.');
    }
}