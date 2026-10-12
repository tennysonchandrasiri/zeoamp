import type { Grade } from '../data/assets';
import { Button } from './Button';

type GradeOptionProps = {
  grade: Grade;
  selected: boolean;
  onSelect: (grade: Grade) => void;
};

export function GradeOption(props: GradeOptionProps) {
  return (
    <Button
      class="grade-option"
      selected={props.selected}
      onClick={() => props.onSelect(props.grade)}
    >
      <span class="grade-option__number">{props.grade}</span>
      <span class="grade-option__label" lang="si">
        ශ්‍රේණිය
      </span>
    </Button>
  );
}
