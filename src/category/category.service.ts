import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './DTO/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private CategoryModel: Model<Category>
    ) { }

    async create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
        try {
            await this.CategoryModel.create({ ...createCategoryDto, uri: file.filename })
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }
}
