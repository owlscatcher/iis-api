import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.items.findMany({
      include: {
        data_raw: {
          select: {
            value: true,
            source_time: true,
          },

          take: -1,
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.items.findUnique({ where: { id: +id } });
  }
}
