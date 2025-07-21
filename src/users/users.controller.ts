import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/login')
  login() {
    return { message: 'Login successful' };
  }
}
