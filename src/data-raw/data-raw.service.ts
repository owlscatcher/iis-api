import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import DateTimeConverter from 'src/helpers/dateTimeConverter';

@Injectable()
export class DataRawService {
  constructor(private prisma: PrismaService) {}

  findAllDaily(@Param('archive_itemid', ParseIntPipe) archive_itemid: number) {
    const dtc = new DateTimeConverter();
    return this.prisma.data_raw.findMany({
      where: {
        archive_itemid: archive_itemid,
        source_time: {
          gte: dtc.GetFileTime(new Date()) - Number(dtc.FILE_TIME_DAY),
          lte: dtc.GetFileTime(new Date()),
        },
        layer: 2,
      },
      orderBy: {
        source_time: 'asc',
      },
    });
  }

  findAllDailyFromLayer(@Param('layer', ParseIntPipe) layer: number) {
    const dtc = new DateTimeConverter();
    return this.prisma.data_raw.findMany({
      where: {
        layer: layer,
        source_time: {
          gte: dtc.GetFileTime(new Date()) - Number(dtc.FILE_TIME_DAY),
          lte: dtc.GetFileTime(new Date()),
        },
      },
      include: {
        item: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          archive_itemid: 'asc',
        },
        {
          source_time: 'asc',
        },
      ],
    });
  }
}
