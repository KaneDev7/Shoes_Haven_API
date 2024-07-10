import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";

export class CreateCartDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  item: {
    productId: string,
    quantity: number,
    size: string
  };
}

export class DeleteOneItemDto {
  @IsNotEmpty()
  productId: string
  
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  size: string
}


export class DeleteAlItemsDto extends PartialType(CreateCartDto) {

}