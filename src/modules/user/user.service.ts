import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma/prisma.service';

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
          contains: keyword,
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
  async searchUser() {
    return `searchUser`;
  }
  async searchUserPagination() {
    return `searchUserPagination`;
  }
  async accountInfo() {
    return `accountInfo`;
  }
  async getUserInfo() {
    return `getUserInfo`;
  }
  async addUser() {
    return `addUser`;
  }
  async put_UpdateUserInfo() {
    return `put_UpdateUserInfo`;
  }
  async post_UpdateUserInfo() {
    return `post_UpdateUserInfo`;
  }
  async deleteUser() {
    return `deleteUser`;
  }
}
