import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { CreateCategoryDto, UpdateCategoryDto } from './DTO/category.dto';
import { Response } from 'express';

@Controller('api/categories')
export class CategoryController {
    constructor(readonly categoryService: CategoryService) { }

    @Get()
    @UseInterceptors(FileInterceptor('file'))
    async findAll(
        @Res() res: Response,
    ) {
        try {
           const data =  await this.categoryService.findAll()
            res.status(200).json({ status: 'success', data})
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Res() res: Response,
        @UploadedFile(new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }))
        file: Express.Multer.File
    ) {
        try {
            console.log('createCategoryDto', createCategoryDto, 'file', file)
            await this.categoryService.create(createCategoryDto, file)
            res.status(201).json({ status: 201, message: 'Category successfully added' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Res() res: Response,
        @Param() { id }: { id: string },
    ) {
        try {
            console.log('updateCategoryDto',updateCategoryDto, 'id', id)
            await this.categoryService.update(updateCategoryDto, id)
            res.status(201).json({ status: 201, message: 'Category successfully added' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteOne(
        @Res() res: Response,
        @Param() {id} : {id : string},
    ) {
        try {
            await this.categoryService.deleteOne(id)
            res.status(204).json({ status: 204, message: 'Category successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
    
}
