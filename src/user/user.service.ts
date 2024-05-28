import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { cryptePassword } from './helpers/auth';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const { password } = createUserDto
            const hash = await cryptePassword(password)
            const createdUser = new this.UserModel({ ...createUserDto, password: hash });
            return createdUser.save();
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.UserModel.find().exec();
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}
