const intents = [
  { title: 'Request a Site Visit', short: 'Site Visit', description: 'Walk the land or the live plant with an HMT engineer.', prompt: 'Tell us where to meet you and what our engineer should inspect.', fields: [
    ['Site location', 'siteLocation', 'text', 'City, plant or project site', true],
    ['Preferred visit window', 'visitWindow', 'text', 'Your preferred date or week', false],
  ] },
  { title: 'Request a Project Consultation', short: 'Project Consultation', description: 'Scope, sequence and responsibility defined before a proposal.', prompt: 'Describe the project decision you are working through.', fields: [
    ['Main challenge', 'mainChallenge', 'text', 'What needs to be solved?', true],
    ['Preferred consultation date', 'consultationDate', 'text', 'Your preferred date or week', false],
  ] },
  { title: 'Get a Quote', short: 'Quote', description: 'Tell us the division, the asset and the date that cannot slip.', prompt: 'Share your project scope so we can prepare the right proposal.', fields: [
    ['Plant location', 'plantLocation', 'text', 'City and plant or project site', false],
    ['Target date', 'targetDate', 'text', 'When must work begin or finish?', false],
  ] },
];

function Field({ label, name, type, placeholder, required = false }) {
  return <label className="contact-field">{label}{required && <span aria-hidden="true"> *</span>}
    <input name={name} type={type} placeholder={placeholder} required={required} autoComplete={name === 'name' ? 'name' : name === 'company' ? 'organization' : name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'off'} />
  </label>;
}

function EnquiryForm({ intent, index }) {
  return <form className="contact-variant-form" data-contact-form={index} hidden={index !== 2} noValidate>
    <div className="contact-form-heading"><span>Project enquiry / {String(index + 1).padStart(2, '0')}</span><h3>{intent.title}</h3><p>{intent.prompt}</p></div>
    <div className="contact-fields-grid">
      <Field label="Name" name="name" type="text" placeholder="Your name" required />
      <Field label="Company" name="company" type="text" placeholder="Company" required />
      <Field label="Email" name="email" type="email" placeholder="name@company.com" required />
      <Field label="Phone" name="phone" type="tel" placeholder="Phone number" />
      <label className="contact-field">Project type <span aria-hidden="true">*</span><select name="projectType" required defaultValue=""><option value="">Select a project type</option><option value="Greenfield">Greenfield</option><option value="Brownfield">Brownfield</option><option value="PMC">PMC — Project Management Consultant</option></select></label>
      {intent.fields.map(([label, name, type, placeholder, required]) => <Field key={name} label={label} name={name} type={type} placeholder={placeholder} required={required} />)}
    </div>
    <label className="contact-field contact-message">Message <span aria-hidden="true">*</span><textarea name="message" rows="5" maxLength="2000" required placeholder="Tell us about the site, machinery, scope and timing." /></label>
    <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
    <button type="submit" className="contact-submit">Submit {intent.short.toLowerCase()} enquiry <span aria-hidden="true">→</span></button>
  </form>;
}

export default function ContactDesk() {
  return <section id="contact" className="contact-desk hmt-section" aria-labelledby="contact-heading">
    <div className="contact-desk-inner">
      <h2 id="contact-heading">Connect Us</h2>
      <div className="contact-intents" role="group" aria-label="Choose an enquiry type">
        {intents.map((intent, index) => <button key={intent.title} type="button" className="contact-intent" data-intent={index} aria-pressed={index === 2} aria-controls="contact-form-stage">
          <span className="contact-intent-index">{String(index + 1).padStart(2, '0')}</span>
          <strong>{intent.title}</strong><span>{intent.description}</span>
        </button>)}
      </div>
      <div className="contact-form-perspective" id="contact-form">
        <div className="contact-form-stage" id="contact-form-stage">
          {intents.map((intent, index) => <EnquiryForm key={intent.title} intent={intent} index={index} />)}
        </div>
      </div>
    </div>
  </section>;
}
