import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettingRepositoryPort } from '../../../core/application/ports/data-access/user-setting.repository.port';
import { UserSetting } from '../../../core/domain/entities/user-setting';
import { UserSettingAdapter } from '../adapters/user-setting.adapter';
import { UserSettingEntity } from '../entities/user-setting.entity';

@Injectable()
export class UserSettingOrmRepository implements UserSettingRepositoryPort {
  constructor(
    @InjectRepository(UserSettingEntity)
    private readonly repository: Repository<UserSettingEntity>,
  ) {}

  async save(entity: UserSetting): Promise<UserSetting> {
    const ormEntity = UserSettingAdapter.toPersistence(entity);
    const saved = await this.repository.save(ormEntity);
    return UserSettingAdapter.toDomain(saved);
  }

  async getOneByUserIdAndKey(
    userId: string,
    key: string,
  ): Promise<UserSetting | null> {
    const ormEntity = await this.repository.findOneBy({ userId, key });
    if (!ormEntity) return null;
    return UserSettingAdapter.toDomain(ormEntity);
  }
}
