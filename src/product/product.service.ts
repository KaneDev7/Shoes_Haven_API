import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProductDto } from './DTO/createProduct.dto';
import { SetOnProductStockDto, UpdateProductDto } from './DTO/updateProductDto';
import { FilterQueryParams } from './types/queryParams'
import { deleteFiles } from 'src/utils/file';
import { User } from 'src/user/schemas/user.schema';


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private ProductModel: Model<Product>,
        @InjectModel(User.name) private UserModel: Model<User>
    ) { }

    async create(createProductDto: CreateProductDto, files: { files?: Express.Multer.File[] }, userId: string) {
        try {
            const { role } = await this.UserModel.findById(userId, { _id: 0, role: 1 })
            if (role !== 'admin') throw new Error('UNAUTHORIZED')
            const imageUris = files.files.map(file => file.filename)
            await this.ProductModel.create({ ...createProductDto, uri: imageUris })
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async findAll(filter: FilterQueryParams, sort_price: any) {
        try {
            let query = this.ProductModel.find(filter);

            if (sort_price !== undefined) {
                query = query.sort({ price: sort_price });
            }
            return await query.exec();
            
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

    async update(updateProductDto: UpdateProductDto, files: { files?: Express.Multer.File[] }, id: string, userId: string) {
        try {
            const { role } = await this.UserModel.findById(userId, { _id: 0, role: 1 })
            if (role !== 'admin') throw new Error('UNAUTHORIZED')

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

    async setOnStock({ onStock }: SetOnProductStockDto, productId: string, userId: string) {

        try {
            const { role } = await this.UserModel.findById(userId, { _id: 0, role: 1 })
            if (role !== 'admin') throw new Error('UNAUTHORIZED')
            await this.ProductModel.findByIdAndUpdate(productId, { $set: { onStock } })
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async deleteOne(id: string, userId: string) {
        if (!isValidObjectId(id)) {
            throw new Error(`id unknown ${id}`)
        }
        try {
            const { role } = await this.UserModel.findById(userId, { _id: 0, role: 1 })
            if (role !== 'admin') throw new Error('UNAUTHORIZED')
            const productDeletd: any = await this.ProductModel.findByIdAndDelete(id, { returnDocument: 'after' })
            const { uri: fileNames } = productDeletd
            await deleteFiles(fileNames)
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }
}
