import React from "react";
import { Link } from "react-router-dom";

const PageIntro = ({ eyebrow, title, lead, supportingText, links = [] }) => {
  return (
    <section className="page-intro-section-final">
      <div className="content-container-final">
        {eyebrow ? <p className="page-intro-eyebrow-final">{eyebrow}</p> : null}
        <h1 className="page-intro-title-final">{title}</h1>
        <div className="page-intro-copy-final">
          <p className="page-intro-lead-final">{lead}</p>
          {supportingText ? (
            <p className="page-intro-supporting-final">{supportingText}</p>
          ) : null}
        </div>

        {links.length > 0 ? (
          <div className="page-intro-links-final">
            {links.map((link) => (
              <Link
                key={`${link.to}-${link.label}`}
                to={link.to}
                className="page-intro-link-final"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PageIntro;
