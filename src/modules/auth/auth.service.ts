import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TUserAccount } from 'src/common/types/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { account, password } = loginDto;

    const userExists = await this.prisma.users.findFirst({
      where: {
        account: account,
      },
      select: {
        account_id: true,
        password: true,
      },
    });

    console.log();
    if (!userExists)
      throw new BadRequestException('Account không tồn tại, vui lòng đăng ký');

    const passHash = userExists.password;
    const isPassword = bcrypt.compareSync(password, passHash);
    if (!isPassword) throw new BadRequestException(`Mật khẩu không chính xác`);

    const tokens = this.createTokens(userExists);

    return tokens;
  }

  createTokens(userExists: TUserAccount) {
    const accessToken = this.jwtService.sign(
      { account_id: userExists.account_id },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { account_id: userExists.account_id },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
      },
    );

    return { accessToken, refreshToken };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, full_name, phone_number, account } = registerDto;

    const userExists = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (userExists) throw new BadGatewayException(`Email existed!`);

    const hashPassword = bcrypt.hashSync(password, 10);

    const userNew = await this.prisma.users.create({
      data: {
        email: email,
        full_name: full_name,
        password: hashPassword,
        phone_number: phone_number,
        user_type: 'Customer',
        account: account,
      },
      select: {
        account: true,
        full_name: true,
        email: true,
        phone_number: true,
        user_type: true,
      },
    });

    //await mailSender(email);

    return userNew;
  }
}
