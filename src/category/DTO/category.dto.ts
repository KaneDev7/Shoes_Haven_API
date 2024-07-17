import {IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;  
  
  file: Express.Multer.File;
}