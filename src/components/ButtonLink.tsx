import type { ParentProps } from 'solid-js';

type ButtonLinkProps = ParentProps<{
  href: string;
  class?: string;
  variant?: 'ghost' | 'outline';
  external?: boolean;
}>;

export function ButtonLink(props: ButtonLinkProps) {
  return (
    <a
      class={`button button--${props.variant ?? 'ghost'} ${props.class ?? ''}`.trim()}
      href={props.href}
      target={props.external ? '_blank' : undefined}
      rel={props.external ? 'noopener noreferrer' : undefined}
    >
      {props.children}
    </a>
  );
}
