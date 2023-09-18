import { PrismaClient, Barber} from '@prisma/client';

class BarbersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createBarber(nome: string, telefone: string, email: string): Promise<Barber> {
    if (!nome || !telefone || !email) {
      throw new Error('Nome, telefone e email são obrigatórios.');
    }
  
    const barber = await this.prisma.barber.create({
      data: {
        nome,
        telefone,
        email,
      },
    });
  
    return barber;
  }

  async updateBarber(id: string, nome: string, telefone: string, email: string): Promise<Barber | null> {
    const updatedBarber = await this.prisma.barber.update({
      where: { id },
      data: {
        nome: nome,
        telefone,
        email
      },
    });

    return updatedBarber;
  }

  async deleteBarber(id: string): Promise<void> {
    await this.prisma.barber.delete({
      where: { id },
    });
  }
}

export default BarbersService;
