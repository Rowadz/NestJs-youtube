import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { Crud, CrudController } from '@nestjsx/crud';
import { FileEntity } from './files.entity';
import { GenericService } from 'src/generic/generic.service';
import { readFile } from 'fs';
import { promisify } from 'util';
const readFileAsyc = promisify(readFile);
import * as sharp from 'sharp';

@Crud({
  model: {
    type: FileEntity,
  },
  routes: {
    only: ['getOneBase'],
  },
})
@Controller('files')
export class FilesController implements CrudController<FileEntity> {
  static genericSercive: GenericService;
  private readonly sizes: string[];
  constructor(public service: FilesService, genericSercive: GenericService) {
    FilesController.genericSercive = genericSercive;
    this.sizes = ['25X25', '50X50', '50X50', '200X200', '400X400', '900X900'];
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: Express.Request, file: Express.Multer.File, cb) =>
          cb(null, 'public/uploads'),
        filename: (req: Express.Request, file: Express.Multer.File, cb) => {
          // mimetype: 'image/jpeg',
          const [, ext] = file.mimetype.split('/');
          FilesController.genericSercive.pcoket.filename = `${v4()}.${ext}`;
          cb(null, FilesController.genericSercive.pcoket.filename);
        },
      }),
      limits: {
        fileSize: 1e7, // the max file size in bytes, here it's 100MB,
        files: 1,
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileEntity> {
    const [, ext] = file.mimetype.split('/');
    this.saveImages(ext, file);
    return this.service.dbSave(
      file,
      FilesController.genericSercive.pcoket.filename,
    );
  }

  private async saveImages(
    ext: string,
    file: Express.Multer.File,
  ): Promise<void> {
    if (['jpeg', 'jpg', 'png'].includes(ext)) {
      this.sizes.forEach((s: string) => {
        const [size] = s.split('X');
        readFileAsyc(file.path)
          .then((b: Buffer) => {
            return sharp(b)
              .resize(+size)
              .toFile(
                `${__dirname}/../../public/uploads/${s}/${FilesController.genericSercive.pcoket.filename}`,
              );
          })
          .then(console.log)
          .catch(console.error);
      });
    }
  }
}
