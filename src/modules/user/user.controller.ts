import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-list-user-type')
  getUserListType() {
    return this.userService.getUserListType();
  }

  @Get('get-list-user')
  @ApiQuery({ name: 'keyword', required: false })
  getListUser(@Query(`keyword`) keyword: string) {
    return this.userService.getListUser(keyword);
  }

  @Get('get-list-user-pagination')
  @ApiQuery({
    name: 'keyword',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Number of items per page',
  })
  getListUserPagination(
    @Query('keyword') keyword?: string,
    @Query(`page`) page?: number,
    @Query(`pageSize`) pageSize?: number,
  ) {
    return this.userService.getListUserPagination(keyword, +page, +pageSize);
  }

  @Get('search-user')
  searchUser() {
    return this.userService.searchUser();
  }

  @Get('search-user-pagination')
  @ApiQuery({
    name: 'keyword',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Number of items per page',
  })
  searchUserPagination(
    @Query('keyword') keyword: string,
    @Req() req: Request,
    @Query(`page`) page?: string,
    @Query(`pageSize`) pageSize?: string,
  ) {
    return this.userService.searchUserPagination();
  }

  @Post('account-info')
  accountInfo() {
    return this.userService.accountInfo();
  }

  @Post('get-user-info')
  getUserInfo() {
    return this.userService.getUserInfo();
  }

  @Post('add-user')
  addUser() {
    return this.userService.addUser();
  }

  @Put('update-user-info')
  put_UpdateUserInfo() {
    return this.userService.put_UpdateUserInfo();
  }

  @Post('update-user-info')
  post_UpdateUserInfo() {
    return this.userService.post_UpdateUserInfo();
  }

  @Delete('delete-user')
  deleteUser() {
    return this.userService.deleteUser();
  }
}
