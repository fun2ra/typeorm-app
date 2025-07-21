import { Controller, Get } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  @Get()
  runReport() {
    return { message: 'Report generated successfully' };
  }
}
