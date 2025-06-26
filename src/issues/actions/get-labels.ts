import { gitHubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { Label } from "../interfaces/issues.interface";

export const getLabels = async() : Promise<Label[]> => {
  await sleep(1500)
  const { data } = await gitHubApi.get<Label[]>('/labels');
  return data;
}