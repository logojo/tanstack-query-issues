import { useState } from 'react';
import { Loading } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces/issues.interface';

export const ListView = () => {
  const [state, setState] = useState<State>(State.All)
  const [labels, setLabels] = useState<string[]>([])

  const { issuesQuery, page,  nextPage,  prevPage } = useIssues({
    state: state,
    labels: labels,
  });

  const onLabelsSelected = ( label: string )  => {
    if( labels.includes( label ) ) {
      setLabels( labels.filter( l => l !== label));
    } else {
      setLabels([...labels, label]);
    }

      return labels;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
       {
        issuesQuery.isLoading 
        ? <Loading />
        : ( <>
              <IssueList issues={issuesQuery?.data ?? [] } onStateChange={setState} state={state} />

              <div className='flex justify-between items-center'>
                <button onClick={ prevPage } className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>Anteriores</button>
                <span>{ page }</span>
                <button onClick={nextPage} className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>Siguiente</button>
              </div>
            </> 
          )
       }
       
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker  
          onLabelsSelected={onLabelsSelected} 
          labels={labels} 
        />
      </div>
    </div>
  );
};
