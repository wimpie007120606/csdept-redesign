import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { useTranslation } from '@/i18n/useTranslation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const PROSPECTIVE_STUDENTS_PATH = '/study/postgraduate/prospective-students';

function BulletList({ text }: { text: string }) {
  const items = text.split('\n').filter(Boolean);
  if (items.length === 0) return null;
  return (
    <ul className="list-disc pl-6 space-y-1 my-3 text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function ProspectiveStudentsPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      <section className="py-16 md:py-20 bg-background" aria-labelledby="prospective-title">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <LocalizedLink
              to="/study/postgraduate"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
            >
              {t('prospectivePage.backToPostgraduate')}
            </LocalizedLink>
            <h1
              id="prospective-title"
              className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground mb-2"
            >
              {t('prospectivePage.title')}
            </h1>
            <div className="h-1 w-16 bg-[#C8A951] rounded-full" />
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="s1" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('prospectivePage.s1Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-4 pb-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s1Intro')}
                  </p>
                  <p className="text-muted-foreground">
                    {t('prospectivePage.s1HonoursIntro')}
                  </p>
                  <BulletList text={t('prospectivePage.s1HonoursBullets')} />
                  <p className="text-muted-foreground text-sm italic">
                    {t('prospectivePage.s1Note')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s1IndividualPara')}
                  </p>
                  <p className="text-muted-foreground">
                    {t('prospectivePage.s1Masters')}
                  </p>
                  <p className="text-muted-foreground">
                    {t('prospectivePage.s1Doctoral')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s2" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('prospectivePage.s2Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-4 pb-2">
                  <p className="text-muted-foreground font-medium">
                    {t('prospectivePage.s2Intro')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s2Step1')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s2Step2Intro')}
                  </p>
                  <BulletList text={t('prospectivePage.s2Portals')} />
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s2Closing')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s3" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('prospectivePage.s3Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-4 pb-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s3PartTimePara')}
                  </p>
                  <p className="text-muted-foreground font-medium">
                    {t('prospectivePage.s3HonoursNoteTitle')}
                  </p>
                  <BulletList text={t('prospectivePage.s3HonoursNoteBullets')} />
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s3ForeignPara')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s4" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('prospectivePage.s4Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-4 pb-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s4Para1')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s4Para2')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s4Para3')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s5" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('prospectivePage.s5Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-4 pb-2">
                  <p className="text-muted-foreground">
                    {t('prospectivePage.s5AllIntro')}
                  </p>
                  <BulletList text={t('prospectivePage.s5AllBullets')} />
                  <p className="text-muted-foreground font-medium mt-3">
                    {t('prospectivePage.s5DigitalTitle')}
                  </p>
                  <BulletList text={t('prospectivePage.s5DigitalBullets')} />
                  <p className="text-muted-foreground font-medium mt-3">
                    {t('prospectivePage.s5VisionTitle')}
                  </p>
                  <BulletList text={t('prospectivePage.s5VisionBullets')} />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s6" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('prospectivePage.s6Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="pb-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s6ParaBefore')}
                    <a
                      href="https://mlai.sun.ac.za"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      mlai.sun.ac.za
                    </a>
                    .
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s7" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('prospectivePage.s7Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="pb-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('prospectivePage.s7ParaBefore')}
                    <a
                      href="mailto:postgrad@cs.sun.ac.za"
                      className="text-primary hover:underline"
                    >
                      postgrad@cs.sun.ac.za
                    </a>
                    .
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}

export { PROSPECTIVE_STUDENTS_PATH };
