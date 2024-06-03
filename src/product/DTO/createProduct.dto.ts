import { IsHexColor, IsNotEmpty, Length } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category : string;

  @IsNotEmpty()
  price : string

  @IsNotEmpty()
  size: string;

  @IsHexColor()
  color: string;

  @Length(3, 10)
  mark: string;

  @IsNotEmpty()
  role? :  string
  
  files: Express.Multer.File[];
}


