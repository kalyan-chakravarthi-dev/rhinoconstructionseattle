import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileText, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('termsPage.metaTitle')} | {COMPANY_INFO.name}</title>
        <meta name="description" content={t('termsPage.metaDescription')} />
        <link rel="canonical" href="https://rhinoremodeler.com/terms" />
      </Helmet>

      <Navbar />

      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileText className="h-4 w-4" />
                {t('termsPage.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('termsPage.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('termsPage.effectiveDate', { date: 'February 13, 2026' })}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              {/* Intro */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t('termsPage.intro')}
              </p>

              {/* 1. Acceptance of Terms */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.acceptance.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('termsPage.sections.acceptance.description')}
                </p>
              </div>

              {/* 2. Services Description */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.services.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('termsPage.sections.services.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('termsPage.sections.services.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t('termsPage.sections.services.note')}
                </p>
              </div>

              {/* 3. Estimates and Pricing */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.estimates.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('termsPage.sections.estimates.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('termsPage.sections.estimates.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 4. SMS Communications */}
              <div className="mb-10 p-6 bg-accent/50 rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.sms.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('termsPage.sections.sms.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6 mb-4">
                  {(t('termsPage.sections.sms.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mb-4 font-medium">
                  {t('termsPage.sections.sms.optOut')}
                </p>
                <p className="text-muted-foreground mb-4">
                  {t('termsPage.sections.sms.help')}
                </p>
                <p className="text-muted-foreground mb-2">
                  {t('termsPage.sections.sms.rates')}
                </p>
                <p className="text-muted-foreground">
                  {t('termsPage.sections.sms.carriers')}
                </p>
              </div>

              {/* 5. User Accounts */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.accounts.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('termsPage.sections.accounts.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('termsPage.sections.accounts.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 6. Intellectual Property */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.ip.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('termsPage.sections.ip.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('termsPage.sections.ip.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 7. Limitation of Liability */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.liability.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('termsPage.sections.liability.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('termsPage.sections.liability.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 8. Governing Law */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.governing.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('termsPage.sections.governing.description')}
                </p>
              </div>

              {/* 9. Changes to Terms */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.changes.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('termsPage.sections.changes.description')}
                </p>
              </div>

              {/* 10. Contact Us */}
              <div className="mb-10 p-6 bg-accent/50 rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('termsPage.sections.contact.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('termsPage.sections.contact.description')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t('common.email')}</div>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary hover:underline">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t('common.phone')}</div>
                      <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-primary hover:underline">
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t('common.address')}</div>
                      <span className="text-muted-foreground">
                        {COMPANY_INFO.name}<br />
                        {COMPANY_INFO.address.street}<br />
                        {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.zip}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={ROUTES.REQUEST_QUOTE}
                className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-8 py-3 text-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                {t('cta.button')}
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground text-primary-foreground px-8 py-3 text-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TermsPage;
