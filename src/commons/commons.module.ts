import { Module } from '@nestjs/common';
import { DateFormatPipe } from './pipes/date-format.pipe';

@Module({
  imports: [],
  controllers: [],
  providers: [DateFormatPipe],
  exports: [DateFormatPipe],
})
export class CommonsModule { }
