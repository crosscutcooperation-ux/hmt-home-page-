import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import parse from 'html-react-parser';
import Script from 'next/script';

const markup = readFileSync(join(process.cwd(), 'content', 'homepage.html'), 'utf8');

export default function HomePage() {
  return (
    <>
      {parse(markup)}
      <Script src="/app.js" strategy="afterInteractive" />
      <Script src="/motion.js" strategy="afterInteractive" />
    </>
  );
}
