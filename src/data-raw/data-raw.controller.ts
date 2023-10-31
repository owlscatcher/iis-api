import { Controller, Get, Param } from '@nestjs/common';
import { DataRawService } from './data-raw.service';

@Controller('data-raw')
export class DataRawController {
  constructor(private readonly dataRawService: DataRawService) {}

  @Get(':archive_itemid')
  async findAll(@Param('archive_itemid') archive_itemid: number) {
    const dataRaw = await this.dataRawService.findAll(+archive_itemid);
    const serializedData = dataRaw.map((data) => ({
      layer: Number(data.layer),
      archive_itemid: Number(data.archive_itemid),
      source_time: Number(data.source_time),
      server_time: Number(data.server_time),
      status_code: Number(data.status_code),
      value: Number(data.value),
      s_value: String(data.s_value),
    }));

    return serializedData;
  }
}
