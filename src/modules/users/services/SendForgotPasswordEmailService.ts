import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}
class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findBEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    console.log('user', user);

    const token = await userTokensRepository.generate(user.id);

    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
