import { Repository } from 'typeorm';
import { AuthExcept } from '../model/authexcept.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthExceptRequest } from '../api-doc/request/authexcept.request';

export class AuthExceptService {
  constructor(
    @InjectRepository(AuthExcept)
    private authExceptRepo: Repository<AuthExcept>, //Generic
  ) {}

  public async getAll(): Promise<AuthExcept[]> {
    return this.authExceptRepo.find({
      where: { usuarioCriacao: process.env.DB_USER },
    });
  }

  async show(id: string): Promise<AuthExcept> {
    return this.authExceptRepo.findOneOrFail(id);
  }

  async store(body: AuthExceptRequest): Promise<AuthExcept> {
    const authexcept = this.authExceptRepo.create(body);
    return this.authExceptRepo.save(authexcept);
  }

  async update(id: string, body: AuthExceptRequest): Promise<AuthExcept> {
    await this.authExceptRepo.findOneOrFail(id);
    this.authExceptRepo.update(id, body);
    return this.authExceptRepo.findOneOrFail(id);
  }

  async destroy(id: string): Promise<void> {
    await this.authExceptRepo.findOneOrFail(id);
    this.authExceptRepo.delete(id);
  }
}
