import { PrismaClient } from '@prisma/client';

interface FinishRequest{
    schedule_id: string;
    user_id:string;
}


class FinishScheduleService {
    private prisma: PrismaClient;
  
    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async execute({ schedule_id, user_id}: FinishRequest) {
        if(schedule_id === '' || user_id === ''){
            throw new Error('Erro')
        }

        try{

            const belongsToUser = await this.prisma.service.findFirst({
                where:{
                    id: schedule_id,
                    user_id: user_id
                }
            })

            if(!belongsToUser){
                throw new Error('Não esta autorizado')
            }

            await this.prisma.service.delete({
                where:{
                    id: schedule_id
                }
            })

            return{ message: "Finalizado com sucesso"}

        }catch(err){
            console.log(err);
            throw new Error    
        }
    }
}

export { FinishScheduleService }