import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ValidationService } from './validation.service';
import { PrismaService } from './prisma.service';
@Global()
@Module({
      imports:[
            WinstonModule.forRoot({
                  format: winston.format.json(),
                  transports:[
                        new winston.transports.Console()
                  ]
            }),
            ConfigModule.forRoot({
                  isGlobal: true
            }),
      ],
      providers: [PrismaService, ValidationService],
      exports: [PrismaService, ValidationService]
})
export class CommonModule {}
