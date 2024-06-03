import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { CreateCategoryDto } from './DTO/category.dto';
import { Response } from 'express';

@Controller('api/category')
export class CategoryController {
    constructor(readonly categoryService: CategoryService) { }

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
            console.log("createCategoryDto", createCategoryDto)
            await this.categoryService.create(createCategoryDto, file)
            res.status(201).json({ status: 'success', message: 'Category successfully added' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
}
