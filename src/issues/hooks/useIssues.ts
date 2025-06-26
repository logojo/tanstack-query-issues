import { useEffect, useState } from "react";
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

  const [page, setPage] = useState(1)

  //* cuando el queryKey varia mucho y tiene muchos parametros en la peticion y el orden de los parametros NO importa
  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels, page }], 
    queryFn: () => getIssues( state, labels, page ),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    setPage(1)
  },[state])

  useEffect(() => {
    setPage(1)
  },[labels])

  const nextPage = () => {
    if( issuesQuery.data?.length === 0 ) return;

     setPage( prev => prev + 1 );
  }

  const prevPage = () => {
    if( page === 1 ) return;

    setPage( prev => prev - 1 );
  }
  
  return {
    page, 

    issuesQuery,
    nextPage,
    prevPage
  }
}
