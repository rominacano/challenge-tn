export interface Transaction {
  id?: number;
  value: string;
  description: string;
  method: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpirationDate: string;
  cardCvv: string;
}
