import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max, Min, min } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  token?: string
  roel?: string
  isActive?: boolean
  cart?: { productId: string; quantity: number }[]
}


export class createUserContactDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  phoneNum: string;


  @IsNotEmpty()
  address: {
    street: string,
    city: string,
  };
  
}