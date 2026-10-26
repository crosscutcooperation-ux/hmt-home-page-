const asset = name => `/assets/hmt/${name}`;

const projects = [
  {
    title: 'Greenfield Projects',
    image: 'client-project-greenfield.webp',
    description: 'A new facility needs one coordinated plan from the first site decision to the first production run. HMT brings engineering, infrastructure, equipment and commissioning together.',
    points: ['Site planning and industrial infrastructure', 'Machinery procurement, installation and utilities', 'Automation, testing and production readiness'],
  },
  {
    title: 'Brownfield Projects',
    image: 'client-project-brownfield.webp',
    description: 'Modernize an operating plant without losing sight of the production schedule. We plan relocation, upgrades and installation around access, shutdown windows and restart.',
    points: ['Factory and machine relocation', 'Retrofitting and capacity upgrades', 'Sequenced restart and commissioning'],
  },
  {
    title: 'PMC — Project Management Consultant',
    image: 'client-project-pmc.webp',
    description: 'One coordinated view of scope, programme, cost and quality. HMT supports the owner from project planning and vendor coordination through site execution, commissioning and handover.',
    points: ['Project planning, scheduling and progress monitoring', 'Vendor, contractor and site coordination', 'Quality, safety, cost control and handover oversight'],
  },
];

const greenfieldServices = [
  ['EPC Projects', 'client-service-epc.webp'],
  ['Industrial Infrastructure', 'client-service-infrastructure.webp'],
  ['MEP Services', 'client-service-mep.webp'],
  ['Reactor, Boiler & Process Equipment Erection', 'client-service-reactor.webp'],
  ['Machine Procurement', 'haas-vf-1-cnc-machine-for-sale-1.webp'],
  ['PLC Integration', 'industrial-ht-panel-control-room1.webp'],
  ['OEM Coordination', 'hmt-greenfield-oem-coordination.webp'],
  ['Turnkey Projects', 'factory-setup.webp'],
  ['PEB Buildings', 'peb-structure-img.webp'],
  ['Heavy Engineering', 'fbrication-img.webp'],
  ['EOT Crane Installation', 'hmt-hmt-crane-machine-lift.webp'],
  ['Industrial Automation', 'industrial-automation.webp'],
  ['Epoxy Flooring', 'epoxy-flooring.webp'],
  ['Technical Support', 'hmt-greenfield-technical-support.webp'],
];

const brownfieldServices = [
  ['Factory Relocation', 'factory-shifting-img.webp'],
  ['Machine Relocation', 'hmt-hmt-heavy-mill-move.webp'],
  ['International Machine Movement', 'client-why-global.webp'],
  ['Machine Packaging', 'hmt-brownfield-machine-packaging.webp'],
  ['Import & Export', 'client-import-export-port.webp'],
  ['Customs Clearance', 'hmt-brownfield-customs-clearance.webp'],
  ['Machine Retrofitting', 'original-hmt-precision-alignment.webp'],
  ['PLC Upgradation', 'hmt-hmt-panel-wiring.webp'],
  ['Lean Manufacturing', 'lean-management.webp'],
  ['Existing Plant Expansion', 'scaffolding.webp'],
  ['Pre-Owned Machine Procurement', 'hmt-brownfield-pre-owned-machine-procurement.webp'],
  ['Technical Support', 'hmt-hmt-controls-commissioning.webp'],
];

const industries = [
  ['Automotive & Auto Components', 'assembly-line-movement.webp', 'Machining, assembly and automation projects planned around production flow.'],
  ['Aerospace & Defence', 'original-hd-aerospace.webp', 'Precision equipment movement and installation for demanding production environments.'],
  ['Pharmaceutical & Healthcare', 'hmt-stock-38.webp', 'Equipment installation and facility change coordinated with plant procedures.'],
  ['Chemical & Petrochemical', 'original-hd-contact.webp', 'Process equipment, utilities and mechanical systems handled as one sequence.'],
  ['Plastics, Rubber & Tyre', 'client-industry-plastics.webp', 'Large processing machines relocated and integrated with production priorities.'],
  ['Steel, Metals, Foundry & Forging', 'fabrication-and-erection.webp', 'Heavy equipment movement shaped by loads, lifting routes and foundations.'],
  ['General Engineering & Machine Tools', 'original-hmt-cnc-operator.webp', 'CNC and precision machinery moved, aligned and returned to service.'],
  ['Electronics, Electrical & Semiconductor', 'original-hd-semi.webp', 'Production lines and specialized equipment placed with controlled precision.'],
  ['Food, Beverage & FMCG', 'client-industry-food.webp', 'Processing and packaging lines installed around production readiness.'],
  ['Packaging & Printing', 'client-industry-printing.webp', 'Converting, printing and packaging machinery transferred in planned stages.'],
  ['Glass, Ceramics & Tiles', 'client-industry-glass.webp', 'Production systems and utilities integrated to the approved layout.'],
  ['Textile & Garments', 'client-industry-textile.webp', 'Textile equipment and full lines shifted for the next production cycle.'],
  ['Paper & Pulp', 'client-industry-paper.webp', 'Large machinery and material handling systems installed in sequence.'],
  ['Power, Renewable Energy & Battery', 'original-hd-power.webp', 'Specialized production assets placed for new and expanding facilities.'],
  ['Cement, Building Materials & Mining', 'client-industry-cement.webp', 'Heavy process machinery moved with attention to access and lifting.'],
];

