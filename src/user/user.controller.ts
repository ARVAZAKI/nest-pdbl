import {
      Body,
      Controller,
      Delete,
      Get,
      HttpCode,
      Patch,
      Post,
    } from '@nestjs/common';

    import { UserService } from './user.service';
import { WebResponse } from '../models/web.model';
import {
      RegisterUserRequest,
      UserResponse,
    } from '../models/user.model';
    
@Controller('/api/users/register')
export class UserController {
      constructor(private userService: UserService) {}
      @Post()
  @HttpCode(200)
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);
    return {
      data: result,
    };
  }
}