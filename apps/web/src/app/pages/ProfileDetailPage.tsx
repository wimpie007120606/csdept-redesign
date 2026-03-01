import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'react-router';
import { LocalizedLink } from '../components/LocalizedLink';
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { getPerson, assetUrl, type PersonDetail } from '../api';
import { PLACEHOLDER_IMAGE } from '../placeholder';
import { AchievementsTimeline, type YearGroup } from '../components/AchievementsTimeline';
import { Timeline, type TimelineItemProps } from '../components/Timeline';
import { lynetteAchievementsByYear } from '@/content/lynette-achievements';
import { getBerndFischerYearGroups } from '@/content/bernd-fischer-publications';
import { getJacoGeldenhuysYearGroups } from '@/content/jaco-geldenhuys-publications';
import { getCorneliaInggsYearGroups } from '@/content/cornelia-inggs-publications';
import { getWillemVisserYearGroups } from '@/content/willem-visser-publications';
import { getSteveKroonYearGroups, steveKroonFeaturedPublications } from '@/content/steve-kroon-publications';
import { getPhotoForSlug } from '@/content/people';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/realbackground3.jpeg';

function buildYearGroupsFromPublications(
  pubs: { title: string; authors?: string; venue?: string; year: number }[]
): YearGroup[] {
  const byYear = new Map<number, typeof pubs>();
  for (const p of pubs) {
    const y = p.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, publications]) => ({
      year,
      publications: publications.map((pub) => ({
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
      })),
    }));
}

function buildYearGroupsFromSelected(
  pubs: { title: string; authors?: string; venue?: string; year: number; citations?: number }[]
): YearGroup[] {
  const byYear = new Map<number, typeof pubs>();
  for (const p of pubs) {
    const y = p.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, publications]) => ({
      year,
      publications: publications.map((pub) => ({
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
      })),
    }));
}

