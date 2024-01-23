import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PayablesService } from 'src/payables/payables.service';
import axios from 'axios';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let payablesService: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, PayablesService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    payablesService = module.get<PayablesService>(PayablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction and a payable', async () => {
      const formattedTransactionData = {
        // Provide the expected formatted transaction data
      };

      const createdTransaction = {
        data: {
          // Provide the expected created transaction data
        },
      };

      const createTransactionDto = {
        value: '100',
        description: 'Test transaction',
        method: 'credit',
        cardNumber: '1234567890',
        cardHolderName: 'John Doe',
        cardExpirationDate: '12/23',
        cardCvv: '123',
      };

      const createdPayable = {
        // Provide the expected created payable data
      };

      jest.spyOn(axios, 'post').mockResolvedValue(createdTransaction);
      jest.spyOn(payablesService, 'create').mockResolvedValue(createdPayable);

      const result = await service.create(createTransactionDto);

      expect(axios.post).toHaveBeenCalledWith(
        service['apiUrl'],
        formattedTransactionData,
      );
      expect(payablesService.create).toHaveBeenCalledWith(
        createdTransaction.data,
      );
      expect(result).toEqual({
        transaction: createdTransaction.data,
        payable: createdPayable,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const transactions = {
        data: [
          // Provide the expected array of transactions
        ],
      };

      jest.spyOn(axios, 'get').mockResolvedValue(transactions);

      const result = await service.findAll();

      expect(axios.get).toHaveBeenCalledWith(service['apiUrl']);
      expect(result).toEqual(transactions.data);
    });
  });

  describe('findOne', () => {
    it('should return a transaction', async () => {
      const id = '123';
      const transaction = {
        data: {
          // Provide the expected transaction data
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(transaction);

      const result = await service.findOne(id);

      expect(axios.get).toHaveBeenCalledWith(`${service['apiUrl']}/${id}`);
      expect(result).toEqual(transaction.data);
    });
  });

  describe('delete', () => {
    it('should delete a transaction', async () => {
      const id = '123';
      const transaction = {
        data: {
          // Provide the expected deleted transaction data
        },
      };

      jest.spyOn(axios, 'delete').mockResolvedValue(transaction);

      const result = await service.delete(id);

      expect(axios.delete).toHaveBeenCalledWith(`${service['apiUrl']}/${id}`);
      expect(result).toEqual(transaction.data);
    });
  });
});
