import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    productId: string;

    @Prop()
    title: string;

    @Prop()
    description: string;
    
    @Prop()
    category: string

    @Prop()
    price: number;

    @Prop({default : true})
    onStock: boolean;

    @Prop()
    size: string;

    @Prop()
    color: string;

    @Prop()
    mark: string;

    @Prop()
    uri: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);