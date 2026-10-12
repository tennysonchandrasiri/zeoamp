import type { ParentProps } from 'solid-js';
import { HydrationScript } from '@solidjs/web';
import { publicAsset } from './data/assets';

// The document shell (the index.html replacement), picked up by the
// src/Document.* convention; it must render the full <html> and ships no
// client JS. <HydrationScript /> is stripped from the prerendered shell in
// client mode and activates under `ssr: true`. Delete this file to fall
// back to the plugin's built-in shell.
export default function Document(props: ParentProps) {
  return (
    <html lang="si">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/jpeg" href={publicAsset('favicon.jpg')} />
        <title>ZEO Ampara — Learning resources</title>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
