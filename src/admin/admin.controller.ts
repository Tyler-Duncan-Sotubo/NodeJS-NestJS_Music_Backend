import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto, UserDto, AudioDto, SubscriptionDto } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Auth Logic
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.adminService.login(dto);
  }

  @Get('logout/:id')
  @HttpCode(HttpStatus.OK)
  async logout(@Param('id') id: string) {
    return this.adminService.logout(id);
  }

  // Users Logic
  @Get('users')
  @HttpCode(HttpStatus.OK)
  async users() {
    return this.adminService.users();
  }

  @Get('user/:id')
  @HttpCode(HttpStatus.OK)
  async user(@Param('id') id: string) {
    return this.adminService.user(id);
  }

  @Put('user/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.adminService.updateUser(id, dto);
  }

  // Audios Logic
  @Get('audios')
  @HttpCode(HttpStatus.OK)
  async audios() {
    return this.adminService.audios();
  }

  @Get('audio/:id')
  @HttpCode(HttpStatus.OK)
  async audio(@Param('id') id: string) {
    return this.adminService.audio(id);
  }

  @Put('audio/:id')
  @HttpCode(HttpStatus.OK)
  async updateAudio(@Param('id') id: string, @Body() dto: AudioDto) {
    return this.adminService.updateAudio(id, dto);
  }

  // Subscriptions Logic
  @Get('subscriptions')
  @HttpCode(HttpStatus.OK)
  async subscriptions() {
    return this.adminService.subscriptions();
  }

  @Get('subscription/:id')
  @HttpCode(HttpStatus.OK)
  async subscription(@Param('id') id: string) {
    return this.adminService.subscription(id);
  }

  @Put('subscription/:id')
  @HttpCode(HttpStatus.OK)
  async updateSubscription(
    @Param('id') id: string,
    @Body() dto: SubscriptionDto,
  ) {
    return this.adminService.updateSubscription(id, dto);
  }
}
