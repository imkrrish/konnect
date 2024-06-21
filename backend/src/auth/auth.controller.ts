import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    const user = await this.authService.register(userDto);
    if (!user) {
      return {
        isSucces: false,
        message: 'User already exists',
      };
    }
    return {
      isSucces: true,
      data: user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { userNameOrEmail, password } = loginDto;

    const user = await this.authService.findByUserNameOrEmail(userNameOrEmail);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.jwtService.sign(
        {
          _id: user._id,
          userName: user.userName,
          email: user.email,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      );

      res.cookie('__session', token, {
        // domain: process.env.FE_BASE_URL,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
      });

      return res.json({
        isSucces: true,
        message: 'Login successful',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Invalid credentials',
      });
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get('info')
  async getInfo(@Req() req: Request) {
    const user = req.user as User;

    return {
      isSuccess: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        userName: user.userName,
      },
    };
  }
}
