import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import BaseService from "../../services/BaseService";
import AdminModel from "./admin_model";
import { IAddAdmin } from "./dto/IAddAdmin";
import IErrorResponse from "../../common/IErrorResponse.interface";
import * as bcrypt from "bcrypt";
import { IEditAdmin } from "./dto/IEditAdmin";
class AdminModelAdapterOptions implements IModelAdapterOptions {}

class AdminService extends BaseService<AdminModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IModelAdapterOptions>
  ): Promise<AdminModel> {
    const item: AdminModel = new AdminModel();

    item.adminiId = +data?.administrator_id;
    item.username = data?.username;
    item.passwordHash = data?.password_hash;
    item.isActive = +data?.is_active === 1;

    return item;
  }

  public async getAll(): Promise<AdminModel[]> {
    return (await this.getAllFromTable("administrator", {})) as AdminModel[];
  }

  public async getById(adminId: number): Promise<AdminModel> | null {
    return (await this.getIdFromTable(
      "administrator",
      adminId,
      {}
    )) as AdminModel | null;
  }

  public async add(data: IAddAdmin): Promise<AdminModel | IErrorResponse> {
    return new Promise<AdminModel | IErrorResponse>(async (resolve) => {
      const passwordHash = bcrypt.hashSync(data.password, 11);

      this.db
        .execute(
          "INSERT administrator SET username = ?, password_hash = ?, is_active = 1 ",
          [data.username, passwordHash]
        )
        .then(async (res) => {
          const newAdminId: number = +(res[0] as any)?.insertId;
          resolve(await this.getById(newAdminId));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }
  public async edit(
    adminId: number,
    data: IEditAdmin
  ): Promise<AdminModel | IErrorResponse | null> {
    const result = await this.getById(adminId);

    if (result === null) {
      return null;
    }
    const passwordHash = bcrypt.hashSync(data.password, 11);

    return new Promise<AdminModel | IErrorResponse>(async (resolve) => {
      const sql =
        "UPDATE administrator SET password_hash = ?, is_active = ? WHERE administrator_id = ?";
      this.db
        .execute(sql, [passwordHash, data.isActive ? 1 : 0, adminId])
        .then(async (result) => {
          resolve(await this.getById(adminId));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }

  public async getByUsername(username: string): Promise<AdminModel> | null {
    const admins = await this.getAllByFieldNameFromTable(
      "administrator",
      "username",
      username,
      {}
    );

    if (!Array.isArray(admins) || admins.length === 0) {
      return null;
    }

    return admins[0];
  }
}

export default AdminService;
