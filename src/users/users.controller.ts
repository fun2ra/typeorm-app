import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  ParseIntPipe,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserInterceptor } from 'src/interceptors/current-user.interceptor';

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
  async signin(@Body() user: CreateUserDto, @Session() session: any) {
    const signedUser = await this.authService.signin(user.email, user.password);

    session.userId = signedUser.id;

    return signedUser;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.currentUser = null;
    session.userId = null;
  }

  @Get('/whoami')
  whoIAm(@Session() session: any) {
    return session.userId;
  }

  @Get('/:id')
  async find(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() signedInUser: UserDto,
  ) {
    const user = await this.usersService.findOne(id);
    console.log('Signed in user:', signedInUser);

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
