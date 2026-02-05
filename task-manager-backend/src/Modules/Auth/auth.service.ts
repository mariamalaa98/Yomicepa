import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../Common/Services/prisma.service';
import { SignupDto } from './authDTO/signup.dto';
import { SigninDto } from './authDTO/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto) {
        const { email, fullName, password } = signupDto;

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await this.prisma.user.create({
            data: {
                email,
                fullName,
                passwordHash,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
            }
        });

        return user;
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName
            }
        };
    }
}
