import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs'

interface UserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  private prisma: PrismaClient;
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute({ name, email, password }: UserRequest ){
    
    if(!email){
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await this.prisma.user.findFirst({
      where:{
        email: email
      }
    })

    if(userAlreadyExists){
      throw new Error("User/Email already exists");
    }

    const passwordHash = await hash(password, 8)

    const user = await this.prisma.user.create({
      data:{
        name: name,
        email: email,
        password: passwordHash
      },
      select:{
        id: true,
        name:true,
        email: true,
      }
    })

    return user;

  }
}

export { CreateUserService }