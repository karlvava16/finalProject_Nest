import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // Метод для создания пользователя с заполнением необязательных полей
  async create(user: Partial<CreateUserDto>): Promise<User> {
    const defaultValues: Partial<User> = {
      phoneNumber: null, // Значение по умолчанию
      isVerified: false, // Пользователь не верифицирован по умолчанию
      createdAt: new Date(), // Текущая дата
      updatedAt: new Date(), // Текущая дата
    };

    const newUser = this.usersRepository.create({
      ...defaultValues,
      ...user, // Переданные данные пользователя перекрывают значения по умолчанию
    });

    return await this.usersRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Метод для отримання всіх користувачів
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    // Находим пользователя по ID
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null; // Если пользователь не найден, возвращаем null
    }

    // Обновляем только переданные поля
    const updatedUser = this.usersRepository.merge(user, updateUserDto);

    // Сохраняем изменения в базе данных
    return await this.usersRepository.save(updatedUser);
  }
}
