import { PartialType } from '@nestjs/swagger';
import { CreateDataRawDto } from './create-data-raw.dto';

export class UpdateDataRawDto extends PartialType(CreateDataRawDto) {}
