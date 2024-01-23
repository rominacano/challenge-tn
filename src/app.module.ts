import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { PayablesModule } from './payables/payables.module';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [TransactionsModule, PayablesModule, CommonsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
