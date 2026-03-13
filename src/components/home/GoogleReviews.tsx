import Image from "next/image";

const reviews = [
  {
    href: "https://share.google/NgghvmofAzBxqPAFz",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68ece77cd089dd0d83dd7374_G-H.png",
    name: "Hwee Ming Ong",
    text: `I used <strong>Qanvast and HomeMatch</strong> for my home reno journey. I would say <strong>HomeMatch puts in more effort and thoughts</strong> in the curation of the IDs and really ask more leading questions to prevent homeowners and IDs from wasting one another's time. Homematch is also very diligent in doing check ins, and is ready to address any issues.`,
    first: true,
  },
  {
    href: "https://share.google/VEPaoWxbiIyvAs1mx",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6901e084ad489c7895683957_unnamed.png",
    name: "Anzee Lee",
    text: `<strong>Free platform yet make me feel personal</strong>. I was matched to 5 IDs the next day after a call from Bronson to enquire my requirements. Save me time, effort &amp; stress to shortlist IDs myself one by one.`,
    first: true,
  },
  {
    href: "https://share.google/7XiABFaHCbyNQtD2i",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68902cd7a0a39514f904bc7d_g-huishan.png",
    name: "gabrielle tan huishan",
    text: `I was <strong>recommended by a friend</strong> to try out homematch. I really appreciate the help that I got. It's my first time renovating a house and <strong>I was quite nervous and felt a little lost</strong> trying to start out as there were so many IDs out there to choose from. But homematch made it much easier by recommending a few that suited my needs.`,
    first: true,
  },
  {
    href: "https://maps.app.goo.gl/Yig8LNrk2vETLpym7",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68806668021ff7f6e7e73d0b_g-jenniferlee.png",
    name: "Jennifer Lee",
    text: `<strong>HomeMatch removed the stress of me having to randomly select renovation firms from the internet</strong>, and gave me peace of mind, knowing that I'm dealing with credible, Casetrust accredited renovation firms. I would recommend all homeowners to contact HomeMatch for their renovation requirements.`,
    first: true,
  },
  {
    href: "https://maps.app.goo.gl/RgDd3GKV7VEHsZD5A",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/682b49ef6f70a7c38d73b8cd_g-KP.png",
    name: "K P",
    text: `I really do recommend HomeMatch if you're planning renovation for the first time. <strong>Better than reading forums or google results</strong> and getting confused and worried the more you research 💀`,
    first: true,
  },
  {
    href: "https://maps.app.goo.gl/3bwuQLGtjiDZJLwQA",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67d8f6a7289e288d2f70de8d_g-conniehon.png",
    name: "Connie Hon",
    text: `<strong>Nobody around us could recommend a good ID - it was almost like they didn't exist</strong> - so we started our search on Google. HomeMatch came across as a no brainer for us to try because of their case trust accredited IDs, clear outline of their services and the fact that they came at no cost to us.`,
    first: true,
  },
  {
    href: "https://maps.app.goo.gl/hn4xQV1o8phQqtaR7",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6765564986675b26158cc0f6_google_s.png",
    name: "Steven Hoe",
    text: `<strong>Saved me alot of trouble and time</strong> to find renovators. Great service and most importantly is FREE. <strong>If i have the money, i'll pay them for the service.</strong> Just a simple phone conversation and regina gave me 5 contacts for casetrust contractors.`,
    first: true,
  },
  {
    href: "https://maps.app.goo.gl/pMQWui8jLxsJhDoA8",
    pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66f2b955760bcd7636ea6cfb_Google_J_Brown.png",
    name: "Jeslyn Tien",
    text: `HomeMatch <strong>recommended specific interior designers and not just the firms</strong>. I always believe the interior designer matters a lot as much as you want a reputable firm, so <strong>it's great I get to see the ID's portfolio online!</strong>`,
    first: true,
  },
];

export default function GoogleReviews() {
  return (
    <div className="company-project-preview-wrapper reviews home">
      <div className="firm-proj-div newsletter-form new firm preview">
        {reviews.map((r, i) => (
          <a
            key={i}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-block preview reviews${r.first ? " first" : ""} w-inline-block`}
          >
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd79221c85fee7c34d8a9d_google_g_icon_download.avif"
              loading="lazy"
              alt=""
              width={20}
              height={20}
              className="company-review-platform-logo google absolute"
            />
            <div className="company-review-header-wrapper">
              <Image
                src={r.pic}
                loading="lazy"
                alt=""
                width={40}
                height={40}
                className="company-reviewer-pic"
              />
              <div className="company-review-text">
                <strong className="bold-text-50">{r.name}</strong>
              </div>
            </div>
            <div className="company-review-details-wrapper">
              <Image
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg"
                loading="lazy"
                alt=""
                width={80}
                height={16}
                className="company-review-score"
              />
            </div>
            <div
              className="company-review-text text"
              dangerouslySetInnerHTML={{ __html: r.text }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
