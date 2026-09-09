import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}


