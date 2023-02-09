import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'apps' })
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @Column({ type: 'boolean' })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(app?: Partial<App>) {
    this.id = app?.id;
    this.name = app?.name;
    this.description = app?.description;
    this.url = app?.url;
    this.is_active = app?.is_active;
    this.createdAt = app?.createdAt;
    this.updatedAt = app?.updatedAt;
    this.deletedAt = app?.deletedAt;
  }
}
