import { AggregateRoot, SettingKey } from '@toeichust/common';

export class UserSetting extends AggregateRoot<string> {
  private _userId: string;

  private _key: SettingKey;
  private _value: string;

  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: {
    id: string;

    userId: string;

    key: SettingKey;
    value: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(props.id);

    this._userId = props.userId;

    this._key = props.key;
    this._value = props.value;

    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public get userId(): string {
    return this._userId;
  }

  public get key(): string {
    return this._key.value;
  }

  public get value(): string {
    return this._value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateValue(value: string): void {
    if (this._value !== value) {
      this._value = value;
      this._updatedAt = new Date();
    }
  }
}
