import { Injectable } from '@nestjs/common';
import { createUserContactDto } from './DTO/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        try {
            return await this.UserModel.find().exec();
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async createUserContact({user_id, address, phoneNum} : createUserContactDto){
        try {
            await this.UserModel.findByIdAndUpdate(user_id, {$set : {address , phoneNum}})
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}
