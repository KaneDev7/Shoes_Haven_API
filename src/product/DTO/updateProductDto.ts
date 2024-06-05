import {PartialType} from '@nestjs/mapped-types'
import { CreateProductDto } from "./createProduct.dto";
import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto)  {

}

export class SetOnProductStockDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
    onStock : boolean
}
