import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './files.entity';
import { MulterModule } from '@nestjs/platform-express';
import { GenericService } from 'src/generic/generic.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FilesController],
  providers: [FilesService, GenericService],
})
export class FilesModule {}
