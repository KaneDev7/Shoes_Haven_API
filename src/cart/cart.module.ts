import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : User.name, schema: UserSchema}])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
