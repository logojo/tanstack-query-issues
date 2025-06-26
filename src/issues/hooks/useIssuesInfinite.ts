import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces/issues.interface";

interface Props {
  state: State;
  labels: string[];
}
export const useIssuesInfinite = ({ state, labels } : Props) => {


  //para ir sumando las paginas a los resultados como un infinite scroll
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels }], 
    queryFn: ({ pageParam, queryKey}) => {

      const [,, args] = queryKey;
      const { state, labels } = args as Props;
      
      return  getIssues( state, labels, pageParam);
    },
    staleTime: 1000 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length + 1 : undefined
  });



  return {
    issuesQuery,
  }
}
