import IApplicationResources from "./IApplicationResources.interface";
import IServices from "./IServices.interface";
export default abstract class BaseController {
  constructor(private resources: IApplicationResources) {}

  protected get services(): IServices {
    return this.resources.services;
  }
}
