import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs'; // ✔ Importar como un módulo completo

@Injectable()
export class DateService {
  parseRelativeTime(relativeTime: string): string {
    const now = dayjs();
    const parts = relativeTime.split(' ');
    const value = parseInt(parts[1]);
    const unit = parts[2]; // "hora", "día", "mes"

    let result = now;

    if (unit.includes('hora')) {
      result = now.subtract(value, 'hour');
    } else if (unit.includes('día')) {
      result = now.subtract(value, 'day');
    } else if (unit.includes('mes')) {
      result = now.subtract(value, 'month');
    }

    return result.format('YYYY-MM-DD HH:mm:ss');
  }
}
