import { gitHubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { Issue, State } from "../interfaces/issues.interface";

export const getIssues = async( state: State, labels: string[] ) : Promise<Issue[]> => {
  await sleep(1500)

  const params = new URLSearchParams();
  
  state !== State.All && params.append('state', state)
  labels.length > 0 && params.append('labels', labels.join(',') )

  params.append('per_page', '5')

  const { data } = await gitHubApi.get<Issue[]>('/issues', { params });
  return data;
}