import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FreeAdoptionPost } from './free.adoptioin.entity';

@Entity('sub_images')
export class SubImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @ManyToOne(
    () => FreeAdoptionPost,
    (freeAdoptionPost) => freeAdoptionPost.subImages,
  )
  @JoinColumn({ name: 'free_adoption_post_id' })
  freeAdoptionPost: FreeAdoptionPost;
}
