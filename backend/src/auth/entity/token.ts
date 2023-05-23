import { DateTime } from 'luxon';
import ms from 'ms';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.js';
import { getRandomToken } from '../utils.js';
import { config } from '../../config/index.js';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Index()
  @Column()
  accessToken: string;

  @Column()
  accessTokenExpiresIn: Date;

  @Index()
  @Column()
  refreshToken: string;

  @Column()
  refreshTokenExpiresIn: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  get userId() {
    return this.user.id;
  }

  async updateToken(): Promise<void> {
    const dateTimeNow = DateTime.utc();
    const lifeTimeAccessToken = ms(config.APP_ACCESS_TOKEN_EXPIRES_IN);
    const lifeTimeRefreshToken = ms(config.APP_REFRESH_TOKEN_EXPIRES_IN);

    this.accessToken = await getRandomToken();
    this.accessTokenExpiresIn = dateTimeNow
      .plus({
        milliseconds: lifeTimeAccessToken,
      })
      .toJSDate();

    this.refreshToken = await getRandomToken();
    this.refreshTokenExpiresIn = dateTimeNow
      .plus({
        milliseconds: lifeTimeRefreshToken,
      })
      .toJSDate();
  }

  #validateToken(tokenExpiresIn: Date): boolean {
    const nowUtc = DateTime.utc();
    const tokenUtc = DateTime.fromJSDate(tokenExpiresIn, { zone: 'utc' });
    return nowUtc <= tokenUtc;
  }

  isValidAccessToken(): boolean {
    return this.#validateToken(this.accessTokenExpiresIn);
  }

  isValidRefreshToken(): boolean {
    return this.#validateToken(this.refreshTokenExpiresIn);
  }
}
