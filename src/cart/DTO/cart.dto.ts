import { IsNotEmpty } from "class-validator";

export class CreateCartrDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  items: {
    product_id: string,
    quantity: number,
  }[];

  @IsNotEmpty()
  total_price: number;

}