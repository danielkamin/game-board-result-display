/**
 * A collection of utility functions for safely validating data
 * received from IPC channels
 */

/**
 * Validates if a value is a number and within a specified range
 * @param value Value to check
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @param fallback Optional fallback value if validation fails
 * @returns The validated number or fallback value
 */
export function validateNumber(
  value: unknown,
  min: number,
  max: number,
  fallback = 0
): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    console.warn(`Invalid number received: ${value}`);
    return fallback;
  }

  if (value < min || value > max) {
    console.warn(
      `Number out of range: ${value}. Valid range: [${min}, ${max}]`
    );
    return fallback;
  }

  return value;
}

/**
 * Validates if a value is a string with optional length constraints
 * @param value Value to check
 * @param minLength Minimum string length (optional)
 * @param maxLength Maximum string length (optional)
 * @param fallback Optional fallback value if validation fails
 * @returns The validated string or fallback value
 */
export function validateString(
  value: unknown,
  minLength = 0,
  maxLength = Infinity,
  fallback = ''
): string {
  if (typeof value !== 'string') {
    console.warn(`Invalid string received: ${value}`);
    return fallback;
  }

  if (value.length < minLength || value.length > maxLength) {
    console.warn(
      `String length out of range: ${value.length}. Valid range: [${minLength}, ${maxLength}]`
    );
    return fallback;
  }

  return value;
}

/**
 * Safely parses JSON without throwing exceptions
 * @param jsonString String to parse as JSON
 * @param fallback Optional fallback value if parsing fails
 * @returns The parsed object or fallback value
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return fallback;
  }
}

/**
 * Validates if a value matches one of the enum values
 * @param value Value to check
 * @param enumObj Enum object to validate against
 * @param fallback Optional fallback enum value if validation fails
 * @returns The validated enum value or fallback value
 */
export function validateEnum<T extends object>(
  value: unknown,
  enumObj: T,
  fallback: T[keyof T]
): T[keyof T] {
  const enumValues = Object.values(enumObj);

  if (enumValues.includes(value as T[keyof T])) {
    return value as T[keyof T];
  }

  console.warn(
    `Invalid enum value: ${value}. Valid values: ${enumValues.join(', ')}`
  );
  return fallback;
}
