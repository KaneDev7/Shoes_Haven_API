import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Product } from 'src/product/product.schema';
import { ProductSchema } from 'src/product/schemas/product.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{name : User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name : Product.name, schema: ProductSchema }]),
  ],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
 