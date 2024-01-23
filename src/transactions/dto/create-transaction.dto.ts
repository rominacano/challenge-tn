import { IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  value: string;

  @IsString()
  description: string;

  @IsString()
  method: string;

  @IsString()
  cardNumber: string;

  @IsString()
  cardHolderName: string;

  @IsString()
  cardExpirationDate: string;

  @IsString()
  cardCvv: string;
}
