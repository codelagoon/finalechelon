import React from "react";
import { Link } from "react-router-dom";

const overviewCards = [
  {
    title: "Student-led investment research",
    description:
      "Echelon Equity is a student-led investment research platform for high school and university analysts who want to build serious work product in public markets.",
    link: { to: "/team", label: "Meet the research analysts" },
  },
  {
    title: "How the platform works",
    description:
      "Members work through structured analyst tracks, submit deliverables, receive review, and improve their process over time instead of relying on passive coursework alone.",
    link: { to: "/program", label: "See how the program works" },
  },
  {
    title: "What analysts produce",
    description:
      "Research analysts build three-statement models, DCFs, LBOs, market views, and investment memos grounded in filings, valuation discipline, and current context.",
    link: { to: "/newsletter", label: "Review investment research coverage" },
  },
  {
    title: "Institutional standards",
    description:
      "Every submission is expected to be clear, defensible, and presentation-ready, with formatting, assumptions, and reasoning held to institutional standards.",
    link: { to: "/program", label: "Explore analyst standards" },
  },
  {
    title: "Who the program is for",
    description:
      "The platform is built for students who care about research quality, analytical judgment, and learning by producing work that can be reviewed in a professional context.",
    link: { to: "/apply", label: "Apply to the investment research program" },
  },
  {
    title: "Outcomes and opportunities",
    description:
      "Strong contributors leave with sharper research habits, stronger writing, better modeling discipline, and more credible evidence of how they think and execute.",
    link: { to: "/apply", label: "Start your application" },
  },
];

const HomeOverview = () => {
  return (
    <section className="overview-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">
          What Echelon Equity Is
        </h2>
        <p className="section-subtitle-final">
          Echelon Equity is a student-run investment research platform that helps
          analysts build real output across research, modeling, valuation, and
          communication. The platform is designed to be selective, structured,
          and credible for people who want to operate with institutional rigor
          early, and members have included students from schools such as NYU,
          Colgate, and the University of Maryland.
        </p>

        <div className="overview-grid-final">
          {overviewCards.map((card) => (
            <article key={card.title} className="overview-card-final">
              <h3 className="overview-card-title-final">{card.title}</h3>
              <p className="overview-card-description-final">
                {card.description}
              </p>
              <Link to={card.link.to} className="overview-card-link-final">
                {card.link.label}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOverview;
