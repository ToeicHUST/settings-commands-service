import { AggregateRoot, SettingKey } from '@toeichust/common';

export class DefaultSetting extends AggregateRoot<string> {
  private _key: SettingKey;
  private _value: string;
  private _type: string;
  private _description: string;

  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: {
    id: string;
    key: SettingKey;
    value: string;
    type: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(props.id);
    this._key = props.key;
    this._value = props.value;
    this._type = props.type;
    this._description = props.description;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public get key(): string {
    return this._key.value;
  }

  public get value(): string {
    return this._value;
  }

  public get type(): string {
    return this._type;
  }

  public get description(): string {
    return this._description;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateSetting(
    value?: string,
    type?: string,
    description?: string,
  ): void {
    let hasChanged = false;

    if (value !== undefined && this._value !== value) {
      this._value = value;
      hasChanged = true;
    }

    if (type !== undefined && this._type !== type) {
      this._type = type;
      hasChanged = true;
    }

    if (description !== undefined && this._description !== description) {
      this._description = description;
      hasChanged = true;
    }

    if (hasChanged) {
      this._updatedAt = new Date();
    }
  }
}
