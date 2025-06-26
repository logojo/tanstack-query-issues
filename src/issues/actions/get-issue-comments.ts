import { gitHubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { Issue } from "../interfaces/issues.interface";

export const getIssueComments = async( issueNumber : number ) : Promise<Issue[]> => {
  await sleep(1500)
  const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);  
  return data;
}