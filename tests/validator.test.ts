import Validator from '../src/worlds/1-validation';
import { ValidationRule } from '../src/worlds/1-validation';

describe('Validator - World 1', () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new Validator();
  });

  test('should add and execute validation rules', async () => {
    const rule: ValidationRule = {
      name: 'notEmpty',
      validate: async (data) => data !== '' && data !== null,
      errorMessage: 'Data cannot be empty'
    };

    validator.addRule(rule);
    const result = await validator.validate('test');

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should fail validation and return errors', async () => {
    const rule: ValidationRule = {
      name: 'notEmpty',
      validate: async () => false,
      errorMessage: 'Validation failed'
    };

    validator.addRule(rule);
    const result = await validator.validate('');

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Validation failed');
  });
});
