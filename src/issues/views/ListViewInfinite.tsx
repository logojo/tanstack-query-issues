import { useState } from 'react';
import { Loading } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

import { State } from '../interfaces/issues.interface';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All)
  const [labels, setLabels] = useState<string[]>([])

  const { issuesQuery } = useIssuesInfinite({
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
         : ( <div className='flex flex-col justify-center'>  {/*aplanando arreglo*/}
              <IssueList issues={issuesQuery?.data?.pages.flat() ?? [] } onStateChange={setState} state={state} />

                <button 
                  onClick={ () => issuesQuery.fetchNextPage() }  
                  className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:bg-blue-400'
                  disabled={ issuesQuery.isFetching }

                >
                 {
                  issuesQuery.isFetching && <Loading />
                 }
                  Cargar mas....
                </button>
            
            </div> 
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
