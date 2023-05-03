import prismaClient from "../../prisma";

interface ListScheduleRequest{  // oque precisa ser fornecido 
  user_id: string;
}

class ListScheduleService{
  async execute({ user_id }: ListScheduleRequest){

    const schedule = await prismaClient.service.findMany({  //Busca muitos
      where:{
        user_id: user_id
      },
      select:{
        id: true,
        customer: true,
        haircut: true,
      }
    })

    return schedule;

  }
}

export { ListScheduleService }