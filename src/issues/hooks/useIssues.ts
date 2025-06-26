import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces/issues.interface";

interface Props {
  state: State;
  labels: string[];
}
export const useIssues = ({ state, labels } : Props) => {
  //* cuando el queryKey no varia mucho o no tiene varios parametros o el orden de los parametros importa
  // const issuesQuery = useQuery({
  //   queryKey: ['issues', state ], 
  //   queryFn: () => getIssues( state ),
  //   staleTime: 1000 * 60,
  // });

  //* cuando el queryKey varia mucho y tiene muchos parametros en la peticion y el orden de los parametros NO importa
  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels }], 
    queryFn: () => getIssues( state, labels ),
    staleTime: 1000 * 60,
  });
  
  return {issuesQuery}
}
