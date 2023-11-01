import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { sortBy } from 'lodash';
import DateTimeConverter from 'src/helpers/dateTimeConverter';

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
      name: item.name.substr(item.name.lastIndexOf(".") + 1),
      first_time: dtc.GetDateTime(Number(item.first_time)),
      last_time: dtc.GetDateTime(Number(item.last_time)),
      count: Number(item.count),
      type: item.type,
    }));
    return sortBy(serializedItems, ['id']);
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
      name: item.name.substr(item.name.lastIndexOf(".") + 1),
      first_time: dtc.GetDateTime(Number(item.first_time)),
      last_time: dtc.GetDateTime(Number(item.last_time)),
      count: Number(item.count),
      type: item.type,
    };
    return sortBy(serializedItems, ['id']);
  }
}
