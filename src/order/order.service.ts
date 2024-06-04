import { Injectable } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './DTO/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private OrderModel: Model<Order>
    ) { }

    async create(order: CreateOrderDto) {
        try { 
            await this.OrderModel.create(order)
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async findAll() {
        try {
            return await this.OrderModel.find()
        } catch (error) {
            console.log(error)
            throw new Error('Somme thing went wrong: ' + error.message)
        }
    }
}
