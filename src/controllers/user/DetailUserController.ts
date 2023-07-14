import { Request, Response } from "express";
import { UserDetailService } from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id;

    const userDetailService = new UserDetailService();

    const detailUser = await userDetailService.execute(user_id);

    return response.json(detailUser);
  }
  async useres(request: Request, response: Response) {
    try {
      const userDetailService = new UserDetailService();
      const users = await userDetailService.useres();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export { DetailUserController };
