import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('privacyPage.metaTitle')} | {COMPANY_INFO.name}</title>
        <meta name="description" content={t('privacyPage.metaDescription')} />
        <link rel="canonical" href="https://rhinoremodeler.com/privacy-policy" />
      </Helmet>

      <Navbar />

      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                {t('privacyPage.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('privacyPage.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('privacyPage.effectiveDate', { date: 'February 13, 2026' })}
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
                {t('privacyPage.intro')}
              </p>

              {/* 1. Information We Collect */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.infoCollect.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.infoCollect.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('privacyPage.sections.infoCollect.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t('privacyPage.sections.infoCollect.autoCollect')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('privacyPage.sections.infoCollect.autoItems', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 2. How We Use Your Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.howWeUse.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.howWeUse.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('privacyPage.sections.howWeUse.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 3. SMS/Text Messaging */}
              <div className="mb-10 p-6 bg-accent/50 rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.sms.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.sms.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6 mb-4">
                  {(t('privacyPage.sections.sms.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.sms.optOut')}
                </p>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.sms.help')}
                </p>
                <p className="text-muted-foreground font-medium">
                  {t('privacyPage.sections.sms.consent')}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t('privacyPage.sections.sms.noSharing')}
                </p>
              </div>

              {/* 4. Cookies and Tracking */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.cookies.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.cookies.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('privacyPage.sections.cookies.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t('privacyPage.sections.cookies.manage')}
                </p>
              </div>

              {/* 5. Third-Party Services */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.thirdParty.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.thirdParty.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('privacyPage.sections.thirdParty.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t('privacyPage.sections.thirdParty.note')}
                </p>
              </div>

              {/* 6. Data Security */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.security.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.security.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('privacyPage.sections.security.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t('privacyPage.sections.security.disclaimer')}
                </p>
              </div>

              {/* 7. Your Rights */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.rights.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('privacyPage.sections.rights.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {(t('privacyPage.sections.rights.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t('privacyPage.sections.rights.howTo')}
                </p>
              </div>

              {/* 8. Children's Privacy */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.children.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('privacyPage.sections.children.description')}
                </p>
              </div>

              {/* 9. Changes to This Policy */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.changes.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('privacyPage.sections.changes.description')}
                </p>
              </div>

              {/* 10. Contact Us */}
              <div className="mb-10 p-6 bg-accent/50 rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('privacyPage.sections.contact.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('privacyPage.sections.contact.description')}
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

export default PrivacyPolicyPage;
