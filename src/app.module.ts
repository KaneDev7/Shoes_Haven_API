import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { AuthentificationModule } from './authentification/authentification.module';

  
@Module({
  imports: [
    UserModule,
    ProductModule,
    AuthentificationModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
