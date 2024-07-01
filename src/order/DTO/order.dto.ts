import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  username : string

  @IsEmail()
  email : string

  @IsNotEmpty()
  items: {
    productId: string,
    quantity: number,
  }[];

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  status:  'pendding' | 'deliveried' | 'canceled';

  @IsNotEmpty()
  payment_method: 'Wave' | 'Orange Money' | 'Cash'

  @IsNotEmpty()
  order_date: string;

}

export class UpdateOrderStatusDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  orderId: string;
}


export class UpdateOrderDeliveryDatesDto extends PartialType(UpdateOrderStatusDto) {
  @IsNotEmpty()
  delivery_date: Date
}
