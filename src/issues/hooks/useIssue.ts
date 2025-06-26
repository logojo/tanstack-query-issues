import { useQuery } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";


export const useIssue = ( issueNumber: number ) => {
  const issueQuery = useQuery({
    queryKey: ['issues', issueNumber],
    queryFn: () => getIssue( issueNumber ),
    staleTime: 1000 * 60,
  });


  //* esto es en paralelo es decir que se ejecuta sin depender del valor de otro
  // const commentsQuery = useQuery({
  //   queryKey: ['issues', issueNumber, 'comments'],
  //   queryFn: () => getIssueComments( issueNumber ),
  //   staleTime: 1000 * 60,
  // });

  //* esta es secuencial es decir que se ejecuta una vez que se a resuelto la primera peticion ya que dependen del valor de otro
  const commentsQuery = useQuery({
    queryKey: ['issues', issueQuery.data?.number, 'comments'],
    queryFn: () => getIssueComments(  issueQuery.data!.number  ),
    staleTime: 1000 * 60,
    enabled: issueQuery.data !== undefined //con enable se habilita para que se ejecuta una vez que la primera peticion se resuelve
  });
  
  return {
    issueQuery,
    commentsQuery
  }
}
