import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants/constant';


export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        return hash
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}