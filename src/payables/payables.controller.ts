import { Controller, Get, Param, Delete } from '@nestjs/common';
import { PayablesService } from './payables.service';

@Controller('payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) { }

  @Get('total/:merchantId/:startDate/:endDate')
  getTotalPayables(
    @Param('merchantId') merchantId: number,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.payablesService.getTotalPayables(
      merchantId,
      startDate,
      endDate,
    );
  }

  @Get()
  findAll() {
    return this.payablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payablesService.delete(id);
  }
}
