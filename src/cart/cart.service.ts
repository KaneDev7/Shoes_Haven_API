import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateCartDto, DeleteAlItemsDto, DeleteOneItemDto } from './DTO/cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>
    ) { }

    async findAll(userId :string) {
        try {
            return await this.UserModel.findById(userId, { cart: 1, _id: 0 })
        } catch (error) {
            console.log(error)
            throw new Error('Somme thing went wrong: ' + error.message)
        }
    }

    async create({ user_id, ...cart }: CreateCartDto) {

        const { cart: currentItems } = await this.UserModel.findById(user_id, { cart: 1, _id: 0 })
        const { productId, size } = cart.item
        const index = currentItems.findIndex(item => item.productId === productId && item.size === size)
        const isItemInCard = index !== -1
        try {
            if (!isItemInCard) {
                await this.UserModel.findByIdAndUpdate(user_id,
                    { $addToSet: { cart: cart.item } },
                    { new: true, upsert: true }
                )
            } else {
                const updateFondItemQuantity = currentItems.map(item => {
                    if (item.productId === productId && item.size === size) {
                        return { ...item, quantity: item.quantity + cart.item.quantity }
                    } else {
                        return item
                    }
                })
                await this.UserModel.findByIdAndUpdate(user_id, { $set: { cart: updateFondItemQuantity } })
            }

        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    async deleteOne({ user_id, productId }: DeleteOneItemDto) {
        try {
            await this.UserModel.findByIdAndUpdate(user_id,
                { $pull: { cart: { productId } } },
                { new: true }
            )
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }


    async deleteAll({ user_id }: DeleteAlItemsDto) {
        try {
            await this.UserModel.findByIdAndUpdate(user_id, { cart: [] })
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }
}
