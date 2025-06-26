import { useState } from 'react';
import { Loading } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces/issues.interface';

export const ListView = () => {
  const [state, setState] = useState<State>(State.All)
  const [labels, setLabels] = useState<string[]>([])

  const { issuesQuery } = useIssues({
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
        : <IssueList issues={issuesQuery?.data ?? [] } onStateChange={setState} state={state} />
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
