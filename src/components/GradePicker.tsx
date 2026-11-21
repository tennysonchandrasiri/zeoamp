import {
  SegmentedControl,
  SegmentedControlItem,
} from '@ui-sdk/solid/segmented-control';
import { For } from 'solid-js';
import { grades, type Grade } from '../data/assets';

type GradePickerProps = {
  value: Grade;
  onChange: (grade: Grade) => void;
};

export function GradePicker(props: GradePickerProps) {
  return (
    <SegmentedControl
      class="grade-picker"
      aria-label="ශ්‍රේණිය අනුව සම්පත් තෝරන්න"
      value={String(props.value)}
      onValueChange={(value) => {
        if (value !== null) props.onChange(Number(value) as Grade);
      }}
    >
      <For each={grades}>
        {(grade) => (
          <SegmentedControlItem
            class="grade-option"
            value={String(grade)}
          >
            <span class="grade-option__number">{grade}</span>
            <span class="grade-option__label" lang="si">
              ශ්‍රේණිය
            </span>
          </SegmentedControlItem>
        )}
      </For>
    </SegmentedControl>
  );
}
