import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";
import { readAskGuide } from "@/lib/guideContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides
    .filter((g) => g.section === "ask")
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug && g.section === "ask");
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
    },
    alternates: {
      canonical: `https://www.homematch.sg/ask/${slug}`,
    },
  };
}

export default async function AskArticle({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug && g.section === "ask");
  if (!guide) notFound();

  // Related reads from same categories
  const relatedGuides = guides
    .filter(
      (g) =>
        g.slug !== slug &&
        g.categories.some((c) => guide.categories.includes(c) && c !== "All")
    )
    .slice(0, 3);

  // Must-reads sidebar
  const mustReads = guides.filter((g) => g.slug !== slug).slice(0, 8);

  // Extract full blog-content-div from base HTML
  const contentHtml = await readAskGuide(slug);

  return (
    <>
      {/* Progress bar */}
      <div className="blog-progressbar-wrapper">
        <div className="blog-progressbar"></div>
      </div>

      <section className="blog-container">
        <main className="blog-contentwrapper">
          {/* Article header */}
          <header className="blog-header-div">
            <div className="blog-header-details-div">
              <Link href="/guides" className="ad-bu blog w-button">
                &lt; All Guides
              </Link>
            </div>
            <h1 className="blog-h1">{guide.title}</h1>
            <p className="blog-readtime">{guide.readTime}</p>
          </header>

          {/* Full article body — extracted from base HTML */}
          {contentHtml ? (
            <aside
              className="blog-content-div"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <aside className="blog-content-div">
              <main className="blog-rich custom-rich-text w-richtext">
                <p>{guide.excerpt}</p>
                <p>
                  Read the full guide at{" "}
                  <a
                    href={`https://www.homematch.sg/ask/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    homematch.sg
                  </a>
                  .
                </p>
              </main>
            </aside>
          )}

          {/* Bottom recommended reads */}
          <aside className="blog-bar-wrapper bottom">
            <div className="casetrust-wrapper crl-case blog btm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg"
                alt="HomeMatch CaseTrust-backed renovators and contractors"
                className="casetrust-logo"
              />
              <p className="d-p d-smallp top-banner blog">
                HomeMatch is The Official Marketing Partner of CaseTrust
              </p>
            </div>

            <h2 className="heading-2">Recommended Reads</h2>
            <div className="recommended-articles-div">
              <div className="collection-list-wrapper-12 w-dyn-list">
                <div role="list" className="blog-collectionlist bottom w-dyn-items">
                  {relatedGuides.map((g) => (
                    <div
                      key={g.slug}
                      role="listitem"
                      className="blog-collectionitem bottom w-dyn-item"
                    >
                      <Link
                        href={`/${g.section}/${g.slug}`}
                        className="reco-reads w-inline-block"
                      >
                        <div className="text-block-15">{g.readTime}</div>
                        <p className="reco-reads-text">{g.title}</p>
                        <div className="text-block-14">{g.excerpt}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/guides" className="ad-bu blog w-button">
              View More &gt;
            </Link>
          </aside>
        </main>

        {/* Sidebar */}
        <div className="blog-bar-div">
          <div className="casetrust-wrapper crl-case blog">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg"
              alt="HomeMatch CaseTrust-backed renovators and contractors"
              className="casetrust-logo"
            />
            <p className="d-p d-smallp top-banner blog top">
              HomeMatch is The Official Marketing Partner of CaseTrust
            </p>
          </div>

          <aside id="crl-help" className="crl-cta-div blog crl early-cta lm lite">
            <div className="lm-wrapper lite">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68e7d137bf0a734f03359269_Asset%2058.svg"
                loading="lazy"
                alt=""
                className="sprites static lite"
              />
              <div className="lm-innerwrapper">
                <div className="d-h crl-cta-copy blog early-cta lm lite">
                  Renovating Soon?
                </div>
              </div>
            </div>
            <a
              href="https://get.homematch.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="d-button crl-cta early-cta lm lite w-button"
            >
              Match Now!
            </a>
          </aside>

          <aside id="crl-help" className="crl-cta-div blog crl early-cta lite">
            <div className="crl-cta-copy post early-cta lite">
              <div className="early-cta-header-div lite">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68e78df56d63ef0ecce47f8d_Toktok%20Flag.svg"
                  alt=""
                  className="sprites lite"
                />
                <div className="d-h crl-cta-copy blog early-cta lite">
                  Reserve Your Reno Protections ASAP!
                </div>
              </div>
              <div className="d-p crl crl-cta-copy blog early-cta lite">
                ^Even if you&#x27;re not renovating yet
              </div>
              <div className="early-cta">
                <a
                  href="https://secure.homematch.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-button crl-cta early-cta lite reserve w-button"
                >
                  Reserve Guarantees!
                </a>
              </div>
            </div>
          </aside>

          <div className="must-read">
            <h2 className="heading-2">Must-Knows:</h2>
            <div className="collection-list-wrapper-12 w-dyn-list">
              <div role="list" className="blog-collectionlist w-dyn-items">
                {mustReads.map((g) => (
                  <div
                    key={g.slug}
                    role="listitem"
                    className="blog-collectionitem w-dyn-item"
                  >
                    <Link
                      href={`/${g.section}/${g.slug}`}
                      className="reco-reads side w-inline-block"
                    >
                      <div className="text-block-15">{g.readTime}</div>
                      <p className="reco-reads-text side">{g.title}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
