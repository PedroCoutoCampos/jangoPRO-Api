import {Request, Response } from 'express'
import prismaClient from '../../prisma';
import { NewScheduleService } from '../../services/schedule/NewScheduleService'


class NewScheduleController{
  async handle(request: Request, response: Response){
    const { haircut_id, customer, date, time } = request.body;
    const user_id = request.user_id;
    const [hours, minutes] = time.split(":").map(Number);
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, minutes, 0, 0);


    const newSchedule = new NewScheduleService(prismaClient);

    const schedule = await newSchedule.execute({
      user_id,
      haircut_id,
      customer,
      date: selectedDate,

    })

    return response.json(schedule);


  }
}

export { NewScheduleController }