import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import campusBackground from 'figma:asset/aa35fdae5d39aef96d1ba77e86c445c1cc5e4dc4.png';

export function ContactPage() {
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
                    Get in Touch
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                Contact Us
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                We're here to answer your questions and support your journey
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
                Get In Touch
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a prospective student, current student, or industry partner, we'd love to hear from you.
              </p>

              <div className="space-y-6">
                {/* Department Office */}
                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Department Office</h3>
                    <p className="text-muted-foreground text-sm">
                      Department of Computer Science<br />
                      Stellenbosch University<br />
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
                    <h3 className="font-semibold text-foreground mb-2">Email Contacts</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">General:</span>{' '}
                        <a href="mailto:cs@sun.ac.za" className="text-primary hover:underline">
                          cs@sun.ac.za
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Undergraduate:</span>{' '}
                        <a href="mailto:undergrad.cs@sun.ac.za" className="text-primary hover:underline">
                          undergrad.cs@sun.ac.za
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Postgraduate:</span>{' '}
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
                    <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">+27 21 808 4232</p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                    <p className="text-muted-foreground text-sm">
                      Monday - Friday: 08:00 - 16:30<br />
                      Closed on weekends and public holidays
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
                  Send us a Message
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Enquiry Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Select an option</option>
                      <option value="undergraduate">Undergraduate Admissions</option>
                      <option value="postgraduate">Postgraduate Admissions</option>
                      <option value="research">Research Collaboration</option>
                      <option value="general">General Enquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Find Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Located in the heart of Stellenbosch
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map would be embedded here</p>
                  <a
                    href="https://www.google.com/maps/place/Stellenbosch+University"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}