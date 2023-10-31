import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataRawService {
  constructor(private prisma: PrismaService) {}

  findAll(@Param('archive_itemid', ParseIntPipe) archive_itemid: number) {
    return this.prisma.data_raw.findMany({
      where: { archive_itemid: archive_itemid },
    });
  }
}
