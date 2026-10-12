import type { ParentProps } from 'solid-js';

type ButtonProps = ParentProps<{
  class?: string;
  variant?: 'ghost' | 'outline' | 'solid';
  selected?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-pressed'?: boolean;
  'aria-label'?: string;
}>;

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type ?? 'button'}
      class={`button button--${props.variant ?? 'ghost'} ${props.class ?? ''} ${props.selected ? 'is-selected' : ''}`.trim()}
      disabled={props.disabled}
      onClick={() => props.onClick?.()}
      aria-pressed={
        props['aria-pressed'] === undefined && props.selected === undefined
          ? undefined
          : (props['aria-pressed'] ?? props.selected)
            ? 'true'
            : 'false'
      }
      aria-label={props['aria-label']}
    >
      {props.children}
    </button>
  );
}
