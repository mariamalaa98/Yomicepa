import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './authDTO/signup.dto';
import { SigninDto } from './authDTO/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully created.' })
    @ApiResponse({ status: 409, description: 'Email already exists.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign in user' })
    @ApiResponse({ status: 200, description: 'User signed in successfully.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }
}
