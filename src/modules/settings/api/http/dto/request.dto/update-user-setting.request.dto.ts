import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateUserSettingRequestDto {
  @ApiProperty({
    example: 'NOTIFICATIONS_ENABLED',
    description: 'Setting key (uppercase letters and underscores only)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Key cannot be empty' })
  @Matches(/^[A-Z_]+$/, {
    message: 'Key must contain only uppercase letters and underscores',
  })
  key: string;

  @ApiProperty({
    example: 'true',
    description: 'Setting value',
  })
  @IsString()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  value: string;
}
