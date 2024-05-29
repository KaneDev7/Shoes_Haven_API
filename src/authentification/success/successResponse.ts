import { CreateUserDto } from "src/user/DTO/user.dto"

export const successResponse =  (data : any , message: string = '') => {
        return {data , message}
}