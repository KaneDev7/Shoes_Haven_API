import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { CreateCartrDto } from './DTO/cart.dto';
import { Response } from 'express';

@Controller('api/cart')
export class CartController {
    constructor(readonly cartService: CartService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createCartrDto: CreateCartrDto,
        @Res() res: Response,
    ) {
        try {
            this.cartService.create(createCartrDto)
            res.status(201).json({ status: 'success', message: 'items successfully added' })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
}
