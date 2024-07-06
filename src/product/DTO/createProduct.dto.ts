import { IsHexColor, IsNotEmpty, IsString, Length } from "class-validator";

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
  price : number

  @IsNotEmpty()
  size: number; 

  @IsString()
  color: string;

  @Length(3, 30)
  mark: string;
  
  files: Express.Multer.File[];
}


