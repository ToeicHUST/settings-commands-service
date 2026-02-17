import { BaseResponseDto } from '@toeichust/common';

export interface DataUpdateUserSettingResponseDto {
  id: string;
  userId: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateUserSettingResponseDto extends BaseResponseDto<DataUpdateUserSettingResponseDto> {}
