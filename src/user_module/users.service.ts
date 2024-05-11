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

  async getByID(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // TODO: add interface for UserFilter and build query
  async getOne(filter: any): Promise<User> {
    console.log(filter);
    return this.userRepository.findOneBy({
      ...filter,
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    // Create a new instance of the User entity and assign properties
    const newUserEntity = new User();
    newUserEntity.name = user.name;
    newUserEntity.email = user.email;
    newUserEntity.password = user.password;
    return this.userRepository.save(newUserEntity);
  }
}
