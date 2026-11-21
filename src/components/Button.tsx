import { Button as SdkButton } from '@ui-sdk/solid/button';
import type { ParentProps } from 'solid-js';

export type ButtonVariant = 'ghost' | 'outline' | 'solid';

export function buttonClass(variant: ButtonVariant = 'ghost', extra?: string) {
  return `button button--${variant} ${extra ?? ''}`.trim();
}

type ButtonProps = ParentProps<{
  class?: string;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  pendingAnnouncement?: string;
  onClick?: (event: MouseEvent) => void;
  'aria-label'?: string;
}>;

export function Button(props: ButtonProps) {
  return (
    <SdkButton
      type={props.type ?? 'button'}
      class={buttonClass(props.variant, props.class)}
      disabled={props.disabled}
      pendingAnnouncement={props.pendingAnnouncement}
      onClick={(event) => props.onClick?.(event)}
      aria-label={props['aria-label']}
    >
      {props.children}
    </SdkButton>
  );
}
