import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from './password.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity.js';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto.js';
import { RegisterResponseDto } from './dto/register-response.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';

@Injectable()
export class AuthService {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService
    ) {}


    async register(
        registerDto: RegisterDto
    ): Promise<RegisterResponseDto> {
        const existingUser = await this.userRepository.findOneBy({
            email: registerDto.email
        });

        if (existingUser) {
            throw new ConflictException(`User with email ${registerDto.email} already exists`);
        }

        const passwordHash = await this.passwordService.hash(
            registerDto.password
        );

        const user = this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            passwordHash: passwordHash
        });
        await this.userRepository.save(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }

    }

    async login(
        loginDto: LoginDto
    ): Promise<LoginResponseDto> {
        const user = await this.userRepository.findOneBy({
            email: loginDto.email
        });

        if (!user) {
            throw new UnauthorizedException(`Invalid email or password`);
        }

        const verified = await this.passwordService.verify(
            user.passwordHash,
            loginDto.password
        );

        if (!verified) {
            throw new UnauthorizedException(`Invalid email or password`);
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            email: user.email,
            accessToken: accessToken
        };
    }
}
