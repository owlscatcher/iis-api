import { Module } from '@nestjs/common';
import { DataRawService } from './data-raw.service';
import { DataRawController } from './data-raw.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DataRawController],
  providers: [DataRawService],
  imports: [PrismaModule],
})
export class DataRawModule {}
