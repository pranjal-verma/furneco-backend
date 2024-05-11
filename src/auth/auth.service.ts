import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/users/user.entity';
import { UsersService } from 'src/user_module/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user_module/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loginViaEmail(email: string, password: string): Promise<any> {
    const user = await this.userService.getOne({ email });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    if (user.password != password) {
      throw new UnauthorizedException();
    }
    // TODO: move to a function
    const payload = { id: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(user: CreateUserDto): Promise<any> {
    const savedUser = await this.userService.create(user);
    const payload = { id: savedUser.id, email: savedUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(id: number): Promise<User> {
    return await this.userService.getByID(id);
  }
}
