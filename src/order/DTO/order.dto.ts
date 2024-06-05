import { PartialType } from "@nestjs/mapped-types";
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
