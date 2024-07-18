import { PartialType } from "@nestjs/mapped-types";
import {IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;  
  
  file: Express.Multer.File;
}


export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

}