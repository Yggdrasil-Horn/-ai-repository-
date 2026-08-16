/**
 * World 1: Core Validation Engine
 * Validates data against schemas and ensures integrity
 */

export interface ValidationRule {
  name: string;
  validate: (data: unknown) => Promise<boolean>;
  errorMessage?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  timestamp: Date;
}

export class Validator {
  private rules: ValidationRule[] = [];

  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  async validate(data: unknown): Promise<ValidationResult> {
    const errors: string[] = [];
    
    for (const rule of this.rules) {
      try {
        const isValid = await rule.validate(data);
        if (!isValid) {
          errors.push(rule.errorMessage || `Validation failed: ${rule.name}`);
        }
      } catch (error) {
        errors.push(`Error in rule ${rule.name}: ${error}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      timestamp: new Date()
    };
  }
}

export default Validator;
