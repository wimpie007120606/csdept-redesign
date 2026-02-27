import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';

const heroBackground = '/background.jpg';

const objectives = [
  'attracting computer scientists who conduct research in software engineering and who are interested in providing a consultation service to industry',
  'establishing and maintaining international contacts in areas relevant to software development',
  'providing an effective environment for training postgraduate students capable of developing reliable system software',
  'undertaking joint projects with industry in areas such as embedded software development, testing and verification, protocol design and implementation, design of concurrent systems, compilers and design of special purpose languages, device drivers, etc.',
  'developing specialised software for industry',
  'undertaking technical investigations on request',
  'presenting short courses to industry on request',
];

const members = [
  'Prof Willem Visser (Director)',
  'Prof Jaco Geldenhuys',
  'Prof AE Krzesinski',
];

const pastProjects = [
  'During 1999 – 2014 several courses were presented to industry. The most significant such course series was a four-day programming bootcamp presented 2012–2015 for CapaCITI (an IT initiative of the City of Cape Town).',
  'During 1997 – 1998 a kernel was developed to support protocol stacks on low-powered embedded computing platforms. This kernel was taken over by the South African company SAN People and refined further to support various protocol stacks on embedded devices.',
  'In 1994 the Gneiss microkernel was developed as an improved version of the Hybrid kernel. The Gneiss kernel was used by Spescom-DataVoice to develop a digital voice recording system. This product is marketed locally and internationally and various device drivers were developed for Gneiss to support new device controllers as required.',
  'The Hybrid microkernel was developed during 1990 – 1991. This kernel was designed to support client-server based applications in a distributed environment. The Hybrid kernel was used for developing a distributed application to monitor manufacturing processes in a number of local factories.',
  'In 1988 the Institute was commisioned by the South African company Technology Systems Manufacturing to port Tanenbaum\'s MINIX system (a Unix-like operating system) to a Data General minicomputer. The goal was to develop local expertise in system programming.',
  'During 1988 – 1993 software was developed for Telkom SA to configure, monitor, optimise and analyse some of their networks.',
  'SNAP, a package to model and analyse stochastic queueing networks, was developed during 1978 – 1985. It was used mainly to predict the performance of IBM mainframe computer systems. The package was sold to UCCEL Corporation in 1985.',
];

export function InstituteAppliedCSPage() {
  return (
    <div className="pt-20">
      <section
        className="relative py-28 text-white overflow-hidden min-h-[400px] flex items-center"
        aria-labelledby="institute-hero-title"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <LocalizedLink
                to="/links"
                className="text-sm text-white/80 hover:text-white transition-colors inline-block mb-2"
              >
                ← Links
              </LocalizedLink>
              <h1
                id="institute-hero-title"
                className="font-['Spectral'] text-4xl md:text-5xl font-semibold leading-tight"
              >
                Institute of Applied Computer Science
              </h1>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg dark:prose-invert max-w-none space-y-12"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              Welcome to the homepage of the Institute for Applied Computer Science at the University of Stellenbosch. The institute was founded in 1981 through the initiative of Prof AE Krzesinski and Prof PS Kritzinger.
            </p>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                Objectives
              </h2>
              <p className="text-muted-foreground mb-3">
                It is our goal to contribute towards the South African software industry by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                {objectives.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                Members
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                {members.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                Contact
              </h2>
              <address className="not-italic text-muted-foreground space-y-1">
                <p>Institute for Applied Computer Science</p>
                <p>Computer Science Division</p>
                <p>Dept of Mathematical Sciences</p>
                <p>Stellenbosch University</p>
                <p>Private Bag X1, 7602 Matieland, SOUTH AFRICA</p>
                <p className="pt-2">
                  Telephone:{' '}
                  <a
                    href="tel:+27218084232"
                    className="text-[#7B1E3A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 rounded"
                  >
                    +27 21 808 4232
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:visserw@sun.ac.za"
                    className="text-[#7B1E3A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 rounded"
                  >
                    visserw@sun.ac.za
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                Past projects
              </h2>
              <div className="space-y-6">
                {pastProjects.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
