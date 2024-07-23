import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MarkDocument = HydratedDocument<Mark>;

@Schema()
export class Mark {
    @Prop({ unique: true })
    name: string;

    @Prop({ unique: true })     
    uri: string;
}

export const MarkSchema = SchemaFactory.createForClass(Mark);