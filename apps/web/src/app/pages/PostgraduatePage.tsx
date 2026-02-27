import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { HonoursRoadmaps } from '../components/HonoursRoadmaps';

const campusBackground = '/background.jpg';

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

function BulletListNested({
  text,
  nested,
  nestedAfterIndex = 3,
}: {
  text: string;
  nested: string;
  nestedAfterIndex?: number;
}) {
  const items = text.split('\n').filter(Boolean);
  const nestedItems = nested.split('\n').filter(Boolean);
  if (items.length === 0) return null;
  return (
    <ul className="list-disc pl-6 space-y-1 my-3 text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>
          {item}
          {i === nestedAfterIndex && nestedItems.length > 0 && (
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {nestedItems.map((n, j) => (
                <li key={j}>{n}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export function PostgraduatePage() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden min-h-[650px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    {t('study.postgradHeroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]" />
                </div>
              </div>
              <h1 className="font-['Spectral'] text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight">
                {t('study.postgradHeroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-light">
                {t('study.postgradHeroSub')}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Prospective Students CTA */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link
            to="/study/postgraduate/prospective-students"
            className="flex items-center justify-between gap-4 p-6 rounded-xl bg-[#7B1E3A] text-white shadow-lg hover:shadow-xl transition-all hover:opacity-95"
          >
            <span className="font-['Playfair_Display'] text-lg font-semibold">
              {t('study.postgrad.prospectiveStudentsCta')}
            </span>
            <ArrowRight className="w-6 h-6 flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* Honours in Computer Science */}
      <section
        id="honours"
        className="py-16 md:py-20 bg-muted/50"
        aria-labelledby="honours-title"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2
              id="honours-title"
              className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground"
            >
              {t('study.postgrad.honours.title')}
            </h2>

            {/* Banner: Collage of student faces – no images; styled placeholder */}
            <div
              className="rounded-xl overflow-hidden bg-muted border border-border min-h-[120px] flex items-center justify-center"
              aria-label={t('study.postgrad.honours.bannerLabel')}
            >
              <span className="text-muted-foreground font-medium text-lg">
                {t('study.postgrad.honours.bannerPlaceholder')}
              </span>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {t('study.postgrad.honours.desc1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('study.postgrad.honoursDesc2Before')}
                <Link
                  to="/study/postgraduate/prospective-students"
                  className="text-primary font-medium hover:underline"
                >
                  {t('study.postgrad.prospectiveLinkText')}
                </Link>
                {t('study.postgrad.honoursDesc2After')}
              </p>
            </div>

            {/* Curriculum */}
            <div className="space-y-4">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground">
                {t('study.postgrad.honours.curriculumTitle')}
              </h3>
              <BulletList text={t('study.postgrad.honours.curriculumIntro')} />
              <div>
                <h4 className="font-semibold text-foreground mt-4 mb-2">
                  {t('study.postgrad.honours.projectTitle')}
                </h4>
                <BulletList text={t('study.postgrad.honours.projectBullets')} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mt-4 mb-2">
                  {t('study.postgrad.honours.electiveTitle')}
                </h4>
                <BulletList text={t('study.postgrad.honours.electiveBullets')} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mt-4 mb-2">
                  {t('study.postgrad.honours.studyPathTitle')}
                </h4>
                <BulletList text={t('study.postgrad.honours.studyPathBullets')} />
              </div>
            </div>

            {/* Honours Roadmaps */}
            <HonoursRoadmaps />

            {/* Class of 2026 – card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground">
                {t('study.postgrad.honours.class2026Title')}
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-medium text-foreground text-sm">
                    {t('study.postgrad.honours.modules2026Label')}
                  </dt>
                </div>
                <div>
                  <dt className="font-medium text-foreground text-sm">
                    {t('study.postgrad.honours.projects2026Label')}
                  </dt>
                  <dd className="text-muted-foreground text-sm mt-0.5">
                    {t('study.postgrad.honours.projects2026Text')}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground text-sm">
                    {t('study.postgrad.honours.finalAcceptLabel')}
                  </dt>
                  <dd className="text-muted-foreground text-sm mt-0.5">
                    {t('study.postgrad.honours.finalAcceptText')}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground text-sm">
                    {t('study.postgrad.honours.demiLabel')}
                  </dt>
                  <dd className="text-muted-foreground text-sm mt-0.5">
                    {t('study.postgrad.honours.demiText')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Important Dates */}
            <div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground mb-3">
                {t('study.postgrad.honours.importantDatesTitle')}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t('study.postgrad.honours.date1')}</li>
                <li>{t('study.postgrad.honours.date2')}</li>
                <li>{t('study.postgrad.honours.date3')}</li>
              </ul>
            </div>

            {/* Class schedules */}
            <div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground mb-2">
                {t('study.postgrad.honours.schedulesTitle')}
              </h3>
              <p className="text-muted-foreground">
                {t('study.postgrad.honours.schedulesText')}
              </p>
            </div>

            {/* Resources – styled as disabled link list */}
            <div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground mb-3">
                {t('study.postgrad.honours.resourcesTitle')}
              </h3>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <li key={i}>
                    <span
                      className="text-muted-foreground cursor-default hover:no-underline"
                      aria-disabled
                    >
                      {t(`study.postgrad.honours.resource${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Masters in Computer Science */}
      <section
        id="masters"
        className="py-16 md:py-20 bg-background"
        aria-labelledby="masters-title"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2
              id="masters-title"
              className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground"
            >
              {t('study.postgrad.masters.title')}
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              {t('study.postgrad.masters.desc1')}
            </p>

            <div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground mb-2">
                {t('study.postgrad.masters.supervisionTitle')}
              </h3>
              <BulletList text={t('study.postgrad.masters.supervisionBullets')} />
            </div>

            <div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground mb-2">
                {t('study.postgrad.masters.admissionTitle')}
              </h3>
              <BulletList text={t('study.postgrad.mastersAdmissionBulletsWithoutLast')} />
              <ul className="list-disc pl-6 space-y-1 my-3 text-muted-foreground">
                <li>
                  {t('study.postgrad.mastersAdmissionBulletFurtherPrefix')}
                  <Link
                    to="/study/postgraduate/prospective-students"
                    className="text-primary font-medium hover:underline"
                  >
                    {t('study.postgrad.prospectiveLinkText')}
                  </Link>
                  {t('study.postgrad.mastersAdmissionBulletFurtherSuffix')}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctorate in Computer Science */}
      <section
        id="doctorate"
        className="py-16 md:py-20 bg-muted/50"
        aria-labelledby="doctorate-title"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2
              id="doctorate-title"
              className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground"
            >
              {t('study.postgrad.doctorate.title')}
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              {t('study.postgrad.doctorate.desc1')}
            </p>

            <div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground mb-2">
                {t('study.postgrad.doctorate.supervisionTitle')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('study.postgrad.doctorate.supervisionText')}
              </p>
            </div>

            <div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground mb-2">
                {t('study.postgrad.doctorate.admissionTitle')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('study.postgrad.doctorateAdmissionTextBefore')}
                <Link
                  to="/study/postgraduate/prospective-students"
                  className="text-primary font-medium hover:underline"
                >
                  {t('study.postgrad.prospectiveLinkText')}
                </Link>
                {t('study.postgrad.doctorateAdmissionTextAfter')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Postgraduate Studies in Computer Science - FAQ */}
      <section
        className="py-16 md:py-20 bg-background"
        aria-labelledby="postgrad-main-title"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2
              id="postgrad-main-title"
              className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground mb-2"
            >
              {t('study.postgrad.mainTitle')}
            </h2>
            <div className="h-1 w-16 bg-[#C8A951] rounded-full" />
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {/* Section 1: Entry requirements */}
            <AccordionItem value="entry-requirements" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('study.postgrad.s1Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-6 pb-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('study.postgrad.s1Intro')}
                  </p>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s1HonoursTitle')}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      {t('study.postgrad.s1HonoursIntro')}
                    </p>
                    <BulletListNested
                      text={t('study.postgrad.s1HonoursBullets')}
                      nested={t('study.postgrad.s1QuantitativeList')}
                    />
                    <p className="text-muted-foreground text-sm italic mt-2">
                      {t('study.postgrad.s1HonoursNote')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s1IndividualTitle')}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      {t('study.postgrad.s1IndividualIntro')}
                    </p>
                    <BulletList text={t('study.postgrad.s1IndividualBullets')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s1MastersTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s1MastersBullets')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s1DoctoralTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s1DoctoralBullets')} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: How do I apply? */}
            <AccordionItem value="how-to-apply" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('study.postgrad.s2Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-6 pb-2">
                  <div>
                    <h3 className="font-semibold text-foreground mt-2 mb-2">
                      {t('study.postgrad.s2Step1Title')}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {t('study.postgrad.s2Step1Intro')}
                    </p>
                    <BulletList text={t('study.postgrad.s2Step1Instructions')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s2Step2Title')}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {t('study.postgrad.s2Step2Intro')}
                    </p>
                    <p className="font-medium text-foreground text-sm mt-3">
                      {t('study.postgrad.s2PortalsTitle')}
                    </p>
                    <BulletList text={t('study.postgrad.s2Portals')} />
                    <p className="font-medium text-foreground text-sm mt-3">
                      {t('study.postgrad.s2ClosingTitle')}
                    </p>
                    <BulletList text={t('study.postgrad.s2Closing')} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Part-time / foreign students */}
            <AccordionItem value="part-time-foreign" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('study.postgrad.s3Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-6 pb-2">
                  <div>
                    <h3 className="font-semibold text-foreground mt-2 mb-2">
                      {t('study.postgrad.s3PartTimeTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s3PartTimeBullets')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s3HonoursSpecificTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s3HonoursSpecificBullets')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s3ForeignTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s3ForeignBullets')} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Costs and financial support */}
            <AccordionItem value="costs-funding" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('study.postgrad.s4Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-6 pb-2">
                  <BulletList text={t('study.postgrad.s4Bullets')} />
                  <div>
                    <h3 className="font-semibold text-foreground mt-2 mb-2">
                      {t('study.postgrad.s4TeachingTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s4TeachingBullets')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s4SupervisorTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s4SupervisorBullets')} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5: Prerequisites for individual PG modules */}
            <AccordionItem value="prerequisites" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('study.postgrad.s5Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-6 pb-2">
                  <p className="text-muted-foreground">
                    {t('study.postgrad.s5AllHonoursIntro')}
                  </p>
                  <BulletList text={t('study.postgrad.s5AllHonoursBullets')} />
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s5DigitalTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s5DigitalBullets')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mt-4 mb-2">
                      {t('study.postgrad.s5VisionTitle')}
                    </h3>
                    <BulletList text={t('study.postgrad.s5VisionBullets')} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 6: One-year structured MSc ML and AI */}
            <AccordionItem value="msc-ml-ai" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('study.postgrad.s6Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="space-y-3 pb-2">
                  <p className="text-muted-foreground">
                    {t('study.postgrad.s6Intro')}
                  </p>
                  <a
                    href="https://mlai.sun.ac.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline break-all"
                  >
                    {t('study.postgrad.s6Url')}
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 7: Where to find more information */}
            <AccordionItem value="more-info" className="border-border">
              <AccordionTrigger className="text-left font-['Playfair_Display'] text-lg font-semibold py-5 hover:no-underline">
                {t('study.postgrad.s7Title')}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="pb-2">
                  <p className="font-semibold text-foreground mb-1">
                    {t('study.postgrad.s7Contact')}
                  </p>
                  <a
                    href="mailto:postgrad@cs.sun.ac.za"
                    className="text-primary hover:underline break-all"
                  >
                    {t('study.postgrad.s7Email')}
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section
        id="apply"
        className="py-20 bg-gradient-to-br from-[#7B1E3A] to-[#0B1C2D] text-white"
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
              {t('study.postgrad.applyCtaTitle')}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t('study.postgrad.applyCtaSub')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.sun.ac.za/english/postgraduate-programmes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
              >
                {t('study.postgrad.applyOnline')}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all duration-300"
              >
                {t('study.postgrad.contactAdmissions')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
