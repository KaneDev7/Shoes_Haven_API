import { Body, Controller, Get, HttpStatus, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {createUserContactDto } from './DTO/user.dto';
import { Request, Response } from 'express';
import { serverErrorFactory } from '../authentification/errors/serverErrors';
import { successResponse } from '../success/successResponse';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';


@Controller('api/users')
export class UserController {
    constructor(readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Res() res: Response,
        @Req() req: Request,
    ) {
        try {
            const { userId }: { userId?: string } = req.user
            const users = await this.userService.findAll(userId)
            const responseObject = successResponse(users)
            res.status(HttpStatus.OK).json(responseObject)
        } catch (error) {
            console.log(error)
            const serverErrorObject = serverErrorFactory(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(serverErrorObject)
        }
    }
 

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async findOne(
        @Res() res: Response,
        @Req() req: Request,
    ) {
        try {
            const { userId }: { userId?: string } = req.user
            const users = await this.userService.findOne(userId)
            const responseObject = successResponse(users)
            res.status(HttpStatus.OK).json(responseObject)
        } catch (error) {
            console.log(error)
            const serverErrorObject = serverErrorFactory(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(serverErrorObject)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('contact')
    async createUserContact(
        @Body() createUserContact : createUserContactDto,
        @Res() res: Response,
        @Req() req: Request,
    ){  
        const { userId }: { userId?: string } = req.user
        try {
           await this.userService.createUserContact(createUserContact, userId)
            res.status(201).json({status: 201, message: 'contacts successfully updated' })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
}
