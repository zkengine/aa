import { TokenOverview } from './token-overview';
import { TrendingToken } from './trending';

export type BaseActionResult<TBody> = {
  message: string;
  body?: TBody;
};

export type AllBalancesResultBodyType = {
  balances: {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
  }[];
};

export type BalanceResultBodyType = {
  balance: number;
  token: string;
  name: string;
  logoURI: string;
};

export type GetTokenAddressResultBodyType = {
  address: string;
};

export type GetTrendingTokensResultBodyType = {
  tokens: TrendingToken[];
};

export type GetTokenDataResultBodyType = {
  token: TokenOverview;
};
