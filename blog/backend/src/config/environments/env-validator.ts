import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

enum NodeEnvEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  console.log(config);

  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });
  console.log(validatedConfig);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
