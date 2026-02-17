import { BaseResponseDto } from '@toeichust/common';

export interface DataUpdateDefaultSettingResponseDto {
  id: string;
  key: string;
  value: string;
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateDefaultSettingResponseDto extends BaseResponseDto<DataUpdateDefaultSettingResponseDto> {}
