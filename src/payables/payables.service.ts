import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/transactions/interfaces/transaction.interface';
import { Payable } from './interfaces/payable.interface';
import { DateFormatPipe } from 'src/commons/pipes/date-format.pipe';

@Injectable()
export class PayablesService {
  private readonly apiUrl = 'http://0.0.0.0:8080/payables';

  constructor(private readonly dateFormatPipe: DateFormatPipe) { }

  async create(transaction: Transaction) {
    const feeRate = transaction.method === 'debit_card' ? 0.02 : 0.04;
    const netAmount = parseFloat(transaction.value) * (1 - feeRate);

    const payableData = {
      status: transaction.method === 'debit_card' ? 'paid' : 'waiting_funds',
      subtotal: transaction.value,
      discount: feeRate.toFixed(2),
      total: netAmount.toFixed(2),
      create_date: this.calculatePaymentDate(transaction.method),
    };

    const createdPayable = await axios.post(this.apiUrl, payableData);

    return createdPayable.data;
  }

  async findAll() {
    const payables = await axios.get<Payable[]>(this.apiUrl);
    return payables.data;
  }

  async findOne(id: string) {
    const transaction = await axios.get<Payable>(`${this.apiUrl}/${id}`);
    return transaction.data;
  }

  async delete(id: string) {
    const transaction = await axios.delete<Payable>(`${this.apiUrl}/${id}`);
    return transaction.data;
  }

  async getTotalPayables(
    merchantId: number,
    startDate: string,
    endDate: string,
  ) {
    const payables = await axios.get<Payable[]>(this.apiUrl, {
      params: {
        merchantId,
        startDate,
        endDate,
      },
    });

    const totalPaid = payables.data
      .filter((payable) => payable.status === 'paid')
      .reduce((acc, payable) => acc + parseFloat(payable.total), 0);

    const totalFees = payables.data.reduce(
      (acc, payable) => acc + this.calculateFee(payable),
      0,
    );

    const futureIncome = payables.data
      .filter((payable) => payable.status === 'waiting_funds')
      .reduce((acc, payable) => acc + parseFloat(payable.total), 0);

    return {
      totalPaid: totalPaid.toFixed(2),
      totalFees: totalFees.toFixed(2),
      futureIncome: futureIncome.toFixed(2),
    };
  }

  private calculatePaymentDate(paymentMethod: string) {
    const currentDate = new Date();

    if (paymentMethod === 'debit_card') {
      return this.dateFormatPipe.transform(currentDate.toISOString());
    } else {
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + 30);
      return this.dateFormatPipe.transform(futureDate.toISOString());
    }
  }

  private calculateFee(payable: Payable) {
    return parseFloat(payable.subtotal) - parseFloat(payable.total);
  }
}
