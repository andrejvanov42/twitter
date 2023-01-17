import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: id });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async removeUser(id: number): Promise<string> {
    await this.userRepository.delete({ id: id });
    return `user with id: ${id} has been deleted`;
  }

  async updateUser(userDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update({ id: userDto.id }, { ...userDto });
    return this.getOneUser(userDto.id);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
