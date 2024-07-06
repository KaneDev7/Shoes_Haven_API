import { Injectable } from '@nestjs/common';
import { createUserContactDto } from './DTO/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

    async findAll(userId: string): Promise<User[]> {
        try {
            const { role } = await this.UserModel.findById(userId, { _id: 0, role: 1 })
            if (role !== 'admin') throw new Error('UNAUTHORIZED')
            return await this.UserModel.find().exec();
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async findOne(userId: string): Promise<User[]> {
        try {
            return await this.UserModel.findById(userId)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async createUserContact({user_id, address, phoneNum} : createUserContactDto, userId: string){
        try {
            const { role } = await this.UserModel.findById(userId, { _id: 0, role: 1 })
            if (role !== 'admin') throw new Error('UNAUTHORIZED')
            await this.UserModel.findByIdAndUpdate(user_id, {$set : {address , phoneNum}})
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}
