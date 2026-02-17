import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_settings')
@Index(['userId', 'key'], { unique: true })
export class UserSettingEntity {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'text' })
  value: string;

  @CreateDateColumn({ type: 'timestamp', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 6 })
  updatedAt: Date;
}
