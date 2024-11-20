import { ValidationService } from './../common/validation.service';
import { Inject, Injectable } from "@nestjs/common";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "src/models/user.model";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from 'src/common/prisma.service';
import {Logger} from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { HttpException } from '@nestjs/common';

@Injectable()
export class UserService {
      constructor(
            private validationService: ValidationService,
            @Inject(WINSTON_MODULE_PROVIDER) private logger:Logger,
            private prismaService: PrismaService
      ){}
      async register(request: RegisterUserRequest) : Promise<UserResponse> {
            this.logger.info(`register new user ${JSON.stringify(request)}`);
            const registerRequest = this.validationService.validate(UserValidation.REGISTER, request);
            const totalUserWithSameUsername = await this.prismaService.user.count({
                  where: {
                    username: registerRequest.username,
                  },
                });
            
                if (totalUserWithSameUsername != 0) {
                  throw new HttpException('Username already exists', 400);
                }
            
                registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
            
                const user = await this.prismaService.user.create({
                  data: registerRequest,
                });
            
                return {
                  username: user.username,
                };
      }

      async login(request: LoginUserRequest): Promise<UserResponse> {
        this.logger.info(`UserService.login(${JSON.stringify(request)})`);
      
        // Validasi input
        const LoginRequest: LoginUserRequest = this.validationService.validate(
          UserValidation.LOGIN,
          request,
        );
      
        // Cari user berdasarkan username
        const user = await this.prismaService.user.findUnique({
          where: {
            username: LoginRequest.username,
          },
        });
      
        if (!user) {
          throw new HttpException('User or Password is wrong', 401);
        }
      
        // Validasi password
        const isPasswordValid = await bcrypt.compare(
          LoginRequest.password,
          user.password,
        );
        if (!isPasswordValid) {
          throw new HttpException('User or Password is wrong', 401);
        }
      
        // Generate token dan perbarui user
        const newToken = uuid();
        await this.prismaService.user.update({
          where: {
            id: user.id,
          },
          data: {
            token: newToken,
          },
        });
      
        // Ambil kembali data user dengan token terbaru
        const updatedUser = await this.prismaService.user.findUnique({
          where: {
            id: user.id,
          },
        });
      
        // Pastikan token diperbarui
        if (!updatedUser?.token) {
          throw new HttpException('Failed to generate token', 500);
        }
      
        // Return response dengan token yang baru
        return {
          username: updatedUser.username,
          token: updatedUser.token,
        };
      }
      
      
}