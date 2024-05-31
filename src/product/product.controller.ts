import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './DTO/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';


@Controller('api/product')
export class ProductController {
    constructor(readonly userService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() createProductDto: CreateProductDto,
        @Request()  req,
        @UploadedFile(
            new ParseFilePipeBuilder()
              .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
          )
          file: File
    ) {
        console.log()

    }


}
