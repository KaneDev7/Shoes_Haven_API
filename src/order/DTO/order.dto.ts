import { IsNotEmpty, Length } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  items: {
    productId: string,
    quantity: number,
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

}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  status: 'Pendding' | 'Payed' | 'Cancel';
}


export class UpdateOrderDeliveryDatesDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  delivery_date: Date
}
