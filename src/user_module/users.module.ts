import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {} from 'typeorm';
import { User } from 'src/entities/users/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers:[UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
