import Image from "next/image";

export default function TestimonialBanner() {
  const pressLogos = [
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6509c178a7888aa5451196a0_cna.avif", alt: "CNA" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66e43500d7645cd47304fa3f_Straits%20Times%20Icon%20bw.png", alt: "Straits Times" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66e434fb98f18b6a5f67259b_today%20bw.png", alt: "Today" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6819c7ecd0c761d8593a8e0d_BT.avif", alt: "Business Times" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6819c88d01e5b4ee0e3f6421_shinmin.png", alt: "Shin Min" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6819c907d6c859588c1a886b_moneyfm.png", alt: "MoneyFM" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65450b2492eb3d1c859e155c_asiaone.svg", alt: "AsiaOne" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65450b24d622edbaedf5070c_yahoo.png", alt: "Yahoo" },
  ];

  const testimonialPhotos1 = [
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67b04aa020d4f92fc27a66fc_flipstone.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d7ab7a863bac00926043f3_422%20Northshore%20Drive%20-%20M2%20BenSC_8889.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d7ab7a918309c60e66c00c_Pasir%20Ris%20-%20Molecule%20Elden%20(4).avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67b04aa0ac26ee049c2b3742_forefront.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b78531f66f0783bfcf517_luova%2C%20krystin%2C%20wabi.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b78531c734799d3843638_Dyel%2C%20curavtures.avif", alt: "" },
  ];

  const testimonialPhotos2 = [
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d7ab7a5f094f6767e421de_32%20Penhas%20Road%20-%20Goodman%20Nick%20(4).avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67b04aa0563981b63f96d1fa_lime3.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d7ab7ad1adc03c559487e2_Tampines%20Green%20Bloom%20%20-%20Homies%20ZhilingST08461-Edit-Edit.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b7853f9b36a60272b4a29_dic%2C%20akemi%2C%20eclectic.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67b04b31cf04327d7140f19a_juz.avif", alt: "" },
    { src: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b7854706bf733545a9ce2_PRDT%2C%20Quiet%20Lux.avif", alt: "" },
  ];

  return (
    <div className="testimonial-div">
      {/* CaseTrust Banner */}
      <div className="casetrust-wrapper com">
        <Image
          src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg"
          alt="HomeMatch CaseTrust-backed renovators and contractors"
          width={120}
          height={50}
          className="casetrust-logo"
        />
        <p className="d-p d-smallp top-banner">The Official Marketing Partner of CaseTrust</p>
      </div>

      {/* Press logos */}
      <div className="features-div">
        <div className="features-logo-wrapper">
          <p className="featured-text">Seen on:</p>
          {pressLogos.map((logo, i) => (
            <Image key={i} loading="lazy" src={logo.src} alt={logo.alt} width={60} height={30} className="feature-logo" />
          ))}
        </div>
      </div>

      {/* Google reviews */}
      <div className="googlereviews-div">
        <a href="https://maps.app.goo.gl/c1gpDw5AxYg8BGB86" target="_blank" rel="noopener noreferrer" className="google-reviews-wrapper stylish w-inline-block">
          <Image loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd79221c85fee7c34d8a9d_google_g_icon_download.avif" alt="" width={24} height={24} className="google-reviewsicon" />
          <div className="google-black stylish">Google</div>
          <Image loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" alt="" width={80} height={16} className="google-stars stylish" />
          <div className="google-gray stylish">4.9 Stars | 700+ reviews</div>
        </a>
      </div>

      {/* Desktop testimonial photo grids */}
      <div className="testimonial-grid">
        {testimonialPhotos1.slice(0, 3).map((p, i) => (
          <Image key={i} src={p.src} loading="lazy" alt={p.alt} width={400} height={300} className="testimonial-photo" />
        ))}

        {/* Testimonial card 1 — Gabrielle */}
        <a href="https://share.google/5zxQ1BR7MG5slYeEO" target="_blank" rel="noopener noreferrer" className="testimonial-card w-inline-block">
          <div className="testimonial-info">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d745db737d36631bab5067_quotes.svg" loading="lazy" alt="" width={24} height={24} className="testimonial-image" />
            <p className="testimonial-headline">I was quite nervous and lost</p>
          </div>
          <p className="d-p testimonial">Before I contacted HomeMatch, I had obtained some quotes from IDs by referrals from colleagues and retailers. Most of them didn&#x27;t match what I need. HomeMatch helped me to connect with relevant renovators based on my criteria. I like that they call and talk to homeowners first to understand their situation instead of relying on online answers. I&#x27;m thankful for this service which saves us time and inconveniences.</p>
          <div className="testimonial-reviewer-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68806668021ff7f6e7e73d0b_g-jenniferlee.png" loading="lazy" alt="" width={40} height={40} className="testimonial-profile" />
            <h3 className="d-h testimonial-author">Gabrielle</h3>
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" loading="lazy" alt="" width={80} height={16} className="google-stars" />
          </div>
        </a>

        {testimonialPhotos1.slice(3).map((p, i) => (
          <Image key={i} src={p.src} loading="lazy" alt={p.alt} width={400} height={300} className="testimonial-photo" />
        ))}
      </div>

      {/* 2nd testimonial grid — Marcus */}
      <div className="testimonial-grid _2nd">
        {testimonialPhotos2.slice(0, 3).map((p, i) => (
          <Image key={i} src={p.src} loading="lazy" alt={p.alt} width={400} height={300} className="testimonial-photo" />
        ))}

        <a href="https://g.co/kgs/ip86R6" target="_blank" rel="noopener noreferrer" className="testimonial-card w-inline-block">
          <div className="testimonial-info">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d745db737d36631bab5067_quotes.svg" loading="lazy" alt="" width={24} height={24} className="testimonial-image" />
            <p className="testimonial-headline">Matching more accurate than other platforms</p>
          </div>
          <p className="d-p testimonial">I tried Homematch&#x27;s platform to search for potential IDs for my upcoming home renovation. The platform is very easy to use and the matching process is much more detailed and accurate compared to other platforms. Furthermore, Homematch differentiates from other competitors in that they match you with a specific ID, rather than just the firm, and this is very important as a firm&#x27;s standard does not automatically guarantee the standard all IDs in the firm. Highly recommended for all new homeowners to try their platform to kickstart the search for potential IDs!</p>
          <div className="testimonial-reviewer-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6509cd295fd13fda51aa203f_marcus.png" loading="lazy" alt="" width={40} height={40} className="testimonial-profile" />
            <h3 className="d-h testimonial-author">Marcus</h3>
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" loading="lazy" alt="" width={80} height={16} className="google-stars" />
          </div>
        </a>

        {testimonialPhotos2.slice(3).map((p, i) => (
          <Image key={i} src={p.src} loading="lazy" alt={p.alt} width={400} height={300} className="testimonial-photo" />
        ))}
      </div>

      {/* 3rd testimonial grid — Adeline */}
      <div className="testimonial-grid _2nd">
        <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b785a42c819558d1858fc_U-home.avif" loading="lazy" alt="" width={400} height={300} className="testimonial-photo" />
        <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b785368f426830269d884_Forefront%20midcen.avif" loading="lazy" alt="" width={400} height={300} className="testimonial-photo" />

        <a href="https://g.co/kgs/VGKH2r" target="_blank" rel="noopener noreferrer" className="testimonial-card w-inline-block">
          <div className="testimonial-info">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d745db737d36631bab5067_quotes.svg" loading="lazy" alt="" width={24} height={24} className="testimonial-image" />
            <p className="testimonial-headline">Saves time. Huge varieties of experienced Renovators</p>
          </div>
          <p className="d-p testimonial">HomeMatch is an easy platform for us to use because they connect with huge varieties of experienced designer who works together so we don&#x27;t have to find a designer individually which often cause a lot of time. HomeMatch also provide consultant who is helpful to us by engaging with us to see what we need and the consultant kindly give us idea and information as we do not have any idea what we really want before matching us with designers. The HomeMatch consultant will also do a followed up and check on the progress. Thank you HomeMatch! Will recommend your platform to my friends if they need renovation!</p>
          <div className="testimonial-reviewer-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6509cd28144c55d497e57bd2_adeline.png" loading="lazy" alt="" width={40} height={40} className="testimonial-profile" />
            <h3 className="d-h testimonial-author">Adeline Lee</h3>
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" loading="lazy" alt="" width={80} height={16} className="google-stars" />
          </div>
        </a>

        <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b7853bdc285e30c4dd014_starry%2C%20jo%2C%20coastal.avif" loading="lazy" alt="" width={400} height={300} className="testimonial-photo" />
        <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/663b7853b0326c11107803a0_alchemist%2C%20bauhaus1.avif" loading="lazy" alt="" width={400} height={300} className="testimonial-photo" />
        <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/640219407b31aa9e197e98b6_753823ds2711.avif" loading="lazy" alt="" width={400} height={300} className="testimonial-photo" />
      </div>
    </div>
  );
}
