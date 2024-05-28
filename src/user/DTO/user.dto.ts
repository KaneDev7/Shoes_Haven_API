import { IsEmail, IsNotEmpty, Length, Max, Min, } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(3)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
   
    @IsNotEmpty()
    @Length(5)
    password: string;

    roel?: string
    isActive?: boolean
    addresses?: string[]
    cart? : {productId: string; quantity: number }[]
  }


