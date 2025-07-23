import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
  constructor(partial: Partial<UserDto>) {
    if (partial.email) {
      this.email = partial.email;
    }

    if (partial.password) {
      this.password = partial.password;
    }
  }

  @IsEmail()
  email: string;

  @Exclude()
  @IsString()
  password: string;
}
