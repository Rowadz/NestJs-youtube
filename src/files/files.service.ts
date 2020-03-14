import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './files.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class FilesService extends TypeOrmCrudService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {
    super(fileRepo);
  }

  async dbSave(
    file: Express.Multer.File,
    newFileName: string,
  ): Promise<FileEntity> {
    return this.fileRepo.save(this.mapUploadFile(file, newFileName));
  }

  private mapUploadFile(
    { originalname, mimetype, size }: Express.Multer.File,
    newFileName: string,
  ): Partial<FileEntity> {
    // const { originalname, mimetype, size } = file;
    return {
      original_name: originalname,
      size,
      current_name: newFileName,
      extention: mimetype.split('/')[1], // mimetype: 'image/jpeg'
    };
  }
}
