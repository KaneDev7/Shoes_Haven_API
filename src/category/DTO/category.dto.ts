import {IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @Length(3)
  name: string;

  description: string;  
  file: Express.Multer.File;
}