import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto, RegisterDto } from './DTO/login.dto';
import { AuthentificationService } from './authentification.service';
import { authErrorFactory } from './errors/authError';
import { successResponse } from './success/successResponse';
import { serverErrorFactory } from './errors/serverErrors';

@Controller('api/auth')
export class AuthentificationController {
    constructor(readonly authentificationService: AuthentificationService) {}

    @Post('/register')
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
        try {
            await this.authentificationService.register(registerDto)
            res.status(201).json({ status: 'success', message: 'user created' })
        } catch (error) {
            console.log(error)
            const serverErrorObject = serverErrorFactory(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(serverErrorObject)
        }
    }
    
    
    @Post('/login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        try {
            const result = await this.authentificationService.login(loginDto)
            const { username, email, token, isActive, role } = result
            res.status(201).json(successResponse({username, email, token,isActive, role }, ''))
        } catch (error) {
            console.log(error)
            const serverErrorObject = authErrorFactory(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(serverErrorObject)
        }
    }
}
