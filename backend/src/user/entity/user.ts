import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { UserRole } from '../constants.js';
import { UserSchema } from '../schemas.js';

const SALT_OR_ROUNDS = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ length: UserSchema.shape.username.maxLength! })
  username: string;

  @Column({ unique: true, length: UserSchema.shape.login.maxLength! })
  login: string;

  @Column()
  email: string;

  @Column({ length: UserSchema.shape.password.maxLength!, select: false })
  password: string;

  @Column()
  hash: string;

  @Column({ default: true })
  activated: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async convertPasswordToHash(): Promise<void> {
    if (this.password) {
      this.hash = await bcrypt.hash(this.password, SALT_OR_ROUNDS);
      this.password = '';
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.hash);
    return isMatch;
  }

  isAllowAuth(): boolean {
    return this.deletedAt === null && this.activated;
  }
}
