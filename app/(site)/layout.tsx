import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityFetch<any>(siteSettingsQuery);

  return (
    <>
      <Header logo={settings?.logo} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
