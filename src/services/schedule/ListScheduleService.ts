import { PrismaClient } from '@prisma/client';

interface ListScheduleRequest{  // oque precisa ser fornecido 
  user_id: string;
}

class ListScheduleService{
  private prisma: PrismaClient;
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute({ user_id }: ListScheduleRequest){

    const schedule = await this.prisma.service.findMany({  //Busca muitos
      where:{
        user_id: user_id
      },
      select:{
        id: true,
        customer: true,
        haircut: true,
        date: true, 
      }
    })

    return schedule;

  }
}

export { ListScheduleService }