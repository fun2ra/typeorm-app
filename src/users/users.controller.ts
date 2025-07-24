import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  ParseIntPipe,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';

import { SignedCookies } from 'src/decorators/signed-cookies.decorator';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user.email, user.password);
  }

  @Post('/signin')
  async signin(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const signedUser = await this.authService.signin(user.email, user.password);

    response.cookie('id', signedUser.id, {
      signed: true,
    });

    return signedUser;
  }

  @Get('/:id')
  async find(
    @Param('id', ParseIntPipe) id: number,
    @SignedCookies('id') cookieId: string,
  ) {
    console.log('Cookie ID:', cookieId);
    if (!id) {
      throw new UnauthorizedException('User ID is required');
    }
    const user = await this.usersService.findOne(id);

    return user;
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
