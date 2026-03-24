import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type FooterProps = {
  settings?: {
    logoFooter?: { asset: { _ref: string } } | null;
    siteName?: string;
    address?: string;
    phone?: string;
    contactEmail?: string;
    socialLinks?: { platform: string; url: string }[];
  } | null;
};

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-dark border-t-2 border-terra text-white py-16">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            {settings?.logoFooter ? (
              <Image
                src={urlFor(settings.logoFooter).width(140).url()}
                alt={settings?.siteName || "Kitao Catering"}
                width={140}
                height={36}
              />
            ) : (
              <span className="text-2xl font-serif">
                {settings?.siteName || "Kitao Catering"}
              </span>
            )}
          </div>

          <div>
            {settings?.address && (
              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
                {settings.address}
              </p>
            )}
            {settings?.phone && (
              <p className="mt-3 text-sm text-white/70">
                TEL: {settings.phone}
              </p>
            )}
            {settings?.contactEmail && (
              <p className="mt-1 text-sm text-white/70">
                Email: {settings.contactEmail}
              </p>
            )}
          </div>

          <div>
            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div className="flex gap-4">
                {settings.socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wider uppercase text-white/70 hover:text-white transition-colors"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/50 tracking-wider">
            &copy; {new Date().getFullYear()}{" "}
            {settings?.siteName || "Kitao Catering"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
