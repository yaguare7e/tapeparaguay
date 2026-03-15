import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/sections/whatsapp-fab";
import { TawkProvider } from "@/components/providers/tawk-provider";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFab />
        <TawkProvider />
        <AnalyticsProvider />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
