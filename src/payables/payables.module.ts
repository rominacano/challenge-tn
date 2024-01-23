import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { CommonsModule } from 'src/commons/commons.module';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService],
  exports: [PayablesService],
  imports: [CommonsModule],
})
export class PayablesModule { }
