import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './DTO/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private CategoryModel: Model<Category>
    ) { }

    async findAll() {
        try {
            return this.CategoryModel.find()
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
        try {
            await this.CategoryModel.create({ ...createCategoryDto, uri: file.filename })
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async update(updateCategoryDto: UpdateCategoryDto, id : string) {
        try {
           return await this.CategoryModel.findByIdAndUpdate(id, updateCategoryDto)
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async deleteOne(id: string) {
        try {
            await this.CategoryModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }
}
