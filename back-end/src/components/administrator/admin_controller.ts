import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { IAddAdmin, IAddAdminValidator } from "./dto/IAddAdmin";
import { IEditAdmin, IEditAdminValidator } from "./dto/IEditAdmin";
export default class AdminController extends BaseController {
  public async getAll(req: Request, res: Response) {
    res.send(await this.services.adminService.getAll());
  }

  public async getById(req: Request, res: Response) {
    const id = +req.params.id;

    if (id <= 0) {
      return res.status(400);
    }
    const item = await this.services.adminService.getById(id);
    if (item === null) {
      res.sendStatus(404);
      return;
    }
    res.send(item);
  }

  public async add(req: Request, res: Response) {
    const data = req.body;

    if (!IAddAdminValidator(data)) {
      res.status(404).send(IAddAdminValidator.errors);
      return;
      IAddAdminValidator;
    }
    const result = await this.services.adminService.add(data as IAddAdmin);
    res.send(result);
  }

  async edit(req: Request, res: Response) {
    let id: string = req.params.id;
    let adminId: number = +id;
    const data = req.body;

    if (adminId <= 0) {
      res.sendStatus(400);
    }

    if (!IEditAdminValidator(data)) {
      res.status(404).send(IEditAdminValidator.errors);
      return;
    }
    const result = await this.services.adminService.edit(
      adminId,
      data as IEditAdmin
    );
    if (result === null) {
      res.sendStatus(404);
      return;
    }

    res.send(result);
  }
}
