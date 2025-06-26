import { Loading } from "../../shared";
import { useLabels } from "../hooks/useLabels";

interface Props {
  onLabelsSelected: (label: string) => void;
  labels: string[]
}
export const LabelPicker = ({ labels, onLabelsSelected } : Props) => {
  const { labelsQuery } = useLabels()
  

  if( labelsQuery.isLoading ) {
    return (
      <div className="flex justify-center items-center h-52">
       <Loading />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center animate-fadeIn"  >
    {
      labelsQuery.data?.map( label => (
        <span
        onClick={() => onLabelsSelected( label.name ) }
        key={label.id}
          className={
            `px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer
            ${labels.includes(label.name) ? 'selected-label' : ''}
            `
          }
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
        >
         { label.name }
        </span>
      ))

    }
    </div>
  );
};
