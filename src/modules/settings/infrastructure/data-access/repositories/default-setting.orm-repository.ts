import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultSettingRepositoryPort } from '../../../core/application/ports/data-access/default-setting.repository.port';
import { DefaultSetting } from '../../../core/domain/entities/default-setting';
import { DefaultSettingAdapter } from '../adapters/default-setting.adapter';
import { DefaultSettingEntity } from '../entities/default-setting.entity';

@Injectable()
export class DefaultSettingOrmRepository implements DefaultSettingRepositoryPort {
  constructor(
    @InjectRepository(DefaultSettingEntity)
    private readonly repository: Repository<DefaultSettingEntity>,
  ) {}

  async save(entity: DefaultSetting): Promise<DefaultSetting> {
    const ormEntity = DefaultSettingAdapter.toPersistence(entity);
    const saved = await this.repository.save(ormEntity);
    return DefaultSettingAdapter.toDomain(saved);
  }

  async getOneByKey(key: string): Promise<DefaultSetting | null> {
    const ormEntity = await this.repository.findOneBy({ key });
    if (!ormEntity) return null;
    return DefaultSettingAdapter.toDomain(ormEntity);
  }
}
