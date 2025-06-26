import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useIssue } from '../hooks/useIssue';
import { Loading } from '../../shared';


export const IssueView = () => {
  const navigate = useNavigate();
  const { issueNumber} = useParams();  
  const { issueQuery, commentsQuery } = useIssue( Number(issueNumber ?? 0) );

  if (issueQuery.isLoading ) {
    return <Loading />
  }
  if ( !issueQuery.data ) {
    return <Navigate to='/404' />
  }



  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros */}
      {
        commentsQuery.isLoading
        ? <Loading />
        : (
          commentsQuery.data?.map( comment => (
            <IssueComment key={comment.id} issue={ comment } /> 
          ))
        )
      }
     
    </div>
  );
};
