import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/entities/users/user.entity';
import { CreateUserDto, UserDTO } from 'src/user_module/user.dto';
import { UserAuthGuard } from './auth.gaurd';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // A basic route to login from email and password strings
  // yields a JWT with user id
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return this.authService.loginViaEmail(email, password);
  }

  @Post('signup')
  async create(@Body(ValidationPipe) user: CreateUserDto) {
    const userCreated = await this.authService.createUser(user);
    return userCreated;
  }

  @UseGuards(UserAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param() params: any): Promise<UserDTO> {
    return toUserDTO(await this.authService.getProfile(params.id));
  }
}

function toUserDTO(user: User): UserDTO {
  return { id: user.id, email: user.email };
}
