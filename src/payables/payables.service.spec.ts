import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { Transaction } from 'src/transactions/interfaces/transaction.interface';

describe('PayablesService', () => {
  let service: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayablesService],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payable with the correct data', async () => {
      // Arrange
      const transaction: Transaction = {
        method: 'debit_card',
        value: '100',
        description: 'Transaction description',
        cardNumber: '1234567890123456',
        cardHolderName: 'John Doe',
        cardExpirationDate: '12/23',
        cardCvv: '123',
      };

      // Act
      const createdPayable = await service.create(transaction);

      // Assert
      expect(createdPayable).toBeDefined();
      expect(createdPayable.status).toBe('paid');
      expect(createdPayable.subtotal).toBe('100');
      expect(createdPayable.discount).toBe('0.02');
      expect(createdPayable.total).toBe('98');
      expect(createdPayable.create_date).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of payables', async () => {
      // Act
      const payables = await service.findAll();

      // Assert
      expect(Array.isArray(payables)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a payable with the specified id', async () => {
      // Arrange
      const id = '1';

      // Act
      const payable = await service.findOne(id);

      // Assert
      expect(payable).toBeDefined();
      expect(payable.id).toBe(id);
    });
  });

  describe('delete', () => {
    it('should delete a payable with the specified id', async () => {
      // Arrange
      const id = '1';

      // Act
      const deletedPayable = await service.delete(id);

      // Assert
      expect(deletedPayable).toBeDefined();
      expect(deletedPayable.id).toBe(id);
    });
  });

  describe('getTotalPayables', () => {
    it('should return the total paid, total fees, and future income', async () => {
      // Arrange
      const merchantId = 1;
      const startDate = '2022-01-01';
      const endDate = '2022-01-31';

      // Act
      const totalPayables = await service.getTotalPayables(
        merchantId,
        startDate,
        endDate,
      );

      // Assert
      expect(totalPayables).toBeDefined();
      expect(totalPayables.totalPaid).toBeDefined();
      expect(totalPayables.totalFees).toBeDefined();
      expect(totalPayables.futureIncome).toBeDefined();
    });
  });
});
