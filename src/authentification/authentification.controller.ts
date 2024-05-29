import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { serverErrorFactory } from 'src/user/errors/serverErrors';
import { LoginDto } from './DTO/login.dto';
import { AuthentificationService } from './authentification.service';
import { authErrorFactory } from './errors/authError';
import { successResponse } from './success/successResponse';

@Controller('api/auth')
export class AuthentificationController {
    constructor(readonly authentificationService: AuthentificationService) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        try {
            const result = await this.authentificationService.login(loginDto)
            const { username, email, token,isActive,role } = result
            res.status(201).json(successResponse({username, email, token,isActive,role }, ''))
        } catch (error) {
            console.log(error)
            const serverErrorObject = authErrorFactory(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(serverErrorObject)
        }
    }
}
