import IMask from 'imask';
import { formatUnits } from 'viem';

export const maskedNumeric = IMask.createMask({
  mask: 'num',
  lazy: true,
  blocks: {
    num: {
      lazy: true,
      mask: Number,
      scale: 2,
      signed: false,
      normalizeZeros: true,
      thousandsSeparator: ',',
      padFractionalZeros: true,
      radix: '.',
      mapToRadix: ['.'],
    },
  },
});

export const formatNumberInWei = (amount: bigint | number | string | undefined, decimals = 6) => {
  if (!amount || !Number(amount)) return '-';
  return maskedNumeric.resolve(formatUnits(BigInt(Math.round(Number(amount))), Number(decimals)));
};

export const formatNumber = (value: number | bigint | string | undefined, scale = 2) => {
  if (!value) return '-';

  const _maskedNumeric = IMask.createMask({
    mask: 'num',
    lazy: true,
    blocks: {
      num: {
        lazy: true,
        mask: Number,
        scale: scale,
        signed: false,
        normalizeZeros: true,
        thousandsSeparator: ',',
        padFractionalZeros: true,
        radix: '.',
        mapToRadix: ['.'],
      },
    },
  });

  return _maskedNumeric.resolve(`${value}`);
};

export const formatCurrency = (value: number | bigint | string | undefined, scale = 2) => {
  if (!value) return '-';

  const maskedCurrency = IMask.createMask({
    mask: '$num',
    lazy: true,
    blocks: {
      num: {
        lazy: true,
        mask: Number,
        scale: scale,
        signed: false,
        normalizeZeros: true,
        thousandsSeparator: ',',
        padFractionalZeros: false,
        radix: '.',
        mapToRadix: ['.'],
      },
    },
  });

  return maskedCurrency.resolve(`${value}`);
};

export function shortenAddress(value?: string, digits = 4): string {
  if (!value) return '';

  return value?.slice(0, digits + 2) + '...' + value?.slice(-digits);
}

export const isSameAddress = (addr1 = '', addr2 = '') => {
  return addr1?.toLowerCase() === addr2?.toLowerCase();
};

export function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(`${cookieName}=`));
  return cookie ? cookie.split('=')[1] : null;
}

export function validateCsvData(lines: string[]): boolean {
  if (lines.length === 0) {
    return false;
  }

  const requiredHeaders = ['Wallet Address', 'Amount'];

  const headers = lines[0].split(',').map(header => header.trim());
  const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));

  if (missingHeaders.length > 0 || headers.length !== requiredHeaders.length) {
    return false;
  }

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(value => value.trim());
    if (row.length !== requiredHeaders.length || isNaN(Number(row[1]))) {
      console.error(`Row ${i + 1} does not match the required format.`);
      return false;
    }
  }

  return true;
}

/**
 * Count the number of commas in a string
 * @param str - The string to count commas in
 * @returns The number of commas in the string
 */
function countCommas(str: string): number {
  const matches = str.match(/,/g);
  return matches ? matches.length : 0;
}

/**
 * Transform the data of a csv line
 * @param data - A csv line to transform
 * @returns The transformed string
 */
export function transformLineData(data: string) {
  const withoutQuotes = data.replace(/"/g, ''); // remove quotes from each csv line

  let formatted = withoutQuotes;
  const commasCount = countCommas(formatted);
  // if there are more than 1 commas, keep the first one and remove the rest (in case of the amount has thousands separator)
  // e.g. 0xaddress,1,000,000 -> 0xaddress,1000000
  if (commasCount > 1) {
    formatted = formatted.replace(/(\d),(?=\d{3}(\.|,|$))/g, '$1');
  }

  return formatted;
}

export const decimalPlaces = (value: string): number => {
  const decimals = value.split('.')[1];
  return decimals ? decimals.length : 0;
};

export const getErrorMessage = (err: any) => {
  if (err?.includes('insufficient funds') || err?.message?.includes('insufficient funds')) {
    return 'Insufficient balance to cover the gas fee.';
  } else if (err?.includes('User rejected') || err?.message?.includes('User rejected')) {
    return 'You have rejected the transaction.';
  } else {
    return 'Something went wrong!';
  }
};
