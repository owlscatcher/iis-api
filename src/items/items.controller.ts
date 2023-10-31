import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();
    const serializedItems = items.map((item) => ({
      id: Number(item.id),
      project_id: Number(item.project_id),
      itemid: Number(item.itemid),
      path: item.path,
      name: item.name,
      first_time: Number(item.first_time),
      last_time: Number(item.last_time),
      count: Number(item.count),
      type: item.type,
    }));
    return serializedItems;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const item = await this.itemsService.findOne(+id);
    const serializedItems = {
      id: Number(item.id),
      project_id: Number(item.project_id),
      itemid: Number(item.itemid),
      path: item.path,
      name: item.name,
      first_time: Number(item.first_time),
      last_time: Number(item.last_time),
      count: Number(item.count),
      type: item.type,
    };
    return serializedItems;
  }
}
