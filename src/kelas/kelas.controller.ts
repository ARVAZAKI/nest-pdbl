import {
      Controller,
      Get,
      Post,
      Put,
      Delete,
      Param,
      Body,
      NotFoundException,
    } from '@nestjs/common';
    import { PrismaService } from '../common/prisma.service';
    import { KelasRequest, KelasResponse } from '../models/kelas.model';
    
    @Controller('/api/kelas')
    export class KelasController {
      constructor(private readonly prisma: PrismaService) {}
    
      @Get()
      async findAll(): Promise<KelasResponse[]> {
        return await this.prisma.kelas.findMany();
      }
    
      @Get(':id')
      async findOne(@Param('id') id: string): Promise<KelasResponse> {
        const kelas = await this.prisma.kelas.findUnique({ where: { id } });
        if (!kelas) throw new NotFoundException('Kelas not found');
        return kelas;
      }
    
      @Post()
      async create(@Body() data: KelasRequest): Promise<KelasResponse> {
        return await this.prisma.kelas.create({ data });
      }
    
      @Put(':id')
      async update(
        @Param('id') id: string,
        @Body() data: KelasRequest,
      ): Promise<KelasResponse> {
        const kelas = await this.prisma.kelas.findUnique({ where: { id } });
        if (!kelas) throw new NotFoundException('Kelas not found');
        return await this.prisma.kelas.update({ where: { id }, data });
      }
    
      @Delete(':id')
      async delete(@Param('id') id: string): Promise<KelasResponse> {
        const kelas = await this.prisma.kelas.findUnique({ where: { id } });
        if (!kelas) throw new NotFoundException('Kelas not found');
        return await this.prisma.kelas.delete({ where: { id } });
      }
    }
    