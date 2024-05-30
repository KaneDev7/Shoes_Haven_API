import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}


