import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user.email, user.password);
  }

  @Get('/users')
  findAllUsers() {
    return this.usersService.findUsers();
  }
}
