import {Request, Response} from 'express' 
import prismaClient from '../../prisma';
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
  async handle(request: Request, response: Response){
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService(prismaClient);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);

  }
}

export { CreateUserController }