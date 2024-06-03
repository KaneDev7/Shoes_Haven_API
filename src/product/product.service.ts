import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './DTO/createProduct.dto';
import { UpdateProductDto } from './DTO/updateProductDto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private ProductModel: Model<Product>
    ) { }

    async create(createProductDto: CreateProductDto, files: { files?: Express.Multer.File[] }) {
        const imageUris = files.files.map(file => file.filename)
        try {
            console.log('createProductDto', createProductDto)
            await this.ProductModel.create({ ...createProductDto, uri: imageUris })
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async findAll(category: string) {
        try {
            if (!category) {
                return await this.ProductModel.find()
            }
            return await this.ProductModel.find({ category })
        } catch (error) {
            console.log(error)
            throw new Error('Somme thing went wrong: ' + error.message)
        }
    }


    async findOne(id: string) {
        try {
            return await this.ProductModel.findById(id)

        } catch (error) {
            console.log(error)
            throw new Error('Somme thing went wrong: ' + error.message)
        }
    }

    async update(updateProductDto: UpdateProductDto, files: { files?: Express.Multer.File[] }, id: string) {
        try {
            if (files.files !== undefined) {
                const imageUris = files.files.map(file => file.filename)
                await this.ProductModel.findByIdAndUpdate(id, { ...updateProductDto, uri: imageUris })
            } else {
                await this.ProductModel.findByIdAndUpdate(id, updateProductDto)
            }
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async deleteOne(id: string) {
        try {
            await this.ProductModel.findByIdAndDelete(id)

        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }
}
