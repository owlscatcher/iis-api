import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { DataRawModule } from './data-raw/data-raw.module';

@Module({
  imports: [PrismaModule, ItemsModule, DataRawModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
