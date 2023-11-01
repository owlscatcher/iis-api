import { Controller, Get, Param } from '@nestjs/common';
import { DataRawService } from './data-raw.service';
import { sortBy } from 'lodash';
import DateTimeConverter from 'src/helpers/dateTimeConverter';

@Controller('data-raw')
export class DataRawController {
  constructor(private readonly dataRawService: DataRawService) {}

  @Get('/daily/:archive_itemid')
  async findAllDaily(@Param('archive_itemid') archive_itemid: number) {
    const dataRaw = await this.dataRawService.findAllDaily(+archive_itemid);

    const dtc = new DateTimeConverter();
    const serializedData = dataRaw.map((data) => ({
      layer: Number(data.layer),
      archive_itemid: Number(data.archive_itemid),
      source_time:
        Number(data.source_time) > 0
          ? dtc.GetDateTime(Number(data.source_time))
          : 0,
      server_time:
        Number(data.server_time) > 0
          ? dtc.GetDateTime(Number(data.server_time))
          : 0,
      status_code: Number(data.status_code),
      value: Number(data.value).toFixed(2),
      s_value: String(data.s_value),
    }));

    return sortBy(serializedData, ['source_time']);
  }
}
