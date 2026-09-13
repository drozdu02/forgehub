import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginResponseDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    accessToken: string;
}