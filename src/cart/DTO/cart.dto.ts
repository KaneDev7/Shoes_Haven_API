import { IsNotEmpty } from "class-validator";

export class CreateCartDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  item: {
    productId: string,
    quantity: number,
  };
}


export class DeleteOneItemDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  productId: string 
}



export class DeleteAlItemsDto {
  @IsNotEmpty()
  user_id: string;
}