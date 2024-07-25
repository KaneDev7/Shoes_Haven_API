import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { Response } from 'express';
import { MarkService } from './mark.service';
import { CreateMarkDto, UpdateMarkDto } from './DTO/mark.dto';

@Controller('api/marks')
export class MarkController {
    constructor(readonly markService: MarkService) { }

    @Get()
    @UseInterceptors(FileInterceptor('file'))
    async findAll(
        @Res() res: Response,
    ) {
        try {
           const data =  await this.markService.findAll()
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
        @Body() createMarkDto: CreateMarkDto,
        @Res() res: Response,
        @UploadedFile(new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }))
        file: Express.Multer.File
    ) {
        try {
            console.log('createMarkDto', createMarkDto, 'file', file)
            await this.markService.create(createMarkDto, file)
            res.status(201).json({ status: 201, message: 'Mark successfully added' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Body() updateMarkDto: UpdateMarkDto,
        @Res() res: Response,
        @Param() { id }: { id: string },
    ) {
        try {
            console.log('updateMarkDto',updateMarkDto, 'id', id)
            await this.markService.update(updateMarkDto, id)
            res.status(201).json({ status: 201, message: 'Mark successfully added' })
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
            await this.markService.deleteOne(id)
            res.status(204).json({ status: 204, message: 'Mark successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
    
}