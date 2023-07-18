import { PrismaClient } from '@prisma/client';


interface NewScheduleRequest{
  user_id: string;
  haircut_id: string;
  customer: string;
  date: Date; 

}

class NewScheduleService{
  private prisma: PrismaClient;
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute({ user_id, haircut_id, customer, date  }: NewScheduleRequest){

    if(customer === '' || haircut_id === ''){
      throw new Error("Não foi possivel agendar o serviço.")
    }

    const schedule = await this.prisma.service.create({
      data: {
        customer,
        date,
        haircut: { connect: { id: haircut_id } },
        user: { connect: { id: user_id } },
      },
    });

    return schedule;

  }
}

export { NewScheduleService }