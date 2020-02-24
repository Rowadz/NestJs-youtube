import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { PostEntity } from '../posts.entity';

@ValidatorConstraint({ async: true })
export class UniqueTitleConstrainsts implements ValidatorConstraintInterface {
  constructor() {}

  async validate(title: string, args: ValidationArguments): Promise<boolean> {
    const postRepo: Repository<PostEntity> = await (
      await import('../posts.entity')
    ).default;

    return !!!(await postRepo.findOne({ where: { title } }));
  }
}

export function IsUniqueTitle(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueTitleConstrainsts,
      async: true,
    });
  };
}
