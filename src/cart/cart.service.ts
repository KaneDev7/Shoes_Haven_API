import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateCartrDto } from './DTO/cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>
    ) { }

    async create({user_id, ...cart} : CreateCartrDto){
 
        try {
            await this.UserModel.findOneAndUpdate({ _id : user_id },
                { $addToSet: { cart} },
                { new: true, upsert: true }
            )
            
        } catch (error) {
            
        }
    }
}
