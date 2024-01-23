import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import axios from 'axios';
import { Transaction } from './interfaces/transaction.interface';
import { PayablesService } from 'src/payables/payables.service';

@Injectable()
export class TransactionsService {
  private readonly apiUrl = 'http://0.0.0.0:8080/transactions';

  constructor(private readonly payablesService: PayablesService) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const formattedTransactionData: Transaction = {
      ...createTransactionDto,
      cardNumber: createTransactionDto.cardNumber.slice(-4),
    };

    const createdTransaction = await axios.post<Transaction>(
      this.apiUrl,
      formattedTransactionData,
    );

    const createdPayable = await this.payablesService.create(
      createdTransaction.data,
    );

    return { transaction: createdTransaction.data, payable: createdPayable };
  }

  async findAll() {
    const transactions = await axios.get<Transaction[]>(this.apiUrl);
    return transactions.data;
  }

  async findOne(id: string) {
    const transaction = await axios.get<Transaction>(`${this.apiUrl}/${id}`);
    return transaction.data;
  }

  async delete(id: string) {
    const transaction = await axios.delete<Transaction>(`${this.apiUrl}/${id}`);
    return transaction.data;
  }
}
