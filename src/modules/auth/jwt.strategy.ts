import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TUser } from 'src/common/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, `protect`) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    // console.log(`validate`);
    // console.log({ payload });
    const user: TUser = await this.prisma.users.findUnique({
      where: { account_id: Number(payload.account_id) },
      select: {
        account: true,
        account_id: true,
        full_name: true,
        email: true,
        phone_number: true,
        user_type_id: true,
      },
    });

    // console.log(user);
    return user;
  }
}
