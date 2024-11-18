import { ValidationService } from './../common/validation.service';
import { Inject, Injectable } from "@nestjs/common";
import { RegisterUserRequest, UserResponse } from "src/models/user.model";
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
      
}