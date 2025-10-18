/**
 * Validation utilities
 */

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validateBriefData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.length < 10) {
    errors.push('Название должно содержать минимум 10 символов');
  }

  if (!data.tags || data.tags.length === 0) {
    errors.push('Выберите хотя бы один тег');
  }

  if (!data.budgetMin || data.budgetMin < 100) {
    errors.push('Минимальный бюджет должен быть не менее $100');
  }

  if (data.budgetMax && data.budgetMax < data.budgetMin) {
    errors.push('Максимальный бюджет должен быть больше минимального');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
