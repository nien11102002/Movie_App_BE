import { ConflictException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AddUserDto } from './dto/add_user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserInfoDto } from './dto/update_user_info.dto';
import { TUser } from 'src/common/types/types';
import { userInfo } from 'os';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserListType() {
    const listUserType = await this.prisma.user_types.findMany({
      select: { id: true, user_type: true },
    });

    return listUserType;
  }

  async getListUser(keyword: string) {
    const listUser = await this.prisma.users.findMany({
      where: {
        full_name: {
          contains: keyword || '',
        },
      },
      select: {
        account: true,
        email: true,
        full_name: true,
        phone_number: true,
      },
    });
    return listUser;
  }

  async getListUserPagination(keyword: string, page: number, pageSize: number) {
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.users.count({
      where: {
        full_name: {
          contains: keyword,
        },
      },
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const result = await this.prisma.users.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
      where: {
        full_name: {
          contains: keyword || '',
        },
      },
    });

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: result || [],
    };
  }
  async searchUser(keyword: string) {
    const listUser = await this.prisma.users.findMany({
      where: {
        full_name: {
          contains: keyword || '',
        },
      },
      select: {
        account: true,
        email: true,
        full_name: true,
        phone_number: true,
      },
    });
    return listUser;
  }

  async searchUserPagination(keyword: string, page: number, pageSize: number) {
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.users.count({
      where: {
        full_name: {
          contains: keyword,
        },
      },
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const result = await this.prisma.users.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
      where: {
        full_name: {
          contains: keyword || '',
        },
      },
    });

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: result || [],
    };
  }

  async accountInfo() {
    return `accountInfo`;
  }

  async getUserInfo(user: TUser) {
    return user;
  }

  async addUser(addUser: AddUserDto) {
    const existedUser = await this.prisma.users.findFirst({
      where: { account: addUser.account },
    });
    if (existedUser)
      throw new ConflictException('This account is not available!');

    const hashPassword = bcrypt.hashSync(addUser.password, 10);

    const newUser = await this.prisma.users.create({
      data: {
        account: addUser.account,
        full_name: addUser.full_name,
        email: addUser.email,
        phone_number: addUser.phone_number,
        password: hashPassword,
        user_type_id: addUser.user_type_id,
      },
    });

    return {
      user: {
        account: newUser.account,
        full_name: newUser.full_name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        user_type_id: newUser.user_type_id,
      },
    };
  }

  async put_UpdateUserInfo(updateUserInfo: UpdateUserInfoDto, user: TUser) {
    let { full_name, email, phone_number, user_type_id } = updateUserInfo;
    const updatedUser = await this.prisma.users.update({
      where: { account_id: user.account_id },
      data: {
        full_name: full_name ? full_name : user.full_name,
        email: email ? email : user.email,
        phone_number: phone_number ? phone_number : user.phone_number,
        user_type_id: user_type_id ? user_type_id : user.user_type_id,
      },
    });
    return updatedUser;
  }

  async post_UpdateUserInfo() {
    return `post_UpdateUserInfo`;
  }

  async deleteUser(account: string) {
    await this.prisma.users.delete({
      where: { account: account },
    });
    return `Successfully delete account ${account}`;
  }
}
