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
    Req,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './DTO/createProduct.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { Request, Response } from 'express';
import { SetOnProductStockDto, UpdateProductDto } from './DTO/updateProductDto';
import { SortOrder } from 'mongoose';
import { filterObjectFactory } from 'src/utils/query';


@Controller('api/products')
export class ProductController {
    constructor(readonly productService: ProductService) { }

    @Get()
    async findAll(@Res() res: Response,
        @Query('category') category: string,
        @Query('productId') productId: string,
        @Query('size') size: string,
        @Query('color') color: string,
        @Query('price_lte') price_lte: string,
        @Query('price_gte') price_gte: string,
        @Query('sort_price') sort_price: string | { [key: string]: SortOrder | { $meta: any; }; } | [string, SortOrder][],
        @Query('mark') mark: string,
        @Query('onStock') onStock: boolean | string,
    ) {
        try {
            const filter = filterObjectFactory({ category, size, color, price_lte, price_gte, mark, onStock, productId })
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
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
    async create(
        @Body() createProductDto: CreateProductDto,
        @Res() res: Response,
        @Req() req: Request,
        @UploadedFiles(new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }))
        files: { files?: Express.Multer.File[] }
    ) {

        try {
            const { userId }: { userId?: string } = req.user
            await this.productService.create(createProductDto, files, userId)
            res.status(201).json({ status: 'success', message: 'Product successfully added' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }


    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
    async update(
        @Body() updateProductDto: UpdateProductDto,
        @Res() res: Response,
        @Req() req: Request,
        @Param() { id }: { id: string },
        @UploadedFiles()
        files: { files?: Express.Multer.File[] }
    ) {
        const { userId }: { userId?: string } = req.user
        try {
            await this.productService.update(updateProductDto, files, id, userId)
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
        @Req() req: Request,
        @Param() { id }: { id: string },
    ) {
        const { userId }: { userId?: string } = req.user
        try {
            await this.productService.setOnStock(setOnProductStockDto, id, userId)
            res.status(201).json({ status: 'success', message: `Product stock successfully updated to ${setOnProductStockDto.onStock}` })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteOne(
        @Res() res: Response,
        @Req() req: Request,
        @Param() { id }: { id: string },
        @Query('role') role: string,
    ) {
        const { userId }: { userId?: string } = req.user
        try {
            await this.productService.deleteOne(id, userId)
            res.status(201).json({ status: 'success', message: 'Product successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
}
