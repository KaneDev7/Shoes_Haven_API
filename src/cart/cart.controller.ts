import { Body, Controller, Delete, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { CreateCartDto, DeleteOneItemDto } from './DTO/cart.dto';
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
          const result = await this.cartService.create(createCartrDto)
            res.status(201).json({ status: 201, cart : result, message: 'item successfully added' })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Res() res: Response,
        @Req() req: Request
    ) {
        try {
            const { userId }: { userId?: string } = req.user
            const result = await this.cartService.findAll(userId)
            res.status(201).json({ status: 201, data: result })

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
            console.log('body', deleteOneItemDto)
            await this.cartService.deleteOne(deleteOneItemDto)
            res.status(204).json({ status: 204, message: 'item successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('all')
    async deleteAll(
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            const { userId }: { userId?: string } = req.user
            await this.cartService.deleteAll(userId)
            res.status(204).json({ status: 204, message: 'items successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

}
