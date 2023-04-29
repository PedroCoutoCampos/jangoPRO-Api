import prismaClient from "../../prisma";

interface HaircutRequest{
  user_id: string;
  name: string;
  price: number;
}


class CreateHaircutService{
  async execute({ user_id, name, price }: HaircutRequest){
    if(!name || !price){
      throw new Error("Erro ao incluir")
    }

    // Verifica quantos cortes o usuário tem
    const myHaircuts = await prismaClient.haircut.count({
      where:{
        user_id: user_id
      }
    })

    // Verifica se é Premium
    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id,
      },
      include:{
        subscriptions: true,
      }
    })

    //Limita a quantidade de cortes para não assinante
    if(myHaircuts >= 3 && user?.subscriptions?.status !== 'active'){
      throw new Error("Limite de cortes, assine o Premium para conseguir cortes ilimitados")
    }


    const haircut = await prismaClient.haircut.create({
      data:{
        name: name,
        price: price,
        user_id: user_id
      }
    })

 
    return haircut;


  }
}

export { CreateHaircutService }