import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @Length(3)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
