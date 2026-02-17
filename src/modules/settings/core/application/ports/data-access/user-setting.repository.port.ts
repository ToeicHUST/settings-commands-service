import { UserSetting } from '../../../domain/entities/user-setting';

export abstract class UserSettingRepositoryPort {
  abstract save(entity: UserSetting): Promise<UserSetting>;
  abstract getOneByUserIdAndKey(
    userId: string,
    key: string,
  ): Promise<UserSetting | null>;
}
