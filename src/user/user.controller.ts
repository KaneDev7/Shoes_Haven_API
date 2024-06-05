import { Body, Controller, Get, HttpStatus, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserContactDto } from './DTO/user.dto';
import { Response } from 'express';
import { serverErrorFactory } from '../authentification/errors/serverErrors';
import { successResponse } from '../success/successResponse';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';


@Controller('api/users')
export class UserController {
    constructor(readonly userService: UserService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res: Response) {
        try {
            const users = await this.userService.findAll()
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
        @Res() res: Response
    ){  
        try {
           await this.userService.createUserContact(createUserContact)
            res.status(201).json({ status: 'success', message: 'contacts successfully updated' })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

}
