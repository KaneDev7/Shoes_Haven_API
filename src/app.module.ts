import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { AuthentificationModule } from './authentification/authentification.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { MarkModule } from './mark/mark.module';

  
@Module({
  imports: [
    UserModule,
    ProductModule,
    AuthentificationModule,
    CategoryModule,
    OrderModule,
    CartModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    MarkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
