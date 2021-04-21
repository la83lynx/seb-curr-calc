export interface Currency {
  curr: string;
  rate: number;
}

export interface Currencies {
  list?: Currency[];
  expires?: Date;
  error?: string;
}
