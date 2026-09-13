import { ConflictException, Injectable } from '@nestjs/common';
import { PasswordService } from './password.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity.js';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto.js';
import { RegisterResponseDto } from './dto/register-response.dto.js';

@Injectable()
export class AuthService {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly passwordService: PasswordService
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
}
