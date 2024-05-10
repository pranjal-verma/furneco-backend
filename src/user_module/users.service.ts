import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const { name, email } = user;

    // Create a new instance of the User entity and assign properties
    const newUserEntity = new User();
    newUserEntity.name = name;
    newUserEntity.email = email;
    return this.userRepository.save(newUserEntity);
  }
}