function AchievementsEmptyState({ t }: { t: (key: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-dashed border-border bg-muted/30 p-10 text-center"
    >
      <p className="text-muted-foreground font-medium">{t('achievements.empty')}</p>
      <p className="text-sm text-muted-foreground mt-2">{t('achievements.emptySub')}</p>
    </motion.div>
  );
}

export function ProfileDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [expandedResearchCategories, setExpandedResearchCategories] = useState<Set<number>>(new Set([0, 1, 2]));

  const staticProfiles: Record<string, Record<string, unknown>> = {
    'whk-bester': {
      id: 'whk-bester',
      name: 'W. H. K. Bester',
      primaryTitle: 'Technical Officer',
      secondaryTitle: 'Junior Lecturer (since 2014)',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'A508, General Engineering Building',
      address: 'Private Bag X1, Matieland 7602, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'whkbester@cs.sun.ac.za',
      secondaryEmail: 'whkbester@gmail.com',
      phone: '+27 21 808 4232',
      phoneNote: 'administrative officer',
      image: getPhotoForSlug('whk-bester') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Without any formal qualification or training, I worked as a software programmer/analyst for eight years in the media industry. I was involved with system programming, web strategising, and full-text data archiving and retrieval. In 2003, I turned to university studies for an undergraduate degree in Computer Science and Mathematics at Stellenbosch University, followed by an honours and a master\'s degree. I was appointed as technical officer in the Computer Science Division in 2009, and then as junior lecturer in 2014.',
        'Besides my life in academia, I am also an active performing musician as a member of the Cape Consort, a group dedicated to historically informed performance of early music. Since 2001, I have been a freelance music and theatre critic for Die Burger (now also Netwerk24), and I occasionally broadcast on Fine Music Radio.',
      ],
      
      researchInterests: [
        'Formal languages and automata theory',
        'Software engineering principles applied to system programming',
        'Web systems and tooling',
        'Efficiency and space requirements of algorithms used in system/programming libraries',
      ],
      
      qualifications: [
        {
          degree: 'MSc (Computer Science) cum laude',
          institution: 'Stellenbosch University',
          supervisors: 'Willem Visser and Cornelia Inggs',
        },
        {
          degree: 'PhD in progress',
          institution: 'Stellenbosch University',
          supervisors: 'Brink van der Merwe',
          focus: 'Automata theory with a focus on regular expression matching',
        },
      ],
      
      teaching: [
        'CS145: Computer Systems',
        'CS146: Problem Solving using Computer Programming',
        'CS244: Computer Architectures and Operating Systems',
      ],
      
      publications: [
        {
          title: 'Efficient Regular Expression Matching Using Finite Automata',
          authors: 'W. H. K. Bester, B. van der Merwe',
          venue: 'Journal of Universal Computer Science',
          year: 2023,
        },
        {
          title: 'A Study of Efficient Glushkov Automata Construction',
          authors: 'W. H. K. Bester, C. Inggs, W. Visser',
          venue: 'SAICSIT Conference Proceedings',
          year: 2020,
        },
      ],
    },

    'lynette-van-zijl': {
      id: 'lynette-van-zijl',
      name: 'Lynette van Zijl',
      primaryTitle: 'Professor',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'A520, General Engineering Building',
      address: 'Private Bag X1, 7602 Matieland, South Africa',
      campusLocation: 'c/o Banghoek- and Joubert Street, Stellenbosch',
      email: 'lvzijl@cs.sun.ac.za',
      secondaryEmail: 'lvzijl@sun.ac.za',
      phone: '+27 21 808 4232',
      phoneNote: 'secretary',
      image: getPhotoForSlug('lynette-van-zijl') ?? PLACEHOLDER_IMAGE,

      bio: [
        'My research interests lie in automata and formal languages, as well as the computer science foundations underlying applications in nature conservation research and assistive technologies.',
      ],

      researchInterests: [
        'Automata and formal languages',
        'Computer science foundations for nature conservation research',
        'Assistive technologies',
      ],

      teaching: [
        'CS214',
        'CS345 / CS711',
        'Advanced Automata Theory',
      ],

      programmeCommittees: [
        { conference: 'SLTAT', years: ['2019', '2022'] },
        { conference: 'DCFS', years: ['2017', '2018', '2019'] },
        { conference: 'ICTAC', years: ['2018'] },
        { conference: 'SAICSIT', years: ['2013', '2015', '2016', '2017', '2018'] },
        { conference: 'FSMNLP', years: ['2013', '2014', '2015', '2017'] },
      ],

      hasPublicationsTimeline: true,
      useLynetteFullAchievements: true,
    },

    'brink-van-der-merwe': {
      id: 'brink-van-der-merwe',
      name: 'Prof. Brink van der Merwe',
      primaryTitle: 'Professor',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'General Engineering Building',
      address: 'Private Bag X1, Matieland 7602, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'abvdm@cs.sun.ac.za',
      image: getPhotoForSlug('brink-van-der-merwe') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Brink van der Merwe is a professor in the Computer Science Division at Stellenbosch University. His research focuses on automata theory, formal languages, regular expression matching, and program verification. His work spans theoretical computer science and practical verification tools, with applications in software correctness and computational systems.',
        'He has supervised numerous postgraduate students and actively contributes to research in descriptional complexity and formal models of computation.',
      ],
      
      researchInterests: [
        'Automata theory',
        'Formal languages',
        'Regular expression matching',
        'Program verification',
        'Descriptional complexity',
        'Software correctness',
      ],
      
      selectedPublications: [
        {
          title: 'Music generation with Markov models',
          authors: 'B. van der Merwe, et al.',
          venue: 'IEEE MultiMedia',
          year: 2011,
          citations: 142,
        },
        {
          title: 'Verifying Android applications using Java Pathfinder',
          authors: 'H. Muccini, A. Di Francesco, P. Esposito, B. van der Merwe',
          venue: 'ACM SIGSOFT Software Engineering Notes',
          year: 2012,
          citations: 89,
        },
        {
          title: 'A computationally inexpensive energy model for horizontal electrical water heaters',
          authors: 'M. J. Booysen, J. A. A. Engelbrecht, A. Molinaro, B. van der Merwe',
          venue: 'IEEE Transactions on Smart Grid',
          year: 2016,
          citations: 67,
        },
        {
          title: 'Analyzing catastrophic backtracking behavior in practical regular expression matching',
          authors: 'N. Weideman, B. van der Merwe, M. Berglund, W. Visser',
          venue: 'arXiv preprint',
          year: 2014,
          citations: 45,
        },
        {
          title: 'Execution and property specifications for jpf-android',
          authors: 'H. van der Merwe, B. van der Merwe, W. Visser',
          venue: 'ACM SIGSOFT Software Engineering Notes',
          year: 2014,
          citations: 38,
        },
      ],
      
      scholarMetrics: {
        citations: 1187,
        hIndex: 19,
        i10Index: 33,
      },
    },

    'walter-schulze': {
      id: 'walter-schulze',
      name: 'Walter Schulze',
      primaryTitle: 'Researcher',
      secondaryTitle: 'Informatics Division',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'General Engineering Building',
      address: 'Private Bag X1, Matieland 7602, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'walter@walterschulze.org',
      image: getPhotoForSlug('walter-schulze') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Walter Schulze is a researcher in Informatics at Stellenbosch University whose work focuses on formal language theory, regular expressions, programming language design, and algorithmic music generation. His research intersects theoretical computer science and creative computation, particularly in the application of formal grammars and automata to music and language processing systems.',
        'His notable work includes pioneering research in music generation using Markov models and formal language theory approaches to computational creativity.',
      ],
      
      researchInterests: [
        'Formal Language Theory',
        'Automata & Regular Expressions',
        'Regular Expression Derivatives',
        'Programming Languages',
        'Serialization Systems',
        'Music Generation with Formal Models',
        'Computational Creativity',
      ],
      
      selectedPublications: [
        {
          title: 'Music generation with Markov models',
          authors: 'A. Van Der Merwe, W. Schulze',
          venue: 'IEEE Multimedia 18(3), 78–85',
          year: 2010,
          citations: 138,
        },
        {
          title: 'A formal language theory approach to music generation',
          authors: 'W. Schulze',
          venue: 'Stellenbosch University',
          year: 2010,
          citations: 10,
        },
      ],
      
      scholarMetrics: {
        citations: 148,
        hIndex: 2,
        i10Index: 2,
        citationsSince2021: 59,
      },
      
      collaborators: [
        'Brink van der Merwe',
      ],
    },

    'bernd-fischer': {
      id: 'bernd-fischer',
      name: 'Prof. Bernd Fischer',
      primaryTitle: 'Professor',
      secondaryTitle: 'Head of Division',
      department: 'Division of Computer Science, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'General Engineering Building',
      address: 'Private Bag X1, Matieland 7602, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'bfischer@cs.sun.ac.za',
      phone: '+27 21 808 4232',
      phoneNote: 'secretary',
      image: getPhotoForSlug('bernd-fischer') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Bernd Fischer is a Professor and Head of the Division of Computer Science at Stellenbosch University. His research focuses on automated software engineering, program verification, and program synthesis. He has led and contributed to tools such as CSeq, ESBMC, and AutoBayes, and has published widely on bounded model checking, certification of auto-generated code, and formal methods.',
        'He holds a PhD from Universität Passau and has held positions at NASA Ames and the University of Southampton before joining Stellenbosch.',
      ],

      researchInterests: [
        'Automated software engineering',
        'Logic-based techniques',
        'Program synthesis / program generation',
        'Program verification',
        'Annotation inference',
        'Model checking',
        'Human-oriented presentation of verification results',
      ],

      hasPublicationsTimeline: true,
      publicationsTimeline: getBerndFischerYearGroups() as YearGroup[],

      externalLinks: [
        { label: 'Personal homepage', url: 'https://bfischer.pages.cs.sun.ac.za/' },
        { label: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=en&user=m51BXiwAAAAJ' },
      ],

      publicationSourceNote: 'Publication list sourced from Google Scholar and the Stellenbosch University publications page.',
    },

    'jaco-geldenhuys': {
      id: 'jaco-geldenhuys',
      name: 'Dr. Jaco Geldenhuys',
      primaryTitle: 'Associate Professor',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'A519, General Engineering Building',
      address: 'Private Bag X1, 7602 Matieland, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'geld@sun.ac.za',
      phone: '+27 21 808 4232',
      phoneNote: 'secretary',
      image: getPhotoForSlug('jaco-geldenhuys') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Jaco Geldenhuys is an Associate Professor in the Computer Science Division at Stellenbosch University. His research focuses on software engineering, in particular formal methods (model checking and process algebra), static analysis, testing, and open source software. He also has interests in automata and language theory and in data structures and algorithms.',
        'He has published on symbolic execution, bounded model checking, and program analysis, and has supervised several postgraduate and honours students.',
      ],

      researchInterests: [
        'Formal methods (model checking and process algebra)',
        'Static analysis',
        'Testing',
        'Open source software',
        'Automata and language theory',
        'Data structures and algorithms',
      ],

      teaching: [
        'RW114 Introduction to Computer Science',
        'RW712 Advanced Algorithms',
      ],
      teachingIntro: 'Courses (2018):',

      externalLinks: [
        { label: 'Personal homepage', url: 'https://cs.sun.ac.za/~jaco/' },
      ],

      hasPublicationsTimeline: true,
      publicationsTimeline: getJacoGeldenhuysYearGroups() as YearGroup[],

      researchProjects: [
        { name: 'Green' },
        { name: 'Impendulo' },
      ],

      studentSupervision: {
        current: [
          { name: 'Ulvi Guliyev', degree: 'PhD', startYear: 2011, topic: 'program comprehension and rewriting', coSupervisor: 'Willem Visser' },
          { name: 'Pierre le Riche', degree: 'PhD', startYear: 2012, topic: 'optimal memory management' },
          { name: 'Marcel Dunaiski', degree: 'PhD', startYear: 2014, topic: 'bibliometrics', coSupervisor: 'Willem Visser' },
          { name: 'Shaun Schreiber', degree: 'MSc', startYear: 2016, topic: 'texture generation', coSupervisor: 'Hennie de Villiers' },
          { name: 'José Lambo', degree: 'Honours', startYear: 2016, topic: 'Customized CRM' },
          { name: 'Delena Malan', degree: 'Honours', startYear: 2016, topic: 'Browser history visualization' },
          { name: 'Iain Swarts', degree: 'Honours', startYear: 2016, topic: 'Genetic algorithms for test reduction' },
        ],
        recentlyGraduated: [
          { name: 'Marcel Dunaiski', year: 'March 2014', topic: 'ranking algorithms and citation networks' },
          { name: 'Nico Huysamen', year: 'Dec 2012', topic: 'FATKID' },
          { name: 'Gideon Redelinghuys', year: 'March 2012', topic: 'Symbolic String Execution' },
          { name: 'Mary Fasan', year: 'Dec 2010', topic: 'Distributed Binary Decision Diagrams' },
        ],
      },

      software: {
        title: 'Random software I have written',
        items: [
          'Change (AWK CWEB change file tool)',
          'Directed evolution',
          'EvolvePhoto',
          'FourDigits',
          'Large number arithmetic',
          'Mersenne Twister (CWEB implementation)',
          'Reverse an SDNFA',
          'Suffix trees',
          'Travelling Salesperson Programs',
          'Turing (1999)',
          'Word clouds (Wordle-style layout)',
        ],
      },
    },

    'cornelia-inggs': {
      id: 'cornelia-inggs',
      name: 'Dr. Cornelia P. Inggs',
      primaryTitle: 'Senior Lecturer (part-time)',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'Room A509, General Engineering Building',
      address: 'Computer Science, Stellenbosch University, Private Bag X1, 7602 Matieland, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'cinggs@sun.ac.za',
      image: getPhotoForSlug('cornelia-inggs') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Dr. Cornelia Inggs holds a PhD from The University of Manchester (UK) and is a part-time Senior Lecturer in Computer Science at Stellenbosch University, where she previously studied. Her research focuses on software verification and analysis, program performance and scalability, parallel and distributed software, and efficient search and planning algorithms for AI and machine learning.',
      ],

      researchInterests: [
        'Software verification and analysis',
        'Program performance and scalability',
        'Parallel and distributed software',
        'Efficient search and planning algorithms for AI and machine learning',
        'Dynamic and static analysis of code',
      ],

      qualifications: [
        { degree: 'PhD', institution: 'The University of Manchester (UK)' },
        { degree: 'Also studied at', institution: 'Stellenbosch University' },
      ],

      teachingUndergraduate: [
        'Concurrency (3rd year)',
        'Object Oriented Programming (1st year)',
        'Introduction to Computer Science (1st year)',
        'Operating Systems (3rd year)',
        'Scientific Computing (2nd year)',
      ],
      teachingPostgraduate: [
        'Software Verification and Analysis',
        'Model Checking',
        'Advanced Concurrency Concepts',
      ],

      externalLinks: [
        { label: 'Personal homepage', url: 'https://cinggs.pages.cs.sun.ac.za/' },
      ],

      hasPublicationsTimeline: true,
      publicationsTimeline: getCorneliaInggsYearGroups() as YearGroup[],

      researchCategories: [
        {
          title: 'Software Verification and Analysis',
          projects: [
            'Automated feedback to novice programmers (Claire Baissac, Erin van den Heever, Simon Steven)',
            'Linearisability of non-blocking concurrent data structures (Nicole du Toit)',
            'Annotating JVM bytecode for model checking and abstract interpretation (Vasco Nel-Lopes)',
            'Learning concurrency via games (Taun Gadd, Justin Giffard – CSEDU2017)',
            'Resource contention detection (D. Willem Venter MSc 2016)',
            'Semantic diff (Willem H.K. Bester, Johan H. van Litsenborgh)',
            'Hash table access patterns (Pieter van der Walt)',
            'Reducing communication in distributed model checking (Jaco Geldenhuys, Jean Fourie MSc 2009, SAICSIT12)',
            'CTL* model checking (FMSD 2006)',
            'Parallel model checking (PhD 2004, Manchester)',
            'Effective state exploration (ENTCS 2002)',
            'LTL verification system (MSc 1999, Stellenbosch)',
          ],
        },
        {
          title: 'Test Case Generation',
          projects: [
            'Oracle generation using transformer models (Willem C. Visser, Marco Dewey MSc in progress)',
            'Symbolic execution test-case generation (Willem H.K. Bester MSc 2013, SAICSIT2012 Best Paper)',
            'Automated coverage calculation (G. Campbell Morrison MSc 2012)',
          ],
        },
        {
          title: 'Search and Planning Algorithms for AI and ML',
          projects: [
            'Ingenious Framework (link if exists)',
            'Hyperparameter tuning for MCTS (Alexander Mouton MSc in progress)',
            'Go engine (Marco Dewey Hons 2021)',
            'UCT-treesplit (Alex Heyns Hons 2021)',
            'Distributed UCT (Reynhardt Vermaak Hons 2021)',
            'Information sharing strategies (Steve Kroon, Marc Christoph MSc 2020)',
            'Distributed tournament engines',
            'Distributed solitary robots',
            'Parallel MCTS enhancements',
            'General purpose parallel search algorithms',
            'Monte-Carlo Tree Search for Go (SAICSIT2012, International Go Symposium)',
          ],
        },
      ],

      studentSupervision: {
        currentStudents: [
          { name: 'Willem C. Visser', topic: 'Oracle generation using transformer models', coSupervisor: 'Marco Dewey (MSc in progress)' },
          { name: 'Alexander Mouton', topic: 'Hyperparameter tuning for MCTS', degree: 'MSc', startYear: 2024 },
        ],
        mscInProgress: [
          { name: 'Marco Dewey', topic: 'Oracle generation / Go engine' },
          { name: 'Alexander Mouton', topic: 'Hyperparameter tuning for MCTS' },
        ],
        honours: [
          { name: 'Marco Dewey', year: 2021, topic: 'Go engine' },
          { name: 'Alex Heyns', year: 2021, topic: 'UCT-treesplit' },
          { name: 'Reynhardt Vermaak', year: 2021, topic: 'Distributed UCT' },
        ],
        pastStudents: [
          { name: 'Marcel Dunaiski', year: 'March 2014', topic: 'ranking algorithms and citation networks' },
          { name: 'Willem H.K. Bester', year: 2013, topic: 'Symbolic execution test-case generation (SAICSIT2012 Best Paper)' },
          { name: 'G. Campbell Morrison', year: 2012, topic: 'Automated coverage calculation' },
          { name: 'Jean Fourie', year: 2009, topic: 'Reducing communication in distributed model checking' },
          { name: 'D. Willem Venter', year: 2016, topic: 'Resource contention detection' },
        ],
      },
    },

    'willem-visser': {
      id: 'willem-visser',
      name: 'Prof. Willem Visser',
      primaryTitle: 'Professor',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: '',
      address: 'Computer Science Division\nStellenbosch University\nPrivate Bag X1\n7602 Matieland\nSouth Africa',
      email: 'wvisser@cs.sun.ac.za',
      secondaryEmail: 'visserw@sun.ac.za',
      tertiaryEmail: 'willem@gmail.com',
      phone: '+27 21 808 4232',
      image: getPhotoForSlug('willem-visser') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Willem Visser is a Professor in the Division of Computer Science at Stellenbosch University. He was Head of Division (2009–2013) and Vice-Dean of Research in the Faculty of Science (2017–2019). His research focuses on finding bugs in software, through testing, program analysis, symbolic execution, probabilistic symbolic execution, and model checking. He is known for Java PathFinder (JPF) and Symbolic PathFinder (SPF). He has held positions at NASA Ames Research Center and SEVEN Networks.',
      ],

      researchInterests: [
        'Testing',
        'Program analysis',
        'Symbolic execution',
        'Probabilistic symbolic execution',
        'Model checking',
        'Java PathFinder (JPF)',
        'Symbolic PathFinder (SPF)',
      ],

      honoursAwards: [
        { year: '2020', title: 'SIGSOFT 2020 Impact Paper Award', detail: 'ASE 2000 – Model Checking Programs' },
        { year: '2018', title: 'ISSTA 2018 Retrospective Impact Paper Award', detail: 'ISSTA 2004 – Test Input Generation with Java PathFinder' },
        { year: '2017', title: 'Best Paper Award SAICSIT', detail: 'Probabilistic Programming for Java using Symbolic Execution and Model Counting' },
        { year: '2016', title: 'NRF A Rating' },
        { year: '2016', title: 'ICSE 2016 Program Co-Chair', detail: 'with Laurie Williams' },
        { year: '2017–2019', title: 'Vice-Dean of Research', detail: 'Faculty of Science' },
      ],

      service: [
        { role: 'ICSE Steering Committee' },
        { role: 'SPIN Steering Committee' },
        { role: 'NRF IT Ratings Panel (2011–2014, Convener 2013–2014)' },
        { role: 'ASE Steering Committee (2008–2014)' },
        { role: 'Associate Editor ACM TOSEM (2011–2017)' },
        { role: 'ACM SIGSOFT Executive Committee (2012–2018)' },
        { role: 'SAICSIT Council (2017–2019)' },
      ],

      externalLinks: [
        { label: 'DBLP', url: 'https://dblp.org/pid/07/3180.html' },
      ],

      hasPublicationsTimeline: true,
      publicationsTimeline: getWillemVisserYearGroups() as YearGroup[],
      publicationSourceNote: 'Older publications available via DBLP.',

      studentSupervision: {
        current: [
          { name: 'Phillip van Heerden', degree: 'MSc', topic: 'Symbolic Automata Learning' },
          { name: 'David Baker-Effendi', degree: 'MSc', topic: 'Graph Databases for Multi-language and Incremental Data-flow Analysis' },
        ],
        recentlyGraduated: [
          { name: 'Marcel Dunaiski', year: 'PhD' },
          { name: 'Heila Botha', year: 'PhD' },
          { name: 'Alexander Leid', year: 'MSc' },
          { name: 'Jan Taljaard', year: 'MSc' },
          { name: 'Pieter Jordaan', year: '' },
          { name: 'Aline Uwimbabazi', year: '' },
          { name: 'Piet Theron', year: '' },
          { name: 'Willem Bester', year: '' },
          { name: 'Kevin Durant', year: '' },
          { name: 'Gideon Redelinghuys', year: '' },
          { name: 'Pieter Kruger', year: '' },
        ],
      },

      tools: [
        { name: 'Java PathFinder (JPF)', url: 'https://github.com/javapathfinder/jpf-core' },
        { name: 'Symbolic PathFinder (SPF)', url: 'https://github.com/SymbolicPathFinder/jpf-symbc' },
        { name: 'Coastal' },
        { name: 'Green Solver' },
      ],
    },

    'steve-kroon': {
      id: 'steve-kroon',
      name: 'Prof. Steve Kroon',
      primaryTitle: 'Associate Professor',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'A515, General Engineering Building',
      email: 'kroon@sun.ac.za',
      phone: '+27 21 808 9375',
      image: getPhotoForSlug('steve-kroon') ?? PLACEHOLDER_IMAGE,

      bio: [
        'Prof. Steve Kroon obtained MCom (Computer Science) and PhD (Mathematical Statistics) degrees from Stellenbosch University and joined the Computer Science department in 2008. He holds an NRF C2 rating. His research interests include generative modelling, Bayesian methods, search and adversarial search, decision-making and planning under uncertainty, and machine learning. He serves as reviewer and programme committee member for venues including ICML, NeurIPS, JAIR, Algorithmica, and JUCS. He is affiliated with CAIR and NITheCS.',
      ],

      researchInterests: [
        'Generative modeling',
        'Bayesian methods',
        'Neural networks',
        'Computational intelligence in games',
        'Planning under uncertainty',
        'Adversarial search',
      ],

      featuredPublications: steveKroonFeaturedPublications,

      externalLinks: [
        { label: 'Homepage', url: 'https://kroon.cs.sun.ac.za/index.html' },
        { label: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=en&user=-M2yWHQAAAAJ' },
        { label: 'Curriculum Vitae', url: 'https://kroon.cs.sun.ac.za/index.html' },
      ],

      researchGroupLinks: [
        { label: 'PLeaSeD – Planning, Learning and Search for Decision-making', slug: 'pleased' },
        { label: 'Machine Learning and Artificial Intelligence', slug: 'ml-ai' },
      ],

      hasPublicationsTimeline: true,
      publicationsTimeline: getSteveKroonYearGroups() as YearGroup[],

      studentSupervision: {
        current: [],
        recentlyGraduated: [],
      },
      studentSupervisionNote: 'Has supervised and co-supervised PhD and Masters students in machine learning, planning, and related areas.',
    },
  };

  const normalizedSlug = slug ? decodeURIComponent(slug).trim() : '';

  useEffect(() => {
    if (!normalizedSlug) {
      setLoaded(true);
      return;
    }
    const fallback = staticProfiles[normalizedSlug] ?? null;
    setProfile(fallback ? { ...fallback } : null);
    getPerson(normalizedSlug).then((apiPerson) => {
      if (!apiPerson) {
        setLoaded(true);
        return;
      }
      let researchInterests: string[] = [];
      try {
        if (apiPerson.research_interests_json) researchInterests = JSON.parse(apiPerson.research_interests_json);
      } catch {}
      const imageUrl = apiPerson.image_key ? assetUrl(apiPerson.image_key) : null;
      const fallbackImg = fallback?.image as string | undefined;
      const mapped: Record<string, unknown> = {
        id: apiPerson.slug,
        name: apiPerson.full_name,
        primaryTitle: apiPerson.title ?? '',
        secondaryTitle: apiPerson.role ?? null,
        department: apiPerson.division ?? null,
        institution: 'Stellenbosch University',
        office: apiPerson.office ?? null,
        address: null,
        campusLocation: null,
        email: apiPerson.email_primary ?? null,
        secondaryEmail: apiPerson.email_secondary ?? null,
        phone: apiPerson.phone ?? null,
        phoneNote: null,
        image: (imageUrl || fallbackImg || getPhotoForSlug(normalizedSlug)) ?? PLACEHOLDER_IMAGE,
        bio: apiPerson.bio ? apiPerson.bio.split('\n\n').filter(Boolean) : [],
        researchInterests,
        teaching: null,
        programmeCommittees: null,
        qualifications: apiPerson.qualifications ?? null,
        selectedPublications: null,
        scholarMetrics: null,
        collaborators: null,
      };
      if (normalizedSlug === 'lynette-van-zijl') {
        mapped.hasPublicationsTimeline = true;
        mapped.useLynetteFullAchievements = true;
      } else if (apiPerson.publications_by_year && apiPerson.publications_by_year.length > 0) {
        mapped.hasPublicationsTimeline = true;
        mapped.publicationsTimeline = apiPerson.publications_by_year.map((y) => ({
          year: y.year,
          publications: y.publications.map((p: { citation: string; venue?: string; tags_json?: string }) => ({
            title: p.citation.split(',')[0] || p.citation,
            authors: '',
            venue: p.venue || '',
            type: (() => {
              try {
                const t = p.tags_json ? JSON.parse(p.tags_json) : [];
                return Array.isArray(t) ? (t[0] ?? 'journal') : 'journal';
              } catch { return 'journal'; }
            })(),
          })),
        }));
      } else if (apiPerson.publications && apiPerson.publications.length > 0) {
        mapped.publications = apiPerson.publications.map((p: { year: number; citation: string; venue?: string }) => ({
          title: p.citation.split(',')[0] || p.citation,
          authors: '',
          venue: p.venue ?? '',
          year: p.year,
        }));
      }
      setProfile(mapped);
    }).finally(() => setLoaded(true));
  }, [normalizedSlug]);

  // Guard rendering while loading or when no matching profile exists.
  if (!normalizedSlug) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
            {t('errors.profileNotFound')}
          </h1>
          <p className="text-muted-foreground mb-6">{t('errors.profileNotFoundSub')}</p>
          <LocalizedLink
            to="/people"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.backToPeople')}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  if (!loaded && !profile) {
    // Simple loading state; could be replaced with a skeleton.
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <p className="text-muted-foreground">{t('errors.somethingWrong')}</p>
        </div>
      </div>
    );
  }

  if (loaded && !profile) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
            {t('errors.profileNotFound')}
          </h1>
          <p className="text-muted-foreground mb-6">{t('errors.profileNotFoundSub')}</p>
          <LocalizedLink
            to="/people"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.backToPeople')}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="relative py-20 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/95 via-[#7B1E3A]/90 to-[#0B1C2D]/95" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <LocalizedLink 
            to="/people"
            className="inline-flex items-center gap-2 text-[#C8A951] hover:text-[#C8A951]/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.backToPeople')}
          </LocalizedLink>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={profile?.image ?? PLACEHOLDER_IMAGE}
                  alt={profile?.name ?? 'Profile'}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="font-['Spectral'] text-5xl lg:text-6xl font-bold mb-4">
                {profile?.name}
              </h1>
              <p className="text-[#C8A951] text-2xl font-semibold mb-2">
                {profile?.primaryTitle}
              </p>
              {profile && (profile as any).secondaryTitle && (
                <p className="text-white/70 text-lg mb-4">{(profile as any).secondaryTitle}</p>
              )}
              <p className="text-white/60 mb-8">{profile?.department}</p>

              {/* Contact Information */}
              <div className="space-y-3 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                {(profile?.office || profile?.address || profile?.campusLocation) && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" aria-hidden />
                    <div className="text-sm min-w-0">
                      {profile?.office && <p className="font-semibold">{profile.office}</p>}
                      {profile?.address && (
                        <p className="text-white/70 whitespace-pre-line">{profile.address}</p>
                      )}
                      {profile?.campusLocation && (
                        <p className="text-white/70">{profile.campusLocation}</p>
                      )}
                    </div>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" aria-hidden />
                    <div className="text-sm">
                      <a
                        href={`tel:${String(profile.phone).replace(/\s/g, '')}`}
                        className="text-white hover:text-[#C8A951] transition-colors underline underline-offset-2"
                      >
                        {profile.phone}
                      </a>
                      {profile.phoneNote && (
                        <p className="text-white/60 mt-0.5">({profile.phoneNote})</p>
                      )}
                    </div>
                  </div>
                )}
                {(profile?.email || profile?.secondaryEmail || (profile as any).tertiaryEmail) && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" aria-hidden />
                    <div className="text-sm space-y-1 min-w-0 break-all">
                      {profile?.email && (
                        <p>
                          <a
                            href={`mailto:${profile.email}`}
                            className="text-white hover:text-[#C8A951] transition-colors underline underline-offset-2"
                          >
                            {profile.email}
                          </a>
                        </p>
                      )}
                      {profile?.secondaryEmail && (
                        <p>
                          <a
                            href={`mailto:${profile.secondaryEmail}`}
                            className="text-white/90 hover:text-[#C8A951] transition-colors underline underline-offset-2"
                          >
                            {profile.secondaryEmail}
                          </a>
                        </p>
                      )}
                      {(profile as any).tertiaryEmail && (
                        <p>
                          <a
                            href={`mailto:${(profile as any).tertiaryEmail}`}
                            className="text-white/90 hover:text-[#C8A951] transition-colors underline underline-offset-2"
                          >
                            {(profile as any).tertiaryEmail}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="space-y-16">
            {/* Bio */}
            {profile.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.about')}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {profile.bio.map((paragraph: string, index: number) => (
                    <p key={index} className="text-foreground/80 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Research Interests */}
            {profile.researchInterests && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.researchInterests')}
                </h2>
                <ul className="space-y-3">
                  {profile.researchInterests.map((interest: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/80">
                      <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Featured publications (most-cited block) */}
            {profile.featuredPublications && (profile.featuredPublications as Array<{ title: string; year: number; venue?: string; citations?: number; url?: string }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.featuredPublications')}
                </h2>
                <ul className="space-y-4">
                  {(profile.featuredPublications as Array<{ title: string; year: number; venue?: string; citations?: number; url?: string }>).map((item, index) => (
                    <li key={index} className="bg-card rounded-lg p-4 border border-border">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary inline-flex items-center gap-2">
                          {item.title}
                          <ExternalLink className="w-4 h-4 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">{item.title}</span>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                        {item.year && <span>{item.year}</span>}
                        {item.venue && <span>— {item.venue}</span>}
                        {item.citations != null && (
                          <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium">
                            {t('profile.citedBy')} ~{item.citations}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Honours & Awards */}
            {profile.honoursAwards && (profile.honoursAwards as Array<{ year?: string; title: string; detail?: string }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.honoursAwards')}
                </h2>
                {profile.id === 'willem-visser' ? (
                  <Timeline
                    items={(profile.honoursAwards as Array<{ year?: string; title: string; detail?: string }>).map(
                      (item): TimelineItemProps => ({
                        year: item.year ?? '',
                        title: item.title,
                        description: item.detail,
                      })
                    )}
                  />
                ) : (
                  <ul className="space-y-3">
                    {(profile.honoursAwards as Array<{ year?: string; title: string; detail?: string }>).map((item, index) => (
                      <li key={index} className="bg-card rounded-lg p-4 border border-border text-foreground/90">
                        {item.year && <span className="font-medium text-[#7B1E3A] mr-2">{item.year}:</span>}
                        <span className="font-medium">{item.title}</span>
                        {item.detail && <span className="text-muted-foreground block mt-1 ml-0 sm:ml-[4.5rem]">{item.detail}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}

            {/* Service */}
            {profile.service && (profile.service as Array<{ role: string; period?: string }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.service')}
                </h2>
                <ul className="space-y-2">
                  {(profile.service as Array<{ role: string }>).map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/90">
                      <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item.role}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Research Categories (collapsible) */}
            {profile.researchCategories && (profile.researchCategories as Array<{ title: string; projects: string[] }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.researchCategories')}
                </h2>
                <div className="space-y-3">
                  {(profile.researchCategories as Array<{ title: string; projects: string[] }>).map((cat, index) => {
                    const isExpanded = expandedResearchCategories.has(index);
                    return (
                      <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setExpandedResearchCategories((prev) => {
                            const next = new Set(prev);
                            if (next.has(index)) next.delete(index);
                            else next.add(index);
                            return next;
                          })}
                          className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-foreground hover:bg-muted/50 transition-colors"
                          aria-expanded={isExpanded}
                        >
                          {cat.title}
                          {isExpanded ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
                        </button>
                        {isExpanded && (
                          <ul className="px-6 pb-4 pt-0 space-y-2 border-t border-border">
                            {cat.projects.map((proj, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground/90 pt-2">
                                <span className="w-2 h-2 bg-[#7B1E3A] rounded-full shrink-0 mt-1.5" />
                                <span>{proj}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* External Links (Homepage, Google Scholar, etc.) */}
            {profile.externalLinks && (profile.externalLinks as Array<{ label: string; url: string }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.links')}
                </h2>
                <ul className="space-y-3">
                  {(profile.externalLinks as Array<{ label: string; url: string }>).map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                      >
                        {link.label}
                        <ExternalLink className="w-4 h-4 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Research groups (links to research page sections) */}
            {profile.researchGroupLinks && (profile.researchGroupLinks as Array<{ label: string; slug: string }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.researchGroups')}
                </h2>
                <ul className="space-y-3">
                  {(profile.researchGroupLinks as Array<{ label: string; slug: string }>).map((link, index) => (
                    <li key={index}>
                      <LocalizedLink to={`/research#${link.slug}`} className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                        {link.label}
                        <ExternalLink className="w-4 h-4 shrink-0" />
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Teaching */}
            {((profile.teachingUndergraduate || profile.teachingPostgraduate) || profile.teaching) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.teaching')}
                </h2>
                <div className="bg-card rounded-xl p-6 border border-border space-y-6">
                  {((profile as any).teachingUndergraduate?.length > 0) && (
                    <div>
                      <p className="text-muted-foreground font-medium mb-2">Undergraduate</p>
                      <ul className="space-y-2">
                        {((profile as any).teachingUndergraduate as string[]).map((course: string, index: number) => (
                          <li key={index} className="flex items-center gap-3">
                            <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                            <span className="font-medium text-foreground">{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {((profile as any).teachingPostgraduate?.length > 0) && (
                    <div>
                      <p className="text-muted-foreground font-medium mb-2">Postgraduate</p>
                      <ul className="space-y-2">
                        {((profile as any).teachingPostgraduate as string[]).map((course: string, index: number) => (
                          <li key={index} className="flex items-center gap-3">
                            <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                            <span className="font-medium text-foreground">{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {profile.teaching && !(profile as any).teachingUndergraduate && !(profile as any).teachingPostgraduate && (
                    <>
                      <p className="text-muted-foreground mb-4">
                        {(profile as any).teachingIntro ?? 'Teaching duties for 2023 include:'}
                      </p>
                      <ul className="space-y-2">
                        {profile.teaching.map((course: string, index: number) => (
                          <li key={index} className="flex items-center gap-3">
                            <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                            <span className="font-medium text-foreground">{course}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Research Projects */}
            {profile.researchProjects && (profile.researchProjects as Array<{ name: string; url?: string }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.researchProjects')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(profile.researchProjects as Array<{ name: string; url?: string }>).map((proj, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-[#7B1E3A]/30 transition-colors">
                      {proj.url ? (
                        <a href={proj.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-2">
                          {proj.name}
                          <ExternalLink className="w-4 h-4 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-semibold text-foreground">{proj.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Student Supervision */}
            {profile.studentSupervision && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.studentSupervision')}
                </h2>
                <div className="space-y-8">
                  {((profile.studentSupervision as any).current?.length > 0) && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-3">Current Students</h3>
                      <ul className="space-y-2">
                        {((profile.studentSupervision as any).current as Array<{ name: string; degree?: string; startYear?: number; topic?: string; coSupervisor?: string }>).map((s, i) => {
                          const lead = [s.degree, s.startYear].filter(Boolean).join(', ');
                          const desc = `${lead}${s.topic ? ` – ${s.topic}` : ''}${s.coSupervisor ? `, co-supervisor ${s.coSupervisor}` : ''}`.trim();
                          return (
                            <li key={i} className="bg-card rounded-lg p-4 border border-border text-foreground/90 text-sm">
                              <span className="font-medium">{s.name}</span>
                              {desc && <span className="text-muted-foreground"> ({desc})</span>}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  {((profile.studentSupervision as any).currentStudents?.length > 0) && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-3">Current Students</h3>
                      <ul className="space-y-2">
                        {((profile.studentSupervision as any).currentStudents as Array<{ name: string; topic?: string; coSupervisor?: string; degree?: string; startYear?: number }>).map((s, i) => (
                          <li key={i} className="bg-card rounded-lg p-4 border border-border text-foreground/90 text-sm">
                            <span className="font-medium">{s.name}</span>
                            <span className="text-muted-foreground">{(s.topic || s.coSupervisor) ? ` – ${[s.topic, s.coSupervisor].filter(Boolean).join(', ')}` : ''}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {((profile.studentSupervision as any).mscInProgress?.length > 0) && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-3">MSc in progress</h3>
                      <ul className="space-y-2">
                        {((profile.studentSupervision as any).mscInProgress as Array<{ name: string; topic?: string }>).map((s, i) => (
                          <li key={i} className="bg-card rounded-lg p-4 border border-border text-foreground/90 text-sm">
                            <span className="font-medium">{s.name}</span>
                            {s.topic && <span className="text-muted-foreground"> – {s.topic}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {((profile.studentSupervision as any).honours?.length > 0) && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-3">Honours</h3>
                      <ul className="space-y-2">
                        {((profile.studentSupervision as any).honours as Array<{ name: string; year?: number; topic?: string }>).map((s, i) => (
                          <li key={i} className="bg-card rounded-lg p-4 border border-border text-foreground/90 text-sm">
                            <span className="font-medium">{s.name}</span>
                            {(s.year || s.topic) && <span className="text-muted-foreground"> ({[s.year, s.topic].filter(Boolean).join(' – ')})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {((profile.studentSupervision as any).recentlyGraduated?.length > 0) && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-3">Recently Graduated</h3>
                      <ul className="space-y-2">
                        {((profile.studentSupervision as any).recentlyGraduated as Array<{ name: string; year?: string; topic?: string }>).map((s, i) => (
                          <li key={i} className="bg-card rounded-lg p-4 border border-border text-foreground/90 text-sm">
                            <span className="font-medium">{s.name}</span>
                            {s.year && <span className="text-muted-foreground"> ({s.year} – {s.topic ?? ''})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {((profile.studentSupervision as any).pastStudents?.length > 0) && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-3">Past students</h3>
                      <ul className="space-y-2">
                        {((profile.studentSupervision as any).pastStudents as Array<{ name: string; year?: number | string; topic?: string }>).map((s, i) => (
                          <li key={i} className="bg-card rounded-lg p-4 border border-border text-foreground/90 text-sm">
                            <span className="font-medium">{s.name}</span>
                            {(s.year || s.topic) && <span className="text-muted-foreground"> ({String(s.year)} – {s.topic ?? ''})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(profile as any).studentSupervisionNote && (
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {(profile as any).studentSupervisionNote as string}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tools & Software (name + optional url) */}
            {profile.tools && (profile.tools as Array<{ name: string; url?: string }>).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.toolsSoftware')}
                </h2>
                <ul className="space-y-3">
                  {(profile.tools as Array<{ name: string; url?: string }>).map((tool, index) => (
                    <li key={index}>
                      {tool.url ? (
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary">
                          {tool.name}
                          <ExternalLink className="w-4 h-4 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">{tool.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Software */}
            {profile.software && (profile.software as any).items?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.software')}
                </h2>
                <div className="bg-card rounded-xl p-6 border border-border">
                  {(profile.software as any).title && (
                    <p className="text-muted-foreground mb-4 font-medium">{(profile.software as any).title}</p>
                  )}
                  <ul className="space-y-2">
                    {((profile.software as any).items as string[]).map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#7B1E3A] rounded-full shrink-0" />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Programme Committees */}
            {profile.programmeCommittees && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.programmeCommittees')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.programmeCommittees.map((item: any, index: number) => (
                    <div key={index} className="bg-card rounded-lg p-5 border border-border">
                      <h3 className="font-bold text-foreground mb-2">{item.conference}</h3>
                      <p className="text-muted-foreground text-sm">{item.years.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Qualifications (for Willem) */}
            {profile.qualifications && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.qualifications')}
                </h2>
                <div className="space-y-6">
                  {profile.qualifications.map((qual: any, index: number) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border">
                      <h3 className="font-bold text-lg text-foreground mb-2">{qual.degree}</h3>
                      <p className="text-muted-foreground mb-2">{qual.institution}</p>
                      <p className="text-sm text-foreground/70">
                        Supervisor(s): {qual.supervisors}
                      </p>
                      {qual.focus && (
                        <p className="text-sm text-foreground/70 mt-2">Focus: {qual.focus}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements / Publications: Lynette full timeline or others' highlights */}
            {profile?.useLynetteFullAchievements && (
              <AchievementsTimeline
                yearGroups={lynetteAchievementsByYear as YearGroup[]}
                citationStyle
                title={t('achievements.publicationsAchievements')}
                defaultExpandedCount={5}
              />
            )}
            {profile?.hasPublicationsTimeline && profile?.publicationsTimeline && !profile?.useLynetteFullAchievements && (
              <AchievementsTimeline
                yearGroups={(profile.publicationsTimeline as YearGroup[])}
                citationStyle={false}
                title={t('achievements.publicationsAchievements')}
              />
            )}
            {profile?.publications && !profile?.hasPublicationsTimeline && (
              <AchievementsTimeline
                yearGroups={buildYearGroupsFromPublications(profile.publications as { title: string; authors?: string; venue?: string; year: number }[])}
                citationStyle={false}
                title={t('achievements.selectedPublications')}
              />
            )}
            {profile?.selectedPublications && (
              <AchievementsTimeline
                yearGroups={buildYearGroupsFromSelected(profile.selectedPublications as { title: string; authors?: string; venue?: string; year: number; citations?: number }[])}
                citationStyle={false}
                title={t('achievements.selectedPublications')}
              />
            )}
            {!profile?.useLynetteFullAchievements &&
              !profile?.hasPublicationsTimeline &&
              !profile?.publications?.length &&
              !profile?.selectedPublications?.length && (
                <AchievementsEmptyState t={t} />
              )}

            {/* Publication list source note */}
            {profile?.publicationSourceNote && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm text-muted-foreground border-t border-border pt-6 mt-8"
              >
                {profile.publicationSourceNote as string}
              </motion.p>
            )}

            {/* Scholar Metrics (for Brink) */}
            {profile.scholarMetrics && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.scholarMetrics')}
                </h2>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <p className="text-muted-foreground mb-4">{t('profile.metricsAsOf')}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                      <span className="font-medium text-foreground">Citations: {profile?.scholarMetrics?.citations}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                      <span className="font-medium text-foreground">h-index: {profile?.scholarMetrics?.hIndex}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                      <span className="font-medium text-foreground">i10-index: {profile?.scholarMetrics?.i10Index}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}