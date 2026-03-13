import Image from "next/image";
import Link from "next/link";

const homematchItems = [
  { title: "100% Deposit Guarantee", text: "You get a free bond underwritten by NTUC Income to insure your deposits" },
  { title: "Contract Review", text: "We can help vet your contracts to ensure fairness" },
  { title: "Dispute Resolution", text: "Deadlocks? You can request for mediation at CASE" },
  { title: "Standard CASE Contract", text: "Renovators follow the CASE Contract which protects you" },
  { title: "Service Warranty", text: "Min. 12-month workmanship warranty" },
  { title: "Fairer Prices", text: "Quotes are itemised and broken down clearly with no hidden costs" },
  { title: "Withholding Payment", text: "5-10% withholding payment until proper handover of home is done" },
  { title: "Progressive Payments", text: "Proper payment schedule and no unnecessary upfront payments" },
  { title: "Feedback Management", text: "Systems to manage and resolve complaints" },
  { title: "1-1 Guidance", text: "We'll advise you and follow-up at every step of the way" },
  { title: "CaseTrust & above 4⭐", text: "Trustworthy firms that have been rigorously assessed" },
  { title: "Precision Matching", text: "Matched based on your exact requirements" },
  { title: "Individually Vetted", text: "We're the only platform with access to individual profiles" },
];

const othersItems = [
  { title: "Deposit Fraud", text: "You might lose your deposits" },
  { title: "Unfairness & Hiccups", text: "Getting yourself into one-sided contracts and reno hiccups" },
  { title: "Unresolved Disputes", text: "Ambiguous and/or unfair methods for resolving disputes" },
  { title: "One-Sided Contracts", text: "Unfair policies that puts you at a disadvantage" },
  { title: "Insufficient Warranty", text: "Defects are left unrectified" },
  { title: "Hidden Costs", text: "Dishonest lump sum quotations leading to unexpected mark-ups" },
  { title: "Post-Reno Issues", text: "No guarantees of rectification works and improper handovers" },
  { title: "Unnecessary Payments", text: "You're at risk of overpaying and suffering from reno delays" },
  { title: "Unresolved Complaints", text: "Silent treatment from dishonest renovators" },
  { title: "Reno Anxiety", text: "Not knowing where to start and confusion along the way" },
  { title: "Reno Nightmares", text: "Reno is one the industries with the most complaints in SG" },
  { title: "Wasted Time", text: "Meeting renovators who cannot meet your needs" },
  { title: "Extra Work & Headaches", text: "Most likely assigned to a random unsuitable renovator" },
];

export default function MostComprehensive() {
  return (
    <div id="most-comprehensive" className="safest-smartest safest">
      <div className="d-container safest home w-container">
        <div className="home-main-wrapper">
          <h2 className="d-h1 blue no-padding">Most Comprehensive Guarantees</h2>
          <h3 className="d-h1 _30px">
            <span className="text-span-55">=</span>Guaranteed peace of mind before, during, and after renovation
          </h3>
        </div>

        <div className="comparison-div home">
          {/* HomeMatch column */}
          <div className="comparison-wrapper">
            <div className="comparison-header-wrapper">
              <Image
                loading="lazy"
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63ff229a2c80b3b1f8c6428d_HomeMatch%20Long.png"
                alt=""
                width={150}
                height={30}
                className="image-37"
              />
            </div>
            {homematchItems.map((item, i) => (
              <div key={i} className={`comparison-item${i === homematchItems.length - 1 ? " last" : ""}${i === 9 ? " home" : ""}`}>
                <p className="d-h home"><strong>{item.title}</strong></p>
                <p className="comparion-item-text">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Others column */}
          <div className="comparison-wrapper neg">
            <div className="comparison-header-wrapper">
              <Image
                loading="lazy"
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66308267e2422af8196c8cb4_X.png"
                alt=""
                width={40}
                height={40}
                className="image-37 half x"
              />
            </div>
            {othersItems.map((item, i) => (
              <div key={i} className={`comparison-item${i === othersItems.length - 1 ? " last" : ""}`}>
                <p className="d-h home"><strong>{item.title}</strong></p>
                <p className="comparion-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="more-info-wrapper">
          <Link href="/safest-smartest-assurance" className="info-icon-link w-inline-block">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/667d2cabb07e90396e370041_about.svg" loading="lazy" alt="" width={30} height={30} className="info-icon-30" />
          </Link>
          <Link href="/safest-smartest-assurance" className="home-learnmore">
            Full Details: How the Safest-Smartest Assurance supports you throughout your renovation
          </Link>
        </div>
      </div>
    </div>
  );
}
