import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateDefaultSettingRequestDto {
  @ApiProperty({
    example: 'MAX_LOGIN_ATTEMPTS',
    description: 'Setting key (uppercase letters and underscores only)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Key cannot be empty' })
  @Matches(/^[A-Z_]+$/, {
    message: 'Key must contain only uppercase letters and underscores',
  })
  key: string;

  @ApiProperty({
    example: '5',
    description: 'Setting value',
  })
  @IsString()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  value: string;

  @ApiProperty({
    example: 'number',
    description: 'Setting type',
  })
  @IsString()
  @IsNotEmpty({ message: 'Type cannot be empty' })
  type: string;

  @ApiProperty({
    example: 'Maximum number of login attempts before lockout',
    description: 'Setting description',
  })
  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;
}
