import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import parse from 'html-react-parser';
import Script from 'next/script';
import { ProjectShowcase, GreenfieldWheel, BrownfieldStrip, IndustryCinema } from './sections';
import ProcessJourney from './journey';
import ContactDesk from './contact';
import ScrollHero from './scroll-hero';

const markup = readFileSync(join(process.cwd(), 'content', 'homepage.html'), 'utf8');

export default function HomePage() {
  return (
    <>
      {parse(markup, {
        replace(node) {
          if (node.name === 'section' && node.attribs?.id === 'hero') {
            return <ScrollHero />;
          }
          if (node.name === 'section' && node.attribs?.id === 'process') return <ProcessJourney />;
          if (node.name === 'section' && node.attribs?.id === 'contact') return <ContactDesk />;
          switch (node.attribs?.['data-hmt-slot']) {
            case 'divisions': return <ProjectShowcase />;
            case 'greenfield': return <GreenfieldWheel />;
            case 'brownfield': return <BrownfieldStrip />;
            case 'industries': return <IndustryCinema />;
            default: return undefined;
          }
        },
      })}
      <Script src="/app.js" strategy="afterInteractive" />
      <Script src="/motion.js" strategy="afterInteractive" />
    </>
  );
}
