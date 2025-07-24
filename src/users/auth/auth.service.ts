import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(email, hashedPassword);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findUser(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, hashedPassword] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== hashedPassword) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
