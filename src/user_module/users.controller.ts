import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
}
