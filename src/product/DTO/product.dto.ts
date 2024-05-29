import { IsBoolean, IsDataURI, IsDate, IsEmail, IsHexColor, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min, } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()

  @IsString()
  productId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsPositive()
  @IsNumber()
  price : number

  @IsBoolean()
  onStock: boolean;

  @Min(41)
  @Max(46)
  @IsNumber()
  size: number;


  @IsHexColor()
  color: string;

  @Length(3, 10)
  @IsString()
  mark: string;

  @IsDataURI()
  uri: string;

  @IsDate()
  created_at: Date;
}


