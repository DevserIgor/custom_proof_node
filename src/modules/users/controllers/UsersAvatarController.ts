import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();
    const avatarfilename = request.file?.filename;

    if (!avatarfilename) {
      throw new AppError('File not sended.');
    }
    console.log(avatarfilename);
    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: avatarfilename,
    });

    return response.json(instanceToInstance(user));
  }
}
