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

function Person({ x = 25, y = 25 }) {
  return <g><circle cx={x} cy={y} r="7" /><path d={`M${x-13} ${y+30}v-12q0-10 13-10t13 10v12M${x-6} ${y+10}v18m12-18v18`} /></g>;
}

function ProcessVector({ index }) {
  const drawings = [
    <g key="enquiry"><Person x={28} y={40} /><path d="M48 15h34v25H61L48 50V15m8 8h18m-18 8h14M12 76h60v9H12z" /></g>,
    <g key="consultation"><Person x={20} y={36} /><Person x={75} y={36} /><path d="M33 14h32v20H45l-12 8V14m8 8h16M35 66h25m-12 0v19M12 85h72" /></g>,
    <g key="survey"><path d="M9 79V43l24 10V36l24 16V29h18v50H9m8-13h10m12 0h10M21 43V22h11v23" /><circle cx="68" cy="55" r="18" /><path className="vector-motion" d="m81 69 11 13M58 55h20m-10-10v20" /></g>,
    <g key="downtime"><circle cx="45" cy="44" r="29" /><circle cx="45" cy="44" r="23" /><path d="M45 22v4m0 36v4M23 44h4m36 0h4M17 77h61v10H17" /><path className="vector-clock" d="M45 27v17l13 8" /><path d="M70 8v15m-8-8h16" /></g>,
    <g key="planning"><path d="M18 10h49l12 13v62H18V10m47 0v16h14M29 71V53h10v18m7 0V42h10v29m7 0V34h8v37" /><path className="vector-motion" d="m27 40 18-12 10 3 15-17m-10 0h10v10" /></g>,
    <g key="proposal"><path d="M18 9h43l15 15v59H18V9m42 0v17h16M29 35h32M29 46h20M29 57h15" /><path className="vector-motion" d="m42 77 8-22 24-24 12 12-24 24-20 10m9-23 12 12m-17 2 8 8" /></g>,
    <g key="approval"><path d="M18 9h45l14 14v61H18V9m44 0v16h15M29 36h32M29 46h18" /><circle cx="64" cy="65" r="21" /><path className="vector-motion" d="m52 65 8 8 17-19" /></g>,
    <g key="procurement"><path d="m16 27 31-15 31 15-31 15-31-15v40l31 15 31-15V27M47 42v40M31 20l31 15v17M9 88h79" /><path className="vector-motion" d="m58 63 6 6 14-14" /></g>,
    <g key="team"><Person x={20} y={35} /><Person x={48} y={25} /><Person x={77} y={35} /><path className="vector-motion" d="M12 79h72m-9-6 9 6-9 6" /><path d="M42 9h12m-6-6v12" /></g>,
    <g key="dismantle"><path d="M12 78h72v9H12zM25 78V58l15-11m5-8 20-19 12 11-22 22M24 58l12 11 19-16M68 16l9-8 12 12-9 8M51 56l11 12m0 0 12-4m-12 4-2 13" /><circle cx="23" cy="58" r="9" /><circle className="vector-gear" cx="45" cy="45" r="10" /></g>,
    <g key="transport"><path d="M8 24h48v42H8V24m48 18h16l13 15v9H56M64 44v13h18M8 73h10m12 0h33m14 0h12M15 15h25" /><circle className="vector-wheel" cx="25" cy="70" r="9" /><circle className="vector-wheel" cx="70" cy="70" r="9" /><path className="vector-motion" d="M7 83h69" /></g>,
    <g key="installation"><path d="M10 87h78M18 85V14h10v71M8 17h75M32 17l18-11 27 11M64 18v18" /><path className="vector-motion" d="M64 36v8q10 9 0 12M40 65h42v20H40V65m10-10h20v10H50V55m-1 19h22" /></g>,
    <g key="trial"><path d="M10 63h74v20H10V63m10-20h15v20H20V43m25-8h15v28H45V35M9 23h35" /><circle cx="25" cy="73" r="4" /><circle cx="45" cy="73" r="4" /><circle cx="65" cy="73" r="4" /><circle cx="71" cy="23" r="16" /><path className="vector-motion" d="m62 23 6 6 12-13" /></g>,
    <g key="handover"><Person x={22} y={29} /><path d="M43 26h35v56H43V26m9-8h17v15H52V18M11 74h23v10H11zM51 51h17m-17 10h17m-17 10h10" /><path className="vector-motion" d="m53 41 4 4 9-9" /></g>,
  ];
  return <svg className="process-vector" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[index]}</svg>;
}

export default function ProcessJourney() {
  return (
    <section id="process" className="process-journey hmt-section" aria-labelledby="process-heading">
      <div className="process-journey-inner">
        <p className="section-eyebrow">How a plant gets built</p>
        <h2 id="process-heading">Project execution process</h2>
        <div className="process-sequence">
        <svg className="process-connector" aria-hidden="true" preserveAspectRatio="none">
          <path className="process-rail" fill="none" />
          <path className="process-progress" fill="none" pathLength="1" />
          <circle className="process-traveller" r="4" />
        </svg>
        <ol className="process-writing-grid" aria-label="Fourteen stages from enquiry to handover">
          {stages.map((stage, index) => (
            <li className="process-written-step" style={{ '--step': index, '--column': index < 7 ? index + 1 : 14 - index, '--row': index < 7 ? 1 : 2 }} key={stage}>
              <ProcessVector index={index} />
              <span className="process-written-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="process-written-label">{stage}</span>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
