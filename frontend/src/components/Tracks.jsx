import React from 'react';

const tracksData = {
  title: "Investment Research Program Tracks",
  subtitle: "Analysts operate within structured tracks aligned to institutional investment research workflows.",
  positioning: "Analysts enter with different levels of experience, but are held to the same standard of output, process, and presentation.",
  tracks: [
    {
      id: 1,
      number: "01",
      name: "Three-Statement Modeling",
      description: "Build fully integrated financial statements from 10-K filings.",
      deliverable: "Integrated IS / BS / CF model"
    },
    {
      id: 2,
      number: "02",
      name: "DCF Valuation & Sensitivity",
      description: "Develop discounted cash flow models with dynamic assumptions.",
      deliverable: "DCF with sensitivity tables"
    },
    {
      id: 3,
      number: "03",
      name: "Investment Memo",
      description: "Write formal investment theses reviewed against professional standards.",
      deliverable: "Full investment memo"
    },
    {
      id: 4,
      number: "04",
      name: "LBO Modeling",
      description: "Construct leveraged buyout models with return analysis.",
      deliverable: "LBO model with IRR outputs"
    }
  ]
};

const Tracks = () => {
  return (
    <section id="tracks" className="tracks-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{tracksData.title}</h2>
        <p className="section-subtitle-final">{tracksData.subtitle}</p>
        <p className="tracks-positioning-final">{tracksData.positioning}</p>
        <div className="tracks-grid-final">
          {tracksData.tracks.map((track) => (
            <div key={track.id} className="track-card-final">
              <div className="track-number-final">Track {track.number}</div>
              <h3 className="track-name-final">{track.name}</h3>
              <p className="track-description-final">{track.description}</p>
              <div className="track-deliverable-final">
                <span className="deliverable-label-final">Deliverable:</span>
                <span className="deliverable-text-final">{track.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
