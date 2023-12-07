import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import DateTimeConverter from 'src/helpers/dateTimeConverter';
import TrimName from 'src/helpers/trimName';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();

    const dtc = new DateTimeConverter();
    const serializedItems = items.map((item) => ({
      id: Number(item.id),
      project_id: Number(item.project_id),
      itemid: Number(item.itemid),
      path: item.path,
      name: TrimName(item.name),
      first_time: dtc
        .GetDateTime(Number(item.first_time))
        .toLocaleString('en-GB'),
      last_time: dtc
        .GetDateTime(Number(item.last_time))
        .toLocaleString('en-GB'),
      count: Number(item.count),
      type: item.type,
      data_raw: {
        source_time: dtc
          .GetDateTime(Number(item.data_raw.source_time))
          .toLocaleString('en-GB'),
        value: Number(item.data_raw.value),
      },
    }));
    return serializedItems;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const item = await this.itemsService.findOne(+id);

    const dtc = new DateTimeConverter();
    const serializedItems = {
      id: Number(item.id),
      project_id: Number(item.project_id),
      itemid: Number(item.itemid),
      path: item.path,
      name: TrimName(item.name),
      first_time: dtc.GetDateTime(Number(item.first_time)),
      last_time: dtc.GetDateTime(Number(item.last_time)),
      count: Number(item.count),
      type: item.type,
    };
    return serializedItems;
  }
}
