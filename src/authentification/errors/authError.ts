
export const authErrorFactory = (message: string): { statusCode: number, message: string[], error: string } => {
    let statusCode = 500
    let error = 'Internal server error'
    
    if (message.includes('Incorrect username or password')) {
        error = 'Authentification error'
    }
    return { statusCode, message: [message], error }
}