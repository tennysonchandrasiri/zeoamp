import { Field, FieldLabel } from '@ui-sdk/solid/field';
import { Input, InputGroup } from '@ui-sdk/solid/input';

type SearchFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function SearchField(props: SearchFieldProps) {
  return (
    <Field class="search-field">
      <FieldLabel class="visually-hidden">
        විෂය හෝ සම්පත් සොයන්න
      </FieldLabel>
      <InputGroup class="search-box">
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
          <circle cx="8.75" cy="8.75" r="5.75" />
          <path d="m13 13 4 4" />
        </svg>
        <Input
          type="search"
          name="resource-search"
          autocomplete="off"
          placeholder="විෂය හෝ සම්පත් සොයන්න"
          value={props.value}
          onValueChange={props.onValueChange}
        />
        <kbd aria-hidden="true">⌕</kbd>
      </InputGroup>
    </Field>
  );
}
