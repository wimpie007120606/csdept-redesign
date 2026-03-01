/**
 * Prof. Bernd Fischer — publication list.
 * Sourced from https://bfischer.pages.cs.sun.ac.za/publications.html and Google Scholar.
 * Update this file when new publications are added (see README or docs for update process).
 */

export interface BerndPublicationEntry {
  year: number;
  title: string;
  authors?: string;
  venue?: string;
  note?: string;
  links?: Array<{ label: string; url: string }>;
}

export const berndFischerPublications: BerndPublicationEntry[] = [
  // 2017
  {
    year: 2017,
    title: 'Fast test suite-driven model-based fault localisation with application to pinpointing defects in student programs',
    authors: 'G. Birch, B. Fischer, and M. Poppleton',
    venue: 'J. Software and Systems Modelling',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/s10270-017-0612-y' }],
  },
  {
    year: 2017,
    title: 'Exploratory Search of Academic Publication and Citation Data using Interactive Tag Cloud Visualizations',
    authors: 'M. Dunaiski, G. J. Greene, and B. Fischer',
    venue: 'Scientometrics',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/s11192-016-2236-3' }],
  },
  {
    year: 2017,
    title: 'Visualizing and Exploring Software Version Control Repositories using Interactive Tag Clouds over Formal Concept Lattices',
    authors: 'G. J. Greene, M. Esterhuizen, and B. Fischer',
    venue: 'Information and Software Technology',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1016/j.infsof.2016.12.001' }],
  },
  {
    year: 2017,
    title: 'Parallel Bug-finding in Concurrent Programs via Reduced Interleaving Instances',
    authors: 'E. Tomasco, B. Fischer, S. La Torre, T. L. Nguyen, G. Parlato, and P. Schrammel',
    venue: 'Proc. 32nd Intl. Conf. Automated Software Engineering (ASE)',
  },
  {
    year: 2017,
    title: 'Concurrent Program Verification with Lazy Sequentialization and Interval Analysis',
    authors: 'T. L. Nguyen, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 5th Intl. Conf. Networked Systems (NETYS), LNCS 10299',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1007/978-3-319-59647-1_20' }],
  },
  {
    year: 2017,
    title: 'Lazy-CSeq 2.0: Combining Lazy Sequentialization with Abstract Interpretation',
    authors: 'T. L. Nguyen, O. Inverso, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 23rd Intl. Conf. TACAS, LNCS 10206',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1007/978-3-662-54580-5_26' }],
  },
  {
    year: 2017,
    title: 'DepthK: A k-Induction Verifier Based on Invariant Inference for C Programs',
    authors: 'W. Rocha, H. Rocha, H. Ismail, L. Cordeiro, and B. Fischer',
    venue: 'Proc. 23rd Intl. Conf. TACAS, LNCS 10206',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1007/978-3-662-54580-5_23' }],
  },
  // 2016
  {
    year: 2016,
    title: 'Synthesizing MPI Implementations from Functional Data-Parallel Programs',
    authors: 'T. Aubrey-Jones and B. Fischer',
    venue: 'Intl. J. Parallel Programming',
    links: [{ label: 'DOI', url: 'http://link.springer.com/article/10.1007%2Fs10766-015-0359-4' }],
  },
  {
    year: 2016,
    title: 'Lazy Sequentialization for TSO and PSO via Shared Memory Abstractions',
    authors: 'E. Tomasco, T. L. Nguyen, O. Inverso, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 16th Intl. Conf. FMCAD',
  },
  {
    year: 2016,
    title: 'Lazy Sequentialization for the Safety Verification of Unbounded Concurrent Programs',
    authors: 'T. L. Nguyen, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 14th Intl. Symp. ATVA, LNCS 9938',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-319-46520-3_12' }],
  },
  {
    year: 2016,
    title: 'Using Fast Model-Based Fault Localisation to Aid Students in Self-Guided Program Repair',
    authors: 'G. Birch, B. Fischer, and M. Poppleton',
    venue: 'Proc. ITiCSE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/2899415.2899433' }],
  },
  {
    year: 2016,
    title: 'CVExplorer: identifying candidate developers by mining and exploring their open source contributions',
    authors: 'G. J. Greene and B. Fischer',
    venue: 'Proc. 31st Intl. Conf. ASE, Tools track',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/2970276.2970285' }],
  },
  {
    year: 2016,
    title: 'MU-CSeq 0.4: Individual Memory Location Unwindings',
    authors: 'E. Tomasco, T. L. Nguyen, O. Inverso, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 22nd Intl. Conf. TACAS, LNCS 9636',
    links: [{ label: 'DOI', url: 'http://link.springer.com/chapter/10.1007%2F978-3-662-49674-9_65' }],
  },
  // 2015
  {
    year: 2015,
    title: 'Lazy-CSeq: A Context-Bounded Model Checking Tool for Multi-threaded C-Programs',
    authors: 'O. Inverso, T. L. Nguyen, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 30th Intl. Conf. ASE, Tools track',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ASE.2015.108' }],
  },
  {
    year: 2015,
    title: 'Interactive Tag Cloud Visualization of Software Version Control Repositories',
    authors: 'G. Greene and B. Fischer',
    venue: 'Proc. 3rd IEEE Working Conf. Software Visualization (VISSOFT)',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/VISSOFT.2015.7332415' }],
  },
  {
    year: 2015,
    title: 'Fast Model-Based Fault Localisation with Test Suites',
    authors: 'G. Birch, B. Fischer, and M. Poppleton',
    venue: 'Proc. 9th Intl. Conf. Tests and Proofs (TAP), LNCS 9154',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-319-21215-9_3' }],
  },
  {
    year: 2015,
    title: 'Verifying Concurrent Programs by Memory Unwinding',
    authors: 'E. Tomasco, O. Inverso, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 21st Intl. Conf. TACAS, LNCS 9035',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-662-46681-0_52' }],
  },
  {
    year: 2015,
    title: 'Model Checking LTL Properties over C Programs with Bounded Traces',
    authors: 'J. Morse, L. Cordeiro, D. Nicole, and B. Fischer',
    venue: 'J. Software and Systems Modelling',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/s10270-013-0366-0' }],
  },
  // 2014
  {
    year: 2014,
    title: 'ConceptCloud: A Tagcloud Browser for Software Archives',
    authors: 'G. Greene and B. Fischer',
    venue: 'Proc. 14th Intl. Conf. FSE, Research tool demonstrations track',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/2635868.2661676' }],
  },
  {
    year: 2014,
    title: 'Applying Symbolic Bounded Model Checking to the 2012 RERS Greybox Challenge',
    authors: 'J. Morse, L. Cordeiro, D. Nicole, and B. Fischer',
    venue: 'Intl. J. Software Tools for Technology Transfer',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/s10009-014-0335-0' }],
  },
  {
    year: 2014,
    title: 'Bounded Model Checking of Multi-Threaded C Programs via Sequentialization',
    authors: 'O. Inverso, E. Tomasco, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 26th Intl. Conf. CAV, LNCS 8559',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-319-08867-9_39' }],
  },
  {
    year: 2014,
    title: 'Automatic Data Distribution for Data-Parallel Programming',
    authors: 'T. Aubrey-Jones and B. Fischer',
    venue: 'Proc. 7th Intl. Symposium on High-level Parallel Programming and Applications',
  },
  {
    year: 2014,
    title: 'ESBMC 1.22 (Competition Contribution)',
    authors: 'J. Morse, M. Ramalho, L. Cordeiro, D. Nicole, and B. Fischer',
    venue: 'Proc. 20th Intl. Conf. TACAS, LNCS 8413',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-54862-8_31' }],
  },
  {
    year: 2014,
    title: 'MU-CSeq: Sequentialization of C Programs by Shared Memory Unwindings',
    authors: 'E. Tomasco, O. Inverso, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 20th Intl. Conf. TACAS, LNCS 8413',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-54862-8_30' }],
  },
  {
    year: 2014,
    title: 'Lazy-CSeq: A Lazy Sequentialization Tool for C',
    authors: 'O. Inverso, E. Tomasco, B. Fischer, S. La Torre, and G. Parlato',
    venue: 'Proc. 20th Intl. Conf. TACAS, LNCS 8413',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-54862-8_29' }],
  },
  // 2013
  {
    year: 2013,
    title: 'Fine-Grained Role- and Attribute-Based Access Control for Web Applications',
    authors: 'S. H. Ghotbi and B. Fischer',
    venue: 'Software and Data Technologies, CCIS 411, Springer',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-45404-2_12' }],
  },
  {
    year: 2013,
    title: 'CSeq: A Concurrency Pre-Processor for Sequential C Verification Tools',
    authors: 'B. Fischer, O. Inverso, and G. Parlato',
    venue: 'Proc. 28th Intl. Conf. ASE, Tools track',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ASE.2013.6693139' }],
  },
  {
    year: 2013,
    title: 'Preemptive Type Checking in Dynamically Typed Languages',
    authors: 'N. Grech, B. Fischer, and J. Rathke',
    venue: '10th Intl. Colloquium ICTAC, LNCS',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-39718-9_12' }],
  },
  {
    year: 2013,
    title: 'SMT-Based Bounded Model Checking of C++ Programs',
    authors: 'M. Ramalho, M. Freitas, F. Sousa, H. Marques, L. Cordeiro, and B. Fischer',
    venue: 'Proc. 20th IEEE Intl. Conf. Workshops ECBS',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ECBS.2013.15' }],
  },
  {
    year: 2013,
    title: 'Handling Unbounded Loops with ESBMC 1.20',
    authors: 'J. Morse, L. Cordeiro, D. Nicole, and B. Fischer',
    venue: 'Proc. 19th Intl. Conf. TACAS, LNCS 7795',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-36742-7_47' }],
  },
  {
    year: 2013,
    title: 'CSeq: A Sequentialization Tool for C (Competition Contribution)',
    authors: 'B. Fischer, O. Inverso, and G. Parlato',
    venue: 'Proc. 19th Intl. Conf. TACAS, LNCS 7795',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-36742-7_46' }],
  },
  // 2012
  {
    year: 2012,
    title: 'SMT-Based Bounded Model Checking for Embedded ANSI-C Software',
    authors: 'L. Cordeiro, B. Fischer, and J. Marques-Silva',
    venue: 'IEEE Trans. Software Engineering',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/TSE.2011.59' }],
  },
  {
    year: 2012,
    title: 'A Declarative Fine-Grained Role-Based Access Control Model and Mechanism for the Web Application Domain',
    authors: 'S. H. Ghotbi and B. Fischer',
    venue: 'Proc. 7th Intl. Conf. ICSOFT',
  },
  {
    year: 2012,
    title: 'Context-Bounded Model Checking with ESBMC 1.17',
    authors: 'J. Morse, L. Cordeiro, D. Nicole, and B. Fischer',
    venue: 'Proc. 18th Intl. Conf. TACAS, LNCS 7214',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-28756-5_42' }],
  },
  // 2011
  {
    year: 2011,
    title: 'Context-Bounded Model Checking of LTL Properties for ANSI-C Software',
    authors: 'J. Morse, L. Cordeiro, D. Nicole, and B. Fischer',
    venue: 'Proc. 9th Intl. Conf. SEFM, LNCS 7431',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-24690-6_21' }],
  },
  {
    year: 2011,
    title: 'Monitoring Aspects for the Customization of Automatically Generated Code for Big-Step Models',
    authors: 'S. Esmaeilsabzali, B. Fischer and J. Atlee',
    venue: 'Proc. 10th Intl. Conf. GPCE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/2189751.2047884' }],
  },
  {
    year: 2011,
    title: 'Comparison of Context-free Grammars Based on Parsing Generated Test Data',
    authors: 'B. Fischer, R. Laemmel and V. Zaytsev',
    venue: 'Proc. 4th Intl. Conf. SLE, LNCS 6940',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-28830-2_18' }],
  },
  {
    year: 2011,
    title: 'Bounded Model Checking for Multi-threaded Software using SMT-Solvers',
    authors: 'L. Cordeiro and B. Fischer',
    venue: 'Proc. 33rd Intl. Conf. ICSE',
    note: 'ACM Distinguished Paper Award',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/1985793.1985839' }],
  },
  // 2010
  {
    year: 2010,
    title: 'Industrial-Strength Certified SAT Solving through Verified SAT Proof Checking',
    authors: 'A. Darbari, B. Fischer, and J. Marques-Silva',
    venue: 'Proc. 7th Intl. Colloquium ICTAC, LNCS 6255',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-14808-8_18' }],
  },
  {
    year: 2010,
    title: 'Generating correct and efficient equality and hashing methods using JEqualityGen',
    authors: 'N. Grech, B. Fischer, and J. Rathke',
    venue: 'Proc. 9th Intl. Conf. GPCE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/1942788.1868320' }],
  },
  {
    year: 2010,
    title: 'Deriving Safety Cases for Hierarchical Systems in Model-based Development',
    authors: 'N. Basir, E. Denney and B. Fischer',
    venue: 'Proc. 29th Intl. Conf. SAFECOMP, LNCS 6351',
    note: 'Best Presentation Award',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-642-15651-9_6' }],
  },
  {
    year: 2010,
    title: 'Continuous Verification of Large Embedded Software Using SMT-Based Bounded Model Checking',
    authors: 'L. Cordeiro, B. Fischer, and J. Marques-Silva',
    venue: 'Proc. 17th IEEE Intl. Conf. Workshops ECBS',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ECBS.2010.24' }],
  },
  // 2009
  {
    year: 2009,
    title: 'Deriving Safety Cases from Automatically Constructed Proofs',
    authors: 'N. Basir, E. Denney and B. Fischer',
    venue: 'Proc. 4th IET International Conference on System Safety',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1049/cp.2009.1535' }],
  },
  {
    year: 2009,
    title: 'SMT-Based Bounded Model Checking for Embedded ANSI-C Software',
    authors: 'L. Cordeiro, B. Fischer, and J. Marques-Silva',
    venue: 'Proc. 24th Intl. Conf. ASE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ASE.2009.63' }],
  },
  {
    year: 2009,
    title: 'A Verification-Driven Approach to Traceability and Documentation for Auto-Generated Mathematical Software',
    authors: 'E. Denney and B. Fischer',
    venue: 'Proc. 24th Intl. Conf. ASE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ASE.2009.71' }],
  },
  {
    year: 2009,
    title: 'Program Repair as Sound Optimization of Broken Programs',
    authors: 'B. Fischer, A. Saabas, and T. Uustalu',
    venue: 'Proc. 3rd Intl. Conf. TASE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/TASE.2009.61' }],
  },
  // 2008
  {
    year: 2008,
    title: 'Generating Customized Verifiers for Automatically Generated Code',
    authors: 'E. Denney and B. Fischer',
    venue: 'Proc. 7th Intl. Conf. GPCE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/1449913.1449926' }],
  },
  {
    year: 2008,
    title: 'Constructing a Safety Case for Automatically Generated Code from Formal Program Verification Information',
    authors: 'N. Basir, E. Denney and B. Fischer',
    venue: 'Proc. 27th Intl. Conf. SAFECOMP, LNCS 5219',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-540-87698-4_22' }],
  },
  // 2006
  {
    year: 2006,
    title: 'An Empirical Evaluation of Automated Theorem Provers in Software Certification',
    authors: 'E. Denney, B. Fischer, and J. Schumann',
    venue: 'International Journal on Artificial Intelligence Tools',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1142/S0218213006002576' }],
  },
  {
    year: 2006,
    title: 'A Generic Annotation Inference Algorithm for the Safety Certification of Automatically Generated Code',
    authors: 'E. Denney and B. Fischer',
    venue: 'Proc. GPCE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1145/1173706.1173725' }],
  },
  // 2005
  {
    year: 2005,
    title: 'Certifiable Program Generation',
    authors: 'E. Denney and B. Fischer',
    venue: 'Proc. 4th Intl. Conf. GPCE, LNCS 3676',
    note: 'Invited paper',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/11561347_3' }],
  },
  // 2003
  {
    year: 2003,
    title: 'AutoBayes: A System for Generating Data Analysis Programs from Statistical Models',
    authors: 'B. Fischer and J. Schumann',
    venue: 'J. Functional Programming',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1017/S0956796802004562' }],
  },
  {
    year: 2003,
    title: 'Correctness of Source-Level Safety Policies',
    authors: 'E. Denney and B. Fischer',
    venue: 'Proc. Formal Methods (FM), LNCS 2805',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/978-3-540-45236-2_48' }],
  },
  // 2002
  {
    year: 2002,
    title: 'Synthesizing Certified Code',
    authors: 'M. Whalen, J. Schumann, and B. Fischer',
    venue: 'Proc. FME, LNCS 2391',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1007/3-540-45614-7_25' }],
  },
  // 2001
  {
    year: 2001,
    title: 'Deduction-Based Software Component Retrieval',
    authors: 'B. Fischer',
    venue: 'PhD Thesis, Universität Passau',
  },
  {
    year: 2001,
    title: 'The AutoBayes Program Synthesis System--System Description',
    authors: 'B. Fischer, T. Pressburger, G. Rosu, and J. Schumann',
    venue: 'Proc. 9th Symp. Integration of Symbolic Computation and Mechanized Reasoning',
  },
  // 2000
  {
    year: 2000,
    title: 'Specification-Based Browsing of Software Component Libraries',
    authors: 'B. Fischer',
    venue: 'Automated Software Engineering',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1023/A:1008766409590' }],
  },
  // 1999
  {
    year: 1999,
    title: 'An Integration of Deductive Retrieval into Deductive Synthesis',
    authors: 'B. Fischer and J. Whittle',
    venue: 'Proc. 14th Intl. Conf. ASE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ASE.1999.802092' }],
  },
  // 1998
  {
    year: 1998,
    title: 'Deduction-Based Software Component Retrieval',
    authors: 'B. Fischer, J. Schumann, and G. Snelting',
    venue: 'Automated Deduction - A Basis for Applications, Kluwer',
  },
  {
    year: 1998,
    title: 'Specification-Based Browsing of Software Component Libraries',
    authors: 'B. Fischer',
    venue: 'Proc. 13th Intl. Conf. ASE',
    note: 'Best Paper Award and ASE 2012 Most Influential Paper Award',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ASE.1998.732577' }],
  },
  // 1997
  {
    year: 1997,
    title: 'NORA/HAMMR: Making Deduction-Based Software Component Retrieval Practical',
    authors: 'J. Schumann and B. Fischer',
    venue: 'Proc. 12th Intl. Conf. ASE',
    links: [{ label: 'DOI', url: 'http://dx.doi.org/10.1109/ASE.1997.632845' }],
  },
];

/** Build year groups for AchievementsTimeline (newest first). */
export function getBerndFischerYearGroups(): Array<{ year: number; publications: Array<{ title: string; authors?: string; venue?: string; year: number; award?: string }> }> {
  const byYear = new Map<number, typeof berndFischerPublications>();
  for (const p of berndFischerPublications) {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year)!.push(p);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, pubs]) => ({
      year,
      publications: pubs.map((pub) => ({
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
        award: pub.note ?? undefined,
      })),
    }));
}
