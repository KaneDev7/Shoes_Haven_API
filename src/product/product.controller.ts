import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    Put,
    Query,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './DTO/createProduct.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { Response } from 'express';
import { SetOnProductStockDto, UpdateProductDto } from './DTO/updateProductDto';
import { SortOrder } from 'mongoose';
import { filterObjectFactory } from 'src/utils/query';


@Controller('api/products')
export class ProductController {
    constructor(readonly productService: ProductService) { }

    @Get()
    async findAll(@Res() res: Response,
        @Query('category') category: string,
        @Query('size') size: string,
        @Query('color') color: string,
        @Query('price_lte') price_lte: string,
        @Query('price_gte') price_gte: string,
        @Query('sort_price') sort_price:  string | { [key: string]: SortOrder | { $meta: any; }; } | [string, SortOrder][],
        @Query('mark') mark: string,
        @Query('onStock') onStock: boolean | string, 

    ) {
        try {
            const filter = filterObjectFactory({category, size,color, price_lte, price_gte, mark, onStock})
            const results = await this.productService.findAll(filter, sort_price)
            res.status(201).json({ status: 'success', data: results })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }

    @Get(':id')
    async findOne(@Param() { id }: { id: string }, @Res() res: Response) {
        try {
            const results = await this.productService.findOne(id)
            res.status(201).json({ status: 'success', data: results })

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5 }]))
    async create(
        @Body() createProductDto: CreateProductDto,
        @Res() res: Response,
        @UploadedFiles(new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }))
        files: { files?: Express.Multer.File[] }
    ) {
        if (createProductDto.role !== 'admin') {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' })
        }

        try {
            await this.productService.create(createProductDto, files)
            res.status(201).json({ status: 'success', message: 'Product successfully added' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }


    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5 }]))
    async update(
        @Body() updateProductDto: UpdateProductDto,
        @Res() res: Response,
        @Param() { id }: { id: string },
        @UploadedFiles()
        files: { files?: Express.Multer.File[] }
    ) {
        if (updateProductDto.role !== 'admin') {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' })
        }

        try {
            await this.productService.update(updateProductDto, files, id)
            res.status(201).json({ status: 'success', message: 'Product successfully updated' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/stock/:id')
    async setOnStock(
        @Body() setOnProductStockDto: SetOnProductStockDto,
        @Res() res: Response,
        @Param() { id }: { id: string },
    ) {
        if (setOnProductStockDto.role !== 'admin') {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' })
        }

        try {
            await this.productService.setOnStock(setOnProductStockDto, id)
            res.status(201).json({ status: 'success', message: `Product stock successfully updated to ${setOnProductStockDto.onStock} ` })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteOne(
        @Res() res: Response,
        @Param() { id }: { id: string },
        @Query('role') role: string,
    ) {

        if (role !== 'admin') {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' })
        }

        try {
            await this.productService.deleteOne(id)
            res.status(201).json({ status: 'success', message: 'Product successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
}
