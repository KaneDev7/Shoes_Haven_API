import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.TOKEN_SECRET}`,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{name : User.name, schema: UserSchema }]),
  ],
  providers: [AuthentificationService],
  controllers: [AuthentificationController],
})
export class AuthentificationModule {}
