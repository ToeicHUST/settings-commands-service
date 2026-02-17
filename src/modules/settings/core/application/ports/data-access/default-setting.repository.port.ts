import { DefaultSetting } from '../../../domain/entities/default-setting';

export abstract class DefaultSettingRepositoryPort {
  abstract save(entity: DefaultSetting): Promise<DefaultSetting>;
  abstract getOneByKey(key: string): Promise<DefaultSetting | null>;
}
