import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions";


export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, //* 1 hora en el que este query esta vigente
    
    // placeholderData: [ //* información que se carga mientras se resuelve la peticion
    //   {  
    //     "id":791921801,
    //     "node_id":"MDU6TGFiZWw3OTE5MjE4MDE=",
    //     "url":"https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //     "name":"❤️",
    //     "color":"ffffff",
    //     "default":false,
    //     "description":null
    //   } satisfies Issue, // para tipar pero no es tan necesario 
    //   {"id":710332294,
    //     "node_id":"MDU6TGFiZWw3MTAzMzIyOTQ=",
    //     "url":"https://api.github.com/repos/facebook/react/labels/Component:%20Server%20Rendering",
    //     "name":"Component: Server Rendering",
    //     "color":"d4c5f9",
    //     "default":false,
    //     "description":null
    //   }
    // ]

    // initialData: [ //* información inicial que se mantendra vigente por el tiempo en el staleTime
    //   {  
    //     "id":791921801,
    //     "node_id":"MDU6TGFiZWw3OTE5MjE4MDE=",
    //     "url":"https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //     "name":"❤️",
    //     "color":"ffffff",
    //     "default":false,
    //     "description":null
    //   } satisfies Issue, // para tipar pero no es tan necesario 
    //   {"id":710332294,
    //     "node_id":"MDU6TGFiZWw3MTAzMzIyOTQ=",
    //     "url":"https://api.github.com/repos/facebook/react/labels/Component:%20Server%20Rendering",
    //     "name":"Component: Server Rendering",
    //     "color":"d4c5f9",
    //     "default":false,
    //     "description":null
    //   }
    
    // ]
  });

  return {
    labelsQuery
  }
}
