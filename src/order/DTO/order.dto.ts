import { IsNotEmpty, Length } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  items: {
    "product_id": string,
    "quantity": number,
  }[];

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  status: 'Pendding' | 'payed' | 'cancel';

  @IsNotEmpty()
  payment_method: 'Wave' | 'Orange Money' | 'Cash'

  @IsNotEmpty()
  address: {
    street: string,
    city: string,
  };

  @IsNotEmpty()
  order_date: string;

  delivery_date: string;
}