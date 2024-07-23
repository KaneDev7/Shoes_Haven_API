import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mark } from './schemas/mark.schema';
import { CreateMarkDto, UpdateMarkDto } from './DTO/mark.dto';

@Injectable()
export class MarkService {
    constructor(
        @InjectModel(Mark.name) private MarkModel: Model<Mark>
    ) { }

    async findAll() {
        try {
            return this.MarkModel.find()
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async create(createMarkDto: CreateMarkDto, file: Express.Multer.File) {

        try {
            if (!file) {
                return await this.MarkModel.create(createMarkDto)
            }
            await this.MarkModel.create({ ...createMarkDto, uri: file.filename })
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async update(updateMarkDto: UpdateMarkDto, id: string) {
        try {
            return await this.MarkModel.findByIdAndUpdate(id, updateMarkDto)
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }

    async deleteOne(id: string) {
        try {
            await this.MarkModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
            throw new Error(`Some thing went wrong : ${error.message}`)
        }
    }
}