export function ProjectShowcase() {
  return (
    <section id="divisions" className="project-showcase hmt-section" aria-labelledby="project-showcase-title">
      <div className="showcase-inner">
        <h2 id="project-showcase-title" className="project-written-title" aria-label="Greenfield. Brownfield. PMC.">
          <span>Greenfield.</span> <span>Brownfield.</span> <span>PMC.</span>
        </h2>
        <div className="project-layout">
          <div className="project-thumbnails" role="group" aria-label="Choose a project type">
            {projects.map((project, index) => (
              <button key={project.title} type="button" className="project-thumbnail" data-project-index={index} aria-label={`Show ${project.title}`} aria-pressed={index === 0} aria-controls="project-main-image">
                <img src={asset(project.image)} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <button type="button" className="project-main-image" id="project-main-image" data-open-project-image aria-label="Open full Greenfield Projects image">
            <img id="project-feature-image" src={asset(projects[0].image)} alt="Greenfield Projects" loading="lazy" />
            <span className="project-image-expand" aria-hidden="true">↗</span>
          </button>
          <div className="project-information" aria-live="polite">
            {projects.map((project, index) => (
              <div key={project.title} className="project-information-panel" data-project-panel={index} hidden={index !== 0}>
                <span className="project-number">{String(index + 1).padStart(2, '0')} / 03</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-scope-label">Project scope</div>
                <ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <dialog id="project-image-dialog" className="project-image-dialog" aria-label="Full project image">
        <button type="button" data-close-project-image aria-label="Close full image">×</button>
        <img id="project-full-image" src={asset(projects[0].image)} alt="Greenfield Projects" />
      </dialog>
    </section>
  );
}

export function GreenfieldWheel() {
  return (
    <section id="greenfield" className="greenfield-wheel-section hmt-section" aria-labelledby="greenfield-title">
      <div className="wheel-intro">
        <div><p className="section-eyebrow">Greenfield Projects</p><h2 id="greenfield-title">From bare land to the first good part.</h2></div>
        <p>Engineering, civil, mechanical, machines, automation and production readiness — held as one programme.</p>
      </div>
      <div className="wheel-controls">
        <button type="button" data-wheel-step="-1" aria-label="Previous Greenfield services">←</button>
        <button type="button" data-wheel-step="1" aria-label="Next Greenfield services">→</button>
      </div>
      <div className="wheel-stage" id="greenfield-wheel" aria-label="Rotating Greenfield services gallery" tabIndex="0">
        <div className="wheel-track">
          {greenfieldServices.map(([title, image], index) => (
            <div key={title} className="wheel-card" data-wheel-card={index}>
              <img src={asset(image)} alt={title} loading={index < 6 ? 'eager' : 'lazy'} />
              <span className="wheel-card-shade" aria-hidden="true" />
              <span className="wheel-card-title">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrownfieldStrip() {
  return (
    <section id="brownfield" className="brownfield-photo-section hmt-section" aria-labelledby="brownfield-heading">
      <h2 id="brownfield-heading" className="sr-only">Brownfield project services</h2>
      <div className="brownfield-strip-controls">
        <button type="button" data-scroll="brownfield-row:-1" aria-label="Previous Brownfield photos">←</button>
        <button type="button" data-scroll="brownfield-row:1" aria-label="Next Brownfield photos">→</button>
      </div>
      <div id="brownfield-row" className="brownfield-photo-row" aria-label="Brownfield project photos" tabIndex="0">
        {brownfieldServices.map(([title, image], index) => (
          <article key={title} className="brownfield-photo">
            <img src={asset(image)} alt={title} loading="lazy" />
            <div className="brownfield-photo-details">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function IndustryCinema() {
  return (
    <section id="industries" className="industry-cinema-section hmt-section" aria-labelledby="industry-title">
      <div className="industry-cinema-stage">
        <img className="industry-feature-image" id="industry-feature-image" src={asset(industries[0][1])} alt={industries[0][0]} loading="lazy" />
        <div className="industry-cinema-shade" aria-hidden="true" />
        <div className="industry-feature-copy" aria-live="polite">
          <p>Industries we serve</p>
          <h2 id="industry-title">{industries[0][0]}</h2>
          <span id="industry-feature-summary">{industries[0][2]}</span>
        </div>
        <div className="industry-rail-wrap">
          <div className="industry-rail-controls">
            <button type="button" data-scroll="industry-row:-1" aria-label="Previous industries">←</button>
            <button type="button" data-scroll="industry-row:1" aria-label="Next industries">→</button>
          </div>
          <div className="industry-thumbnail-rail" id="industry-row" aria-label="Choose an industry" tabIndex="0">
            {industries.map(([title, image, summary], index) => (
              <button key={title} type="button" className="industry-thumbnail" data-industry={index} data-title={title} data-image={asset(image)} data-summary={summary} aria-pressed={index === 0} aria-label={`Show ${title}`}>
                <img src={asset(image)} alt="" loading="lazy" />
                <span>{title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
