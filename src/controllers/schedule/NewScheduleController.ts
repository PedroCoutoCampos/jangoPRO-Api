import { Request, Response } from 'express';
import prismaClient from '../../prisma';
import { NewScheduleService } from '../../services/schedule/NewScheduleService';

class NewScheduleController {
  async handle(request: Request, response: Response) {
    const { haircut_id, barber_id, customer, date, time } = request.body;
    const user_id = request.user_id;
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, minutes, 0, 0);

    // Consulte os agendamentos existentes para o mesmo barbeiro e horário
    const existingSchedule = await prismaClient.service.findFirst({
      where: {
        barber_id,
        date: selectedDate,
      },
    });

    if (existingSchedule) {
      return response.status(400).json({ error: 'Horário não está disponível.' });
    }

    const newSchedule = new NewScheduleService(prismaClient);

    const schedule = await newSchedule.execute({
      user_id,
      haircut_id,
      barber_id,
      customer,
      date: selectedDate,
    });

    return response.json(schedule);
  }
}


export { NewScheduleController };
