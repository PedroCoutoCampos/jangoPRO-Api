import { PrismaClient, Barber, Haircut } from '@prisma/client';

interface CreateBarberDTO {
  name: string;
  haircuts: Haircut[]; // Lista de objetos de corte
}

interface UpdateBarberDTO {
  id: string;
  name: string;
  haircuts: Haircut[]; // Lista de objetos de corte
}

class BarbersService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({ name, haircuts }: CreateBarberDTO) {
    const barber = await this.prisma.barber.create({
      data: {
        name,
        haircuts: {
          connect: haircuts.map(haircut => ({ id: haircut.id })),
        },
      },
    });

    return barber;
  }

  async update({ id, name, haircuts }: UpdateBarberDTO) {
    const updatedBarber = await this.prisma.barber.update({
      where: { id },
      data: {
        name,
        haircuts: {
          set: haircuts.map(haircut => ({ id: haircut.id })),
        },
      },
    });

    return updatedBarber;
  }

  async delete(id: string) {
    await this.prisma.barber.delete({
      where: { id },
    });
  }
}

export default BarbersService;
