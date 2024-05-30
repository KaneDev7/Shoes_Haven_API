import { IsEmail, IsNotEmpty, Length } from "class-validator";

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
  addresses?: string[]
  cart?: { productId: string; quantity: number }[]
}


