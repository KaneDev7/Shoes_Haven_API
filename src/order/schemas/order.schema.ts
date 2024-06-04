import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop({ unique: true })
    user_id: string;

    @Prop()
    items: {
        "product_id": string,
        "quantity": number,
    }[]

    @Prop()
    total_price: number;

    @Prop({
        type: {
            street: String,
            city: String,
        }
    })
    address: {
        street: string,
        city: string,
    };

    @Prop()
    status: 'Pendding' | 'payed' | 'cancel';

    @Prop()
    payment_method: 'Wave' | 'Orange Money' | 'Cash'

    @Prop()
    order_date: Date;

    @Prop()
    delivery_date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);