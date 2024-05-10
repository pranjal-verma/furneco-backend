import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup')
  async create(@Body(ValidationPipe) user: CreateUserDto) {
    const userCreated = await this.userService.create(user);
    console.log(userCreated);

    return userCreated;
  }
}
