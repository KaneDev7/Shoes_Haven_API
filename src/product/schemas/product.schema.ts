import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ unique: true })
    productId: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    onStock: boolean;

    @Prop()
    size: number;

    @Prop()
    color: string;

    @Prop()
    mark: string;

    @Prop()
    uri: string[];

    @Prop({default : Date.now()})
    created_at: Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);