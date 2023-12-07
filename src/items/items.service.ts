import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any> {
    const items = await this.prisma.items.findMany({ orderBy: { id: 'asc' } });

    const ItemsWithJoin = await Promise.all(
      items.map(async (item) => {
        const data_raw = await this.prisma.data_raw.findFirst({
          where: {
            archive_itemid: item.id,
            source_time: item.last_time,
          },
        });

        return {
          ...item,
          data_raw,
        };
      }),
    );

    return ItemsWithJoin;
  }

  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.items.findUnique({ where: { id: +id } });
  }
}
