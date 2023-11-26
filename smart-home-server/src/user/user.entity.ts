import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  emailChangeCode: number;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ nullable: true })
  registrationCode: number;

  @Column({ nullable: true })
  googleId: string;

  @Column()
  passwordExist: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
