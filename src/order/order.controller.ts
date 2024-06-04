import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTO/order.dto';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { Response } from 'express';

@Controller('api/order')
export class OrderController {
    constructor(readonly orderService: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async  create(
        @Body() createOrderDto :  CreateOrderDto,
        @Res() res: Response,
     ){
       try {
        this.orderService.create(createOrderDto)
        res.status(201).json({ status: 'success', message: 'Order successfully added' })

       } catch (error) {
        console.log(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
       }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res: Response,){
        try {
            this.orderService.findAll()
            const results =  await this.orderService.findAll()   
            res.status(201).json({ status: 'success', data: results })
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })  
            
        }
    }

}
