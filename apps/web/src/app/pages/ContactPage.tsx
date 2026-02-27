import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { LocationMapCard } from '../components/LocationMapCard';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/realbackground3.jpeg';

export function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden min-h-[650px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        {/* Refined Dark Overlay - more neutral, less pink/red */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Editorial Label with Divider */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    {t('contact.heroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                {t('contact.heroTitle')}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('contact.heroSub')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-6">
                {t('contact.getInTouch')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('contact.getInTouchSub')}
              </p>

              <div className="space-y-6">
                {/* Department Office */}
                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.departmentOffice')}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t('footer.addressLine1')}<br />
                      {t('footer.addressLine2')}<br />
                      Private Bag X1<br />
                      Matieland, 7602<br />
                      South Africa
                    </p>
                  </div>
                </div>

                {/* General Enquiries */}
                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.emailContacts')}</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t('contact.general')}:</span>{' '}
                        <a href="mailto:cs@sun.ac.za" className="text-primary hover:underline">
                          cs@sun.ac.za
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('contact.undergraduate')}:</span>{' '}
                        <a href="mailto:undergrad.cs@sun.ac.za" className="text-primary hover:underline">
                          undergrad.cs@sun.ac.za
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('contact.postgraduate')}:</span>{' '}
                        <a href="mailto:postgrad.cs@sun.ac.za" className="text-primary hover:underline">
                          postgrad.cs@sun.ac.za
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.phone')}</h3>
                    <p className="text-muted-foreground text-sm">+27 21 808 4232</p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.officeHours')}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t('contact.officeHoursDetail')}<br />
                      {t('contact.closedHours')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl shadow-xl p-8">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-6">
                  {t('contact.sendMessage')}
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        {t('contact.firstName')} *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder={t('contact.placeholderFirstName')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        {t('contact.lastName')} *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder={t('contact.placeholderLastName')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t('contact.emailAddress')} *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder={t('contact.placeholderEmail')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t('contact.enquiryType')} *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">{t('contact.selectOption')}</option>
                      <option value="undergraduate">{t('contact.enquiryUndergraduate')}</option>
                      <option value="postgraduate">{t('contact.enquiryPostgraduate')}</option>
                      <option value="research">{t('contact.enquiryResearch')}</option>
                      <option value="general">{t('contact.enquiryGeneral')}</option>
                      <option value="other">{t('contact.enquiryOther')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder={t('contact.placeholderMessage')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t('contact.sendButton')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted" aria-labelledby="find-us-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="find-us-heading" className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              {t('contact.findUs')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('contact.findUsSub')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <LocationMapCard />
          </motion.div>
        </div>
      </section>
    </div>
  );
}