import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const DCFBuilder = () => {
  // State for all inputs
  const [inputs, setInputs] = useState({
    currentRevenue: 1000,
    revenueGrowth1: 25,
    revenueGrowth2: 15,
    revenueGrowth3: 10,
    revenueGrowth4: 7,
    revenueGrowth5: 5,
    terminalGrowth: 2.5,
    operatingMargin: 15,
    taxRate: 21,
    capex: 50,
    workingCapitalChange: 20,
    wacc: 8,
    sharesOutstanding: 100,
  });

  const [expandedSection, setExpandedSection] = useState('revenue');
  const [showFormulas, setShowFormulas] = useState(false);
  const [preset, setPreset] = useState('custom');

  // Apply presets
  const applyPreset = (presetName) => {
    const presets = {
      growth: {
        revenueGrowth1: 35,
        revenueGrowth2: 25,
        revenueGrowth3: 15,
        revenueGrowth4: 10,
        revenueGrowth5: 6,
        terminalGrowth: 3,
        operatingMargin: 10,
        taxRate: 21,
        capex: 80,
        workingCapitalChange: 50,
        wacc: 9,
      },
      mature: {
        revenueGrowth1: 5,
        revenueGrowth2: 4,
        revenueGrowth3: 3,
        revenueGrowth4: 3,
        revenueGrowth5: 2.5,
        terminalGrowth: 2,
        operatingMargin: 20,
        taxRate: 21,
        capex: 30,
        workingCapitalChange: 10,
        wacc: 6,
      },
      cyclical: {
        revenueGrowth1: 10,
        revenueGrowth2: -5,
        revenueGrowth3: 8,
        revenueGrowth4: 5,
        revenueGrowth5: 3,
        terminalGrowth: 2,
        operatingMargin: 12,
        taxRate: 21,
        capex: 40,
        workingCapitalChange: 30,
        wacc: 7.5,
      },
    };

    if (presetName === 'custom') {
      setPreset('custom');
    } else if (presets[presetName]) {
      setInputs({ ...inputs, ...presets[presetName] });
      setPreset(presetName);
    }
  };

  // Calculate free cash flows
  const calculateFCF = () => {
    const years = 5;
    const fcfs = [];
    let cumulativePV = 0;

    for (let year = 1; year <= years; year++) {
      const growthKey = `revenueGrowth${year}`;
      const growthRate = inputs[growthKey] / 100;
      const revenue = year === 1 
        ? inputs.currentRevenue * (1 + growthRate)
        : fcfs[year - 2].revenue * (1 + growthRate);

      const ebit = revenue * (inputs.operatingMargin / 100);
      const nopat = ebit * (1 - inputs.taxRate / 100);
      const fcf = nopat - (inputs.capex / 100) * revenue - (inputs.workingCapitalChange / 100) * revenue;
      
      const discountFactor = 1 / Math.pow(1 + inputs.wacc / 100, year);
      const presentValue = fcf * discountFactor;
      cumulativePV += presentValue;

      fcfs.push({
        year,
        revenue: Math.round(revenue),
        ebit: Math.round(ebit),
        nopat: Math.round(nopat),
        fcf: Math.round(fcf),
        discountFactor: discountFactor.toFixed(4),
        presentValue: Math.round(presentValue),
      });
    }

    // Terminal value
    const year5FCF = fcfs[4].fcf;
    const terminalValue = year5FCF * (1 + inputs.terminalGrowth / 100) / ((inputs.wacc - inputs.terminalGrowth) / 100);
    const terminalValuePV = terminalValue / Math.pow(1 + inputs.wacc / 100, 5);
    cumulativePV += terminalValuePV;

    return {
      fcfs,
      terminalValue: Math.round(terminalValue),
      terminalValuePV: Math.round(terminalValuePV),
      enterpriseValue: Math.round(cumulativePV),
      equityValuePerShare: Math.round((cumulativePV / inputs.sharesOutstanding) * 100) / 100,
      pvOfFCF: Math.round(cumulativePV - terminalValuePV),
    };
  };

  const results = calculateFCF();

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
    setPreset('custom');
  };

  const helperText = {
    currentRevenue: "Most recent annual revenue (Year 0)",
    revenueGrowth: "Expected annual growth rate (%)",
    terminalGrowth: "Perpetual growth rate (typically 2-3%, not more than GDP growth)",
    operatingMargin: "EBIT as % of revenue",
    taxRate: "Effective tax rate (%)",
    capex: "Capital expenditures as % of revenue",
    workingCapitalChange: "Change in working capital as % of revenue",
    wacc: "Weighted average cost of capital (discount rate, %)",
    sharesOutstanding: "Shares outstanding (millions)",
  };

  const SectionHeader = ({ title, section }) => (
    <button
      onClick={() => setExpandedSection(expandedSection === section ? null : section)}
      className="section-header-dcf"
    >
      <span>{title}</span>
      {expandedSection === section ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );

  const InputField = ({ label, field, helper, unit = '%' }) => (
    <div className="input-field-dcf">
      <div className="input-label-container">
        <label>{label}</label>
        <span className="input-unit">{unit}</span>
        {helper && (
          <div className="helper-icon" title={helper}>
            <HelpCircle size={14} />
          </div>
        )}
      </div>
      <input
        type="number"
        value={inputs[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        step="0.1"
      />
    </div>
  );

  const Tooltip = ({ text }) => (
    <span className="tooltip-dcf" title={text}>
      <HelpCircle size={12} />
    </span>
  );

  return (
    <div className="page-shell-final">
      <PageIntro
        eyebrow="Interactive tool"
        title="Build a DCF: Step-by-Step Valuation"
        lead="This educational tool walks you through a simplified DCF model. Adjust assumptions and watch how they flow through to valuation output. The goal is learning, not perfection."
        supportingText="A complete DCF model includes more nuance (unlevering/relevering debt, working capital cycles, margin changes). This tool focuses on core logic: revenue growth → free cash flow → present value."
        links={[
          { to: "/toolkit", label: "Return to toolkit" },
          { to: "/standards", label: "See publication standards" },
        ]}
      />

      <section className="content-section-final dcf-builder-section">
        <div className="content-container-final">
          <div className="dcf-container">
            {/* Input Panel */}
            <div className="dcf-input-panel">
              <div className="dcf-panel-header">
                <h2>DCF Builder: Assumptions</h2>
                <div className="preset-selector">
                  <label>Quick preset:</label>
                  <select value={preset} onChange={(e) => applyPreset(e.target.value)}>
                    <option value="custom">Custom</option>
                    <option value="growth">Growth Company</option>
                    <option value="mature">Mature Company</option>
                    <option value="cyclical">Cyclical Company</option>
                  </select>
                </div>
              </div>

              {/* Revenue Section */}
              <div className="dcf-section">
                <SectionHeader title="1. Revenue Assumptions" section="revenue" />
                {expandedSection === 'revenue' && (
                  <div className="section-content">
                    <InputField
                      label="Current Revenue (Year 0)"
                      field="currentRevenue"
                      helper={helperText.currentRevenue}
                      unit="$M"
                    />
                    {[1, 2, 3, 4, 5].map(year => (
                      <InputField
                        key={year}
                        label={`Year ${year} Growth Rate`}
                        field={`revenueGrowth${year}`}
                        helper={helperText.revenueGrowth}
                      />
                    ))}
                    <div className="validation-note">
                      <strong>Note:</strong> Growth rates that exceed terminal growth in all 5 years should eventually normalize.
                    </div>
                  </div>
                )}
              </div>

              {/* Margin Section */}
              <div className="dcf-section">
                <SectionHeader title="2. Margin & Tax Assumptions" section="margins" />
                {expandedSection === 'margins' && (
                  <div className="section-content">
                    <InputField
                      label="Operating Margin (EBIT %)"
                      field="operatingMargin"
                      helper={helperText.operatingMargin}
                    />
                    <div className="validation-note">
                      <strong>Guidance:</strong> Consider industry average and company's historical range. 15-25% for software, 5-10% for retail.
                    </div>
                    <InputField
                      label="Tax Rate"
                      field="taxRate"
                      helper={helperText.taxRate}
                    />
                  </div>
                )}
              </div>

              {/* FCF Section */}
              <div className="dcf-section">
                <SectionHeader title="3. Free Cash Flow Assumptions" section="fcf" />
                {expandedSection === 'fcf' && (
                  <div className="section-content">
                    <InputField
                      label="CapEx as % of Revenue"
                      field="capex"
                      helper={helperText.capex}
                    />
                    <div className="validation-note">
                      <strong>Guidance:</strong> High-growth tech: 50-100%. Mature software: 10-30%. Retail: 5-10%.
                    </div>
                    <InputField
                      label="Δ Working Capital as % of Revenue"
                      field="workingCapitalChange"
                      helper={helperText.workingCapitalChange}
                    />
                    <div className="validation-note">
                      <strong>Guidance:</strong> Assume 10-50% for high growth. Lower for subscription businesses.
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Section */}
              <div className="dcf-section">
                <SectionHeader title="4. Discounting Assumptions" section="discount" />
                {expandedSection === 'discount' && (
                  <div className="section-content">
                    <InputField
                      label="WACC (Discount Rate)"
                      field="wacc"
                      helper={helperText.wacc}
                    />
                    <div className="validation-note">
                      <strong>Guidance:</strong> Risk-free rate (3-4%) + equity risk premium (5-7%). Check historical beta. 6-10% typical.
                    </div>
                    <InputField
                      label="Terminal Growth Rate"
                      field="terminalGrowth"
                      helper={helperText.terminalGrowth}
                    />
                    <div className="validation-warning">
                      ⚠️ <strong>Warning:</strong> Terminal growth above WACC would imply infinite value. Terminal growth should not exceed GDP growth (2-3%).
                    </div>
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div className="dcf-section">
                <SectionHeader title="5. Per-Share Output" section="output" />
                {expandedSection === 'output' && (
                  <div className="section-content">
                    <InputField
                      label="Shares Outstanding"
                      field="sharesOutstanding"
                      helper={helperText.sharesOutstanding}
                      unit="M"
                    />
                  </div>
                )}
              </div>

              {/* Toggle Formulas */}
              <button
                onClick={() => setShowFormulas(!showFormulas)}
                className="formulas-toggle"
              >
                {showFormulas ? '▼ Hide formulas' : '▶ Show formulas'}
              </button>
            </div>

            {/* Output Panel */}
            <div className="dcf-output-panel">
              <div className="dcf-panel-header">
                <h2>Valuation Output</h2>
              </div>

              {/* FCF Schedule */}
              <div className="dcf-output-section">
                <h3>Free Cash Flow Forecast</h3>
                <div className="fcf-table">
                  <div className="table-header">
                    <div>Year</div>
                    <div>Revenue</div>
                    <div>EBIT</div>
                    <div>FCF</div>
                    <div>Discount</div>
                    <div>PV</div>
                  </div>
                  {results.fcfs.map((fcf, idx) => (
                    <div key={idx} className="table-row">
                      <div>{fcf.year}</div>
                      <div>${fcf.revenue}M</div>
                      <div>${fcf.ebit}M</div>
                      <div>${fcf.fcf}M</div>
                      <div>{fcf.discountFactor}</div>
                      <div>${fcf.presentValue}M</div>
                    </div>
                  ))}
                </div>
                {showFormulas && (
                  <div className="formula-box">
                    <p><strong>FCF = EBIT × (1 - Tax Rate) - CapEx - Δ Working Capital</strong></p>
                    <p><strong>PV = FCF ÷ (1 + WACC)^Year</strong></p>
                  </div>
                )}
              </div>

              {/* Terminal Value */}
              <div className="dcf-output-section">
                <h3>Terminal Value (Perpetuity)</h3>
                <div className="output-row">
                  <span>Year 5 FCF:</span>
                  <strong>${results.fcfs[4].fcf}M</strong>
                </div>
                <div className="output-row">
                  <span>Terminal Value:</span>
                  <strong>${results.terminalValue}M</strong>
                </div>
                <div className="output-row">
                  <span>PV of Terminal Value:</span>
                  <strong>${results.terminalValuePV}M</strong>
                </div>
                {showFormulas && (
                  <div className="formula-box">
                    <p><strong>TV = FCF Year 5 × (1 + g) ÷ (WACC - g)</strong></p>
                    <p className="formula-note">where g = terminal growth rate</p>
                  </div>
                )}
              </div>

              {/* Valuation Summary */}
              <div className="dcf-output-section highlight">
                <h3>Enterprise Value</h3>
                <div className="output-row">
                  <span>PV of FCF (Years 1-5):</span>
                  <span>${results.pvOfFCF}M</span>
                </div>
                <div className="output-row">
                  <span>+ PV of Terminal Value:</span>
                  <span>${results.terminalValuePV}M</span>
                </div>
                <div className="output-row highlight-row">
                  <span><strong>= Enterprise Value</strong></span>
                  <span><strong>${results.enterpriseValue}M</strong></span>
                </div>
              </div>

              {/* Per-Share Value */}
              <div className="dcf-output-section highlight final-output">
                <h3>Equity Value Per Share</h3>
                <div className="output-row">
                  <span>Enterprise Value:</span>
                  <span>${results.enterpriseValue}M</span>
                </div>
                <div className="output-row">
                  <span>÷ Shares Outstanding:</span>
                  <span>{inputs.sharesOutstanding}M</span>
                </div>
                <div className="output-row final-value">
                  <span><strong>= Fair Value Per Share</strong></span>
                  <span className="value-badge"><strong>${results.equityValuePerShare.toFixed(2)}</strong></span>
                </div>
              </div>

              {/* Sensitivity & Notes */}
              <div className="dcf-output-section">
                <h3>Next Steps</h3>
                <ul className="dcf-notes">
                  <li><strong>Sense-check:</strong> Is this price reasonable vs. current market price?</li>
                  <li><strong>Sensitivity:</strong> How much does the fair value change if WACC or terminal growth shift by 1-2%?</li>
                  <li><strong>Comparable analysis:</strong> Does this imply a reasonable EV/Sales or P/E multiple?</li>
                  <li><strong>Risk:</strong> What assumptions would break if the thesis is wrong?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Notes */}
      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">How to Use This Tool</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">1. Start with a preset</h3>
              <p className="content-card-copy-final">
                Choose "Growth Company," "Mature," or "Cyclical" to see realistic assumption ranges. This prevents unrealistic inputs.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">2. Adjust assumptions</h3>
              <p className="content-card-copy-final">
                Change one assumption at a time and watch how it affects fair value. This builds intuition about which drivers matter most.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">3. Note the sensitivity</h3>
              <p className="content-card-copy-final">
                Small changes in terminal growth or WACC often drive huge changes in output. This teaches why assumption documentation matters.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Limitations of This Model</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Simplified assumptions</h3>
              <p className="content-card-copy-final">
                This assumes constant operating margins, ignores debt effects, and doesn't model lease obligations or R&D capitalization.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Perpetuity math</h3>
              <p className="content-card-copy-final">
                The model uses perpetuity growth for terminal value. In reality, companies don't grow forever. Use 5-year projection models for more precision.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Not investment advice</h3>
              <p className="content-card-copy-final">
                Fair value is an estimate, not gospel. Use this with comparables analysis, peer valuation, and qualitative research.
              </p>
            </article>
          </div>
        </div>
      </section>

      <div className="page-cta-section-final">
        <div className="content-container-final page-cta-panel-final">
          <h2 className="page-cta-title-final">Ready to Build Real Models?</h2>
          <p className="page-cta-subtitle-final">
            Download Excel templates and checklists to start building institutional-quality models for Echelon Equity.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/toolkit"
              className="page-cta-button-final page-cta-button-dark-final"
            >
              Download Model Templates
            </Link>
            <Link
              to="/program"
              className="page-cta-button-final"
              style={{ backgroundColor: 'transparent', color: 'var(--color-black)', border: '1px solid var(--color-black)' }}
            >
              Join the Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DCFBuilder;
