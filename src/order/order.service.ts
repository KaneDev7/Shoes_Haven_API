import { Injectable } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDeliveryDatesDto, UpdateOrderStatusDto } from './DTO/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private OrderModel: Model<Order>
    ) { }

    async create(order: CreateOrderDto) {
        console.log("order", order)
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

    async updateStatus({ orderId, status }: UpdateOrderStatusDto) {
        try {
            await this.OrderModel.findByIdAndUpdate(orderId, {$set : {status}})
            // send mail to client
        } catch (error) {
            console.log(error)
            throw new Error('Somme thing went wrong: ' + error.message)
        }
    }

    async updateDeliveryDate({delivery_date, orderId}: UpdateOrderDeliveryDatesDto){
        try {
            await this.OrderModel.findByIdAndUpdate(orderId, {$set : {delivery_date}})
            // send mail to client
        } catch (error) {
            console.log(error)
            throw new Error('Somme thing went wrong: ' + error.message)
        }
    }

    async deleteOne(orderId : string){
        try {
            await this.OrderModel.findByIdAndDelete(orderId)
        } catch (error) {
            console.log(error)
            throw new Error('Somme thing went wrong: ' + error.message)
        }
    }
}
