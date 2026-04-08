import React from 'react';

const selectionData = {
  title: "How the Echelon Equity Program Works",
  subtitle: "Admission is selective. Applicants are evaluated on clarity of thinking, attention to detail, and ability to execute before joining the investment research platform.",
  selectivityNote: "Not all applicants are admitted.",
  steps: [
    "Application submission",
    "Technical / written evaluation",
    "Final selection"
  ]
};

const Selection = () => {
  return (
    <section className="selection-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{selectionData.title}</h2>
        <p className="selection-subtitle-final">{selectionData.subtitle}</p>
        <div className="selection-process-final">
          <p className="process-label-final">Process:</p>
          <ol className="process-steps-final">
            {selectionData.steps.map((step, index) => (
              <li key={index} className="process-step-final">{step}</li>
            ))}
          </ol>
        </div>
        <p className="selectivity-note-final">{selectionData.selectivityNote}</p>
      </div>
    </section>
  );
};

export default Selection;
