import {
  Body,
  Controller,
  Get,
  Put,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../common/decorator';
import { JwtGuard } from '../common/guard';
import { UserService } from './user.service';
import { UserInfoDto, UserSubscriptionDto } from './dto';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  getMe(@GetUser() user: User) {
    return user;
  }

  // Create User Information
  @HttpCode(HttpStatus.CREATED)
  @Post('/account')
  createAccountInformation(@Body() userInfo: UserInfoDto) {
    return this.userService.createAccountInformation(userInfo);
  }

  // Get User Information
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/account')
  getAccountInformation(@GetUser() user: User) {
    return this.userService.getAccountInformation(user);
  }

  // Update User Information
  @HttpCode(HttpStatus.OK)
  @Put('/account')
  updateAccountInformation(@Body() userInfo: UserInfoDto) {
    return this.userService.updateAccountInformation(userInfo);
  }

  // Create Subscription
  @HttpCode(HttpStatus.CREATED)
  @Post('/subscription')
  createSubscription(@Body() sub: UserSubscriptionDto) {
    return this.userService.createSubscription(sub);
  }

  //get subscription
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/subscription')
  getSubscription(@GetUser() user: User) {
    return this.userService.getSubscription(user);
  }

  // Update Subscription
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Put('/subscription')
  updateSubscription(@GetUser() user: User) {
    return this.userService.updateSubscription(user);
  }
}
