import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class GenericService {
  pcoket: any;
  constructor() {
    this.pcoket = Object.create(null);
  }
}
