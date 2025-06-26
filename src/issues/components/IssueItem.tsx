import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Issue, State } from '../interfaces/issues.interface';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';
import { timeSince } from '../../helpers';


interface Props {
 issue : Issue
}

export const IssueItem = ({ issue } :Props) => {
  const navigate = useNavigate();

  //*me ayuda a tener acceso a todos los queryClients creados
  const queryClient = useQueryClient()

  //*funcion que se ejecuta al pasar el mouse por el item y precargardo la información
  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey:['issues', issue.number],
      queryFn:() =>  getIssue( issue.number ),
      staleTime: 1000 * 60 //manteniendo la peticion fresa por 1 minuto
    })

    queryClient.prefetchQuery({
      queryKey:['issues',  issue.number, 'comments'],
      queryFn:() =>  getIssueComments( issue.number ),
      staleTime: 1000 * 60 //manteniendo la peticion fresa por 1 minuto
    })
    
  }

  //* funcion que carga los datos de un issue por el id desde la peticion donde se consultaron todos los issues
  //* al consultar todos los issues al pasar el mouse por el issue le paso los datos al la query del issue individual
  //* sin realizar la petición
  const presetData = () => {
    queryClient.setQueryData(['issues', issue.number], issue, {
      updatedAt: Date.now() + (1000 * 60) // para manter vigente la informacion enviada y evitar otra peticion
    });
  }

  return (
    <div 
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      
      {
        (issue.state == State.Close)
        ?   <FiCheckCircle size={30} color="green" /> 
        :   <FiInfo size={30} color="red" className="min-w-10" />
      }
    
     

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${ issue.number }`)}
          className="hover:underline"
        >
         { issue.title }
        </a>
        <span className="text-gray-500">
          #{issue.number} opened { timeSince( issue.created_at ) } ago by{' '}
          <span className="font-bold">{ issue.user.login }</span>
        </span>

        <div className='flex flex-wrap gap-1'>
          {
           issue.labels.map(label => (
            <span 
              key={label.id}
              className='px-2 py-1 text-xs text-white rounded-md'
              style={{
                border: `1px solid #${label.color}`
              }}
            >
              { label.name }
            </span>
           ))
          }
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{ issue.comments }</span>
      </div>
    </div>
  );
};
