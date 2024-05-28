
export const serverErrorFactory = (message: string): { statusCode: number, message: string[], error : string } => {
    const statusCode = 500
    const error = 'Internal server error' 
    const isEmailDuplicated = message.includes('email') && message.includes('E11000 duplicate key error')
    const isUsernameDuplicated = message.includes('username') && message.includes('E11000 duplicate key error')

    if (isEmailDuplicated) {
        message = 'Email already existe'
        return { statusCode, message: [message] , error}
    } else if (isUsernameDuplicated) {
        message = 'Username already existe'
        return { statusCode, message : [message], error }
    } else {
        message = 'SomeThing went wrong'
        return { statusCode, message : [message], error }
    }
}