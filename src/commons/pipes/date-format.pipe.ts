import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class DateFormatPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const date = new Date(value);
    return date.toLocaleDateString('es-ES');
  }
}
