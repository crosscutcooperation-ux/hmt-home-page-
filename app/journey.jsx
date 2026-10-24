const stages = [
  'Enquiry Received',
  'Initial Consultation',
  'Site Survey',
  'Production Downtime Assessment',
  'Engineering & Planning',
  'Preliminary Proposal',
  'Written Approval / Purchase Order',
  'Procurement',
  'Team Mobilization',
  'Dismantling & Packaging',
  'Transportation',
  'Machine Reassembly, Installation & Commissioning',
  'Trial Production',
  'Handover',
];

export default function ProcessJourney() {
  return (
    <section id="process" className="process-journey hmt-section" aria-labelledby="process-heading">
      <div className="process-journey-inner">
        <p className="section-eyebrow">How a plant gets built</p>
        <h2 id="process-heading">Project execution process</h2>
        <div className="process-writing-grid" aria-label="Fourteen stages from enquiry to handover">
          {stages.map((stage, index) => (
            <div className="process-written-step" style={{ '--step': index }} key={stage}>
              <span className="process-written-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="process-written-label">{stage}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
