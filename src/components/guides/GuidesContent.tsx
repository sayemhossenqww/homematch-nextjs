"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { guides, GuideCategory } from "@/data/guides";

const TOPICS = [
  { value: "All", label: "Select Stage" },
  { value: "Planning & Budgeting", label: "Planning & Budgeting" },
  { value: "Finding Renovators", label: "Finding Renovators" },
  { value: "Meeting Renovators", label: "Meeting Renovators" },
  { value: "Evaluating Renovators", label: "Evaluating Renovators" },
  { value: "During Renovation", label: "During Renovation" },
  { value: "After Renovation", label: "After Renovation" },
];

const CHECKBOXES = [
  "Planning & Budgeting",
  "Finding Renovators",
  "Meeting Renovators",
  "After Renovation",
];

const ITEMS_PER_PAGE = 6;

export default function GuidesContent() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [activeCheckboxes, setActiveCheckboxes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [submitted, setSubmitted] = useState(false);

  const filtered = useMemo(() => {
    if (activeCheckboxes.length > 0) {
      return guides.filter((g) =>
        activeCheckboxes.some((cb) => g.categories.includes(cb as GuideCategory))
      );
    }
    if (selectedTopic !== "All") {
      return guides.filter((g) =>
        g.categories.includes(selectedTopic as GuideCategory)
      );
    }
    return guides;
  }, [selectedTopic, activeCheckboxes]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const toggleCheckbox = (label: string) => {
    setActiveCheckboxes((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleTopicChange = (val: string) => {
    setSelectedTopic(val);
    setActiveCheckboxes([]);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="guides-container">

      {/* Hero section — mirrors guide-herodiv from base HTML */}
      <footer className="guide-herodiv">
        <header className="guide-textwrapper">
          <h1 className="d-h crl guide">Renovation Guides for Singaporeans</h1>
          <h2 className="d-p crl guide">
            Really short, &#x27;no-fluffs&#x27;, &#x27;cut-to-the-chase&#x27; guides that will help
            you avoid wasting time and money
          </h2>
        </header>
        <div className="div-block-34"></div>
        <aside className="guide-newsletterwrapper">
          <h2 className="d-p crl guide newsletter">
            🤫 Access insider home tips &amp; secret deals
          </h2>
          <div className="newsletter-div">
            <div className="newsletter-opt w-form">
              {!submitted ? (
                <form
                  id="wf-form-Newsletter-Form"
                  name="wf-form-Newsletter-Form"
                  className="newsletter-opt-wrapper"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <input
                    className="text-field-2 w-input"
                    maxLength={256}
                    name="email"
                    placeholder="Enter Email"
                    type="email"
                    id="email"
                    required
                  />
                  <input
                    type="submit"
                    data-wait="Hang on..."
                    className="submit-button w-button"
                    value="Request"
                  />
                </form>
              ) : (
                <div className="success-message w-form-done">
                  <div className="d-p feedback">🥳 You&#x27;re Subscribed!</div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </footer>

      {/* Guide content: filter + cards */}
      <div className="guide-contentdiv">

        {/* Filter form */}
        <div className="form-block-3 w-form">
          <form
            id="wf-form-Guide-Filter"
            name="wf-form-Guide-Filter"
            className="form-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="reno-guide-subhead">
              Which stage of your renovation journey are you at?
            </p>

            <select
              id="field"
              name="field"
              className="select-field w-select"
              value={selectedTopic}
              onChange={(e) => handleTopicChange(e.target.value)}
            >
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {CHECKBOXES.map((label) => (
              <label
                key={label}
                className={`w-checkbox filter-selector guide${
                  activeCheckboxes.includes(label) ? " is-active" : ""
                }`}
                onClick={() => toggleCheckbox(label)}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={activeCheckboxes.includes(label)}
                  className="w-checkbox-input filter-selector-check"
                />
                <span className="w-form-label">{label}</span>
              </label>
            ))}
          </form>
        </div>

        {/* Article grid — same structure as GuidesSection.tsx but for /guides page */}
        <div className="guides-wrapper">
          <div className="collection-list-wrapper-12 w-dyn-list">
            <div role="list" className="collection-list-10 w-dyn-items w-row">
              {visible.map((guide) => (
                <div
                  key={guide.slug}
                  role="listitem"
                  className="collection-item-12 w-dyn-item w-col w-col-6"
                >
                  <Link
                    href={`/${guide.section}/${guide.slug}`}
                    className="reco-reads guide w-inline-block"
                  >
                    <div className="text-block-15">{guide.readTime}</div>
                    <p className="reco-reads-text">{guide.title}</p>
                    <div className="text-block-14">{guide.excerpt}</div>
                    {/* Hidden topic/category fields for Finsweet filter parity */}
                    <div className="guide-topics">
                      {guide.categories.map((cat, i) => (
                        <p key={i} className="guide-topic">{cat}</p>
                      ))}
                    </div>
                    <div className="guide-categories">
                      {guide.categories.map((cat, i) => (
                        <p key={i} className="guide-category">{cat}</p>
                      ))}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* More / pagination */}
          {hasMore && (
            <div
              role="navigation"
              aria-label="List"
              className="w-pagination-wrapper"
            >
              <button
                onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                className="w-pagination-next ad-bu"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <div className="w-inline-block">More</div>
                <svg
                  className="w-pagination-next-icon"
                  height="12px"
                  width="12px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 12 12"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    fillRule="evenodd"
                    d="M4 2l4 4-4 4"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
