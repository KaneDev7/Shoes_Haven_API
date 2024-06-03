import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({ unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ unique: true })     
    uri: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);