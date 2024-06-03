import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { AuthentificationModule } from './authentification/authentification.module';
import { JwtStrategy } from './authentification/jwt.strategy';
import { CategoryModule } from './category/category.module';

  
@Module({
  imports: [
    UserModule,
    ProductModule,
    AuthentificationModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
