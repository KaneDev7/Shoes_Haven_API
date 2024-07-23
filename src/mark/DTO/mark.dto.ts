import { PartialType } from "@nestjs/mapped-types";
import {IsNotEmpty } from "class-validator";

export class CreateMarkDto {
  @IsNotEmpty()
  name: string;

  file?: Express.Multer.File;
}


export class UpdateMarkDto extends PartialType(CreateMarkDto) {

}