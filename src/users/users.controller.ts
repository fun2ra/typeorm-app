import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    return this.usersService.create(user.email, user.password);
  }

  @Get('/:id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  findUser(@Query('email') email: string) {
    return this.usersService.findUser(email);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
