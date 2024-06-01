import { plainToInstance } from 'class-transformer';
import { Environment } from './environment';
import { validateSync } from 'class-validator';

export let Config: Environment;

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Environment, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  Config = Object.freeze(validatedConfig);

  return validatedConfig;
}
