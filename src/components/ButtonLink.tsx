import { Button as SdkButton } from '@ui-sdk/solid/button';
import type { ParentProps } from 'solid-js';
import { buttonClass, type ButtonVariant } from './Button';

type ButtonLinkProps = ParentProps<{
  href: string;
  class?: string;
  variant?: ButtonVariant;
  external?: boolean;
}>;

export function ButtonLink(props: ButtonLinkProps) {
  return (
    <SdkButton
      class={buttonClass(props.variant, props.class)}
      render={(buttonProps) => (
        <a
          {...buttonProps}
          href={props.href}
          target={props.external ? '_blank' : undefined}
          rel={props.external ? 'noopener noreferrer' : undefined}
        />
      )}
    >
      {props.children}
    </SdkButton>
  );
}
