import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class BarbersController {
  async create(req, res) {
    try {
      const { nome, telefone, email } = req.body;
  
      if (!nome || !telefone || !email) {
        return res.status(400).json({ message: 'Nome, telefone e email são obrigatórios.' });
      }
    
      const createdBarber = await prisma.barber.create({
        data: {
          nome,
          telefone,
          email,
        },
       
      });
  
      return res.json(createdBarber);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  
  async list(req: Request, res: Response) {
    try {
      const barbers = await prisma.barber.findMany();
  
      return res.json(barbers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, telefone, email } = req.body;
  
      const updatedBarber = await prisma.barber.update({
        where: { id },
        data: {
          nome,
          telefone,
          email
        },
      });
  
      return res.json(updatedBarber);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
  
      await prisma.barber.delete({
        where: { id },
      });
  
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export { BarbersController };
