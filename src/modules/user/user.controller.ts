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
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { AddUserDto } from './dto/add_user.dto';
import { UpdateUserInfoDto } from './dto/update_user_info.dto';
import { User } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/common/types/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('get-list-user-type')
  getUserListType() {
    return this.userService.getUserListType();
  }

  @Public()
  @Get('get-list-user')
  @ApiQuery({ name: 'keyword', required: false })
  getListUser(@Query(`keyword`) keyword: string) {
    return this.userService.getListUser(keyword);
  }

  @Public()
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

  @Public()
  @Get('search-user')
  @ApiQuery({ name: 'keyword', required: false })
  searchUser(@Query(`keyword`) keyword: string) {
    return this.userService.searchUser(keyword);
  }

  @Public()
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
    @Query('keyword') keyword?: string,
    @Query(`page`) page?: string,
    @Query(`pageSize`) pageSize?: string,
  ) {
    return this.userService.searchUserPagination(keyword, +page, +pageSize);
  }

  // @Post('account-info')
  // accountInfo() {
  //   return this.userService.accountInfo();
  // }

  @ApiBearerAuth()
  @Get('get-user-info')
  getUserInfo(@User() user: TUser) {
    return this.userService.getUserInfo(user);
  }

  @ApiBearerAuth()
  @Post('add-user')
  addUser(@Body() addUser: AddUserDto) {
    return this.userService.addUser(addUser);
  }

  @ApiBearerAuth()
  @Put('update-user-info')
  put_UpdateUserInfo(
    @Body() updateUserInfo: UpdateUserInfoDto,
    @User() user: TUser,
  ) {
    return this.userService.put_UpdateUserInfo(updateUserInfo, user);
  }

  // @Post('update-user-info')
  // post_UpdateUserInfo() {
  //   return this.userService.post_UpdateUserInfo();
  // }

  @ApiBearerAuth()
  @Delete('delete-user')
  deleteUser(@Query('account') account: string) {
    return this.userService.deleteUser(account);
  }
}
