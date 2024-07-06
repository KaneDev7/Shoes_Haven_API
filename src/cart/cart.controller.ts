import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { CreateCartDto, DeleteAlItemsDto, DeleteOneItemDto } from './DTO/cart.dto';
import { Response, Request } from 'express';

@Controller('api/cart')
export class CartController {
    constructor(readonly cartService: CartService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createCartrDto: CreateCartDto,
        @Res() res: Response,
    ) {
        try {
            this.cartService.create(createCartrDto)
            res.status(201).json({ status: 'success', message: 'item successfully added' })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async fondAll(
        @Res() res: Response,
        @Req() req: Request
    ) {
        try {
            const { userId }: { userId?: string } = req.user
            const result = await this.cartService.findAll(userId)
            res.status(201).json({ status: 'success', data: result })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }


    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteOne(
        @Body() deleteOneItemDto: DeleteOneItemDto,
        @Res() res: Response
    ) {
        try {
            await this.cartService.deleteOne(deleteOneItemDto)
            res.status(201).json({ status: 'success', message: 'item successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }


    @UseGuards(JwtAuthGuard)
    @Delete('all')
    async deleteAll(
        @Body() deleteAlItemsDto: DeleteAlItemsDto,
        @Res() res: Response
    ) {
        try {
            await this.cartService.deleteAll(deleteAlItemsDto)
            res.status(201).json({ status: 'success', message: 'items successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

}
