import { Request, Response } from 'express';
import prismaClient from '../../prisma';

class BarbersController {
  async create(req: Request, res: Response) {
    try {
      const { name, haircuts } = req.body;
  
      const createdBarber = await prismaClient.barber.create({
        data: {
          name,
          haircuts: {
            create: haircuts.map(haircutName => ({
              name: haircutName,
            })),
          },
        },
        include: {
          haircuts: true,
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
      const barbers = await prismaClient.barber.findMany({
        include: {
          haircuts: true,
        },
      });
  
      return res.json(barbers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, haircuts } = req.body;
  
      const updatedBarber = await prismaClient.barber.update({
        where: { id },
        data: {
          name,
          haircuts: {
            connectOrCreate: haircuts.map(haircutName => ({
              where: { name: haircutName },
              create: { name: haircutName },
            })),
          },
        },
        include: {
          haircuts: true,
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
  
      await prismaClient.barber.delete({
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
