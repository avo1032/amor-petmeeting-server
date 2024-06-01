import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SubImage } from './subimage.entity';
import { User } from 'src/user/entities/user.entity';
import { createUUIDv4 } from 'src/common/utils/create.uuid';

export enum AnimalType {
  DOG = 'DOG',
  CAT = 'CAT',
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

@Entity('free_adoption_posts')
export class FreeAdoptionPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  userId: number;

  @Column()
  region: string;

  @Column()
  detailedRegion: string;

  @Column({ type: 'enum', enum: AnimalType })
  animalType: AnimalType;

  @Column()
  breed: string;

  @Column({ type: 'enum', enum: Sex })
  sex: Sex;

  @Column()
  ageInMonths: number;

  @Column()
  description: string;

  @Column()
  mainImage: string;

  @Column({ default: true })
  visible: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => SubImage, (subImage) => subImage.freeAdoptionPost)
  subImages: SubImage[];

  @ManyToOne(() => User, (user) => user.freeAdoptionPosts)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
