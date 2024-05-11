import { Module } from '@nestjs/common';
import { UsersModule } from 'src/user_module/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
