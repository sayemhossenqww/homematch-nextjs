import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-div footer">
        <div className="social-wrapper footer">
          <a
            href="https://www.instagram.com/homematch.sg/"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-social-icon-link w-inline-block"
          >
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637611d3c0c96d84fbc1b2dd_insta.svg"
              loading="lazy"
              alt="HomeMatch Instagram"
              width={24}
              height={24}
              className="menu-social-icons"
            />
          </a>
          <a
            href="https://hello.homematch.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-social-icon-link w-inline-block"
          >
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637611d290751efd5ae85449_mail.svg"
              loading="lazy"
              alt="HomeMatch Email"
              width={24}
              height={24}
              className="menu-social-icons"
            />
          </a>
        </div>
      </div>

      <div className="sitelinks-div footer">
        <Link href="/about" className="site-links">
          About Us
        </Link>
        <Link href="/terms-of-use" className="site-links">
          Terms of Use
        </Link>
        <Link href="/privacy-policy" className="site-links">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
