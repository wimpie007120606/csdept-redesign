/**
 * Prof. Lynette van Zijl — achievements timeline (verbatim).
 * Each entry: citation (full text), hasPdf, award.
 */

export interface AchievementEntry {
  citation: string;
  hasPdf?: boolean;
  award?: string;
}

export interface YearGroup {
  year: number;
  publications: AchievementEntry[];
}

export const lynetteAchievementsByYear: YearGroup[] = [
  {
    year: 2025,
    publications: [
      {
        citation:
          'W van der Linden, T Grobler, L van Zijl, A robust dot-focused classification approach to convolutional Braille recognition. Accepted, to appear in Journal of Universal Computer Science, 2025.',
      },
    ],
  },
  {
    year: 2023,
    publications: [
      { citation: 'L van Staden, L van Zijl, Parsing semi-structured languages: a crochet to diagram translation. SAICSIT 2023.' },
      {
        citation:
          'TL Grobler, M Habeck, L van Zijl, J Geldenhuys, Search Algorithms for the Combinatorial Generation of Box Repetition-Free Words. Journal of Universal Computer Science, Vol 29(2), Feb 2023, pp 100--117.',
        hasPdf: true,
      },
      {
        citation:
          'J Weight, T Grobler, L van Zijl, C Stewart, A tight upper bound on the length of maximal bordered box repetition-free words. Proceedings of the 25th International Conference on Descriptional Complexity of Formal Systems (DCFS) 2023, Potsdam, Germany, July 2023.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2022,
    publications: [
      { citation: 'C Zeeman, L van Zijl, Shape generation with clustering cellular automata. ASCAT 2022.', hasPdf: true },
      {
        citation:
          'L Marais, L van Zijl, Descriptional complexity of non-unary self-verifying symmetric difference automata. International Journal on Foundations of Computer Science, Vol 33 (4), 313--333, 2022.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2020,
    publications: [
      {
        citation:
          'J Mouton, L van Zijl, M Schurch, Improved automated recognition of leopards from photographs. African Journal of Wildlife Research 50(1),pp 190-198, Dec 2020.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2018,
    publications: [
      {
        citation:
          'L Marais, L van Zijl, The state complexity of language operations on XNFA-succinct unary regular languages. SAICSIT, Sep 2018, Port Elizabeth.',
        hasPdf: true,
      },
      {
        citation: 'R. Adams, L. van Zijl, Ant sorting based on cellular automata with clustering. SAICSIT, Sep 2018, Port Elizabeth.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2017,
    publications: [
      {
        citation:
          'L Marais, L van Zijl, Descriptional complexity of non-unary SV-XNFA. 15th International Conference on Automata and Formal Languages (AFL), Debrecen, Hungary, September 2017. Electronic Proceedings in Computer Science, Vol 252, pp 157--169, 2017.',
        hasPdf: true,
      },
      {
        citation:
          'L Marais, L van Zijl, State complexity of unary SV-XNFA with different acceptance conditions. 19th International Conference on Descriptional Complexity of Formal Systems (DCFS) 2017, 3-5 July, Milan, Italy. Lecture Notes in Computer Science Vol 10316, pp 250--261.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2016,
    publications: [
      {
        citation:
          'L Marais, L van Zijl, Selfverifying unary symmetric difference NFAs. 18th International Conference on Descriptional Complexity of Formal Systems (DCFS) 2016, 5-8 July 2016, Bucharest, Romania. Lecture Notes in Computer Science Vol 9777, pp 29--44.',
        hasPdf: true,
      },
      {
        citation:
          'MF Msiska, L van Zijl, Interpreting the subset construction using finite sublanguages. Proceedings of the Prague Stringology Conference, 29-31 August 2016, Prague, Czech Republic, pp 48--62.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2015,
    publications: [
      {
        citation: 'L van Zijl, Clustering in 1D binary elementary cellular automata. Proceedings of SAICSIT 2015, Stellenbosch, September 2015.',
        hasPdf: true,
      },
      {
        citation: 'HAC de Villiers, L van Zijl, TR Niesler, High-level rapid prototyping of graphical models. Proceedings of PRASA 2015, Port Elizabeth.',
      },
      {
        citation:
          'R Kruger, L van Zijl, Virtual world accessibility with the Perspective viewer, Proc of ICEAPVI, 12--15 Feb 2015, Athens, Greece.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2014,
    publications: [
      {
        citation:
          'L van Zijl, Cellular automata in content-based image retrieval. In Rosin, Adamatzky, Sun (eds), Cellular Automata in Image Processing and Geometry, Springer Verlag, 2014. Chapter 8, pages 147--162.',
      },
      {
        citation:
          'R Kruger, L van Zijl, Rendering virtual worlds in audio and text, 6th International Workshop on Massive Multi-user Virtual Environments, Singapore, 2014 (short paper).',
        hasPdf: true,
      },
      {
        citation:
          'AB van der Merwe, L van Zijl, J Geldenhuys, Ambiguity and structural ambiguity of symmetric difference NFAs. Theoretical Computer Science, vol 537, June 2014, pp 97--104.',
        hasPdf: true,
      },
      {
        citation:
          'JP Bosman, M Lyner-Cleophas, A vd Merwe, L van Zijl, Exploring alternative modes of class attendance for students within an inclusive education framework at Stellenbosch University. SOTL conference, Stellenbosch, 2014 (not peer-reviewed).',
      },
    ],
  },
  {
    year: 2013,
    publications: [
      {
        citation:
          'L van Zijl, J Geldenhuys, Symmetric Difference NFAs: State of the Art. In Gruner, S, Watson B, Formal Aspects of Computing. Shaker Verlag, 2013. Part II, Chapter 4, pp 74--92.',
      },
    ],
  },
  {
    year: 2012,
    publications: [
      {
        citation:
          "HAC de Villiers, L van Zijl, T Niesler, Vision-based hand pose estimation through similarity search using the Earth Mover's Distance. IET Vision 6:4, July 2012, pp 285--295.",
      },
      {
        citation:
          'AB van der Merwe, H Tamm, L van Zijl, Minimal DFA for symmetric difference NFA. Proceedings of International Conference on Descriptional Complexity of Formal Systems (DCFS), June 2012, Portugal. LNCS Vol 7386 pp 307--318.',
        hasPdf: true,
      },
      {
        citation: 'M Msiska, L van Zijl, From visual scripting to Lua. Proceedings of SAICSIT 2012, Irene, October 2012.',
        hasPdf: true,
      },
      {
        citation: 'L van Zijl, Semantic Computing. Keynote speech at UNISA Research and Innovation Day, September 11, Pretoria.',
      },
      {
        citation: 'L van Zijl, Bridging the communication gap -- a South African perspective. SIGACCESS Newsletter, September 2012.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2011,
    publications: [
      {
        citation:
          'J Bergh, A Gerber, T Meyer, L van Zijl, Path Analysis for Ontology Comprehension, Australasian Ontology Workshop, 24th Australasian Joint Conference on Artificial Intelligence, Dec 2011, Perth, Australia.',
        award: 'BEST PAPER AWARD',
      },
      {
        citation:
          'AB van der Merwe, L van Zijl, J Geldenhuys, Ambiguity of unary symmetric difference NFAs. ICTAC 2011, Johannesburg, September 2011. Lecture Notes in Computer Science 6916, pp 256--266.',
        hasPdf: true,
      },
      {
        citation:
          'L van Zijl, J. Geldenhuys, Descriptional Complexity of Ambiguity in Symmetric Difference NFAs. Journal of Universal Computer Science, Vol 17 No 6, June 2011, pp 874--890.',
        hasPdf: true,
      },
      {
        citation:
          'L van Zijl, W Venter, An ECA with Asperger\'s Syndrome. Proceedings of CSEDU 2011, Vol 1, pp 153--158, May 2011, The Netherlands.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2010,
    publications: [
      {
        citation:
          'HAC de Villiers, TR Niesler, L van Zijl, Balancing Runtime Space- and Time Complexity in Synthetic Database Driven Hand Posture Reconstruction Systems. Proceedings of PRASA, South Africa, November 2010.',
        hasPdf: true,
      },
      {
        citation:
          'M.E. Chamberlain, L. van Zijl, A Generic Development Platform for ASD Therapy Tools. Proceedings of the International Conference on Computer Science Education, Valencia, Spain, April 2010.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2009,
    publications: [
      { citation: 'L. van Zijl, L. Raitt, Random Generation of Unary DFAs. South African Computer Journal, December 2008.', hasPdf: true },
      {
        citation:
          'J. Geldenhuys, A.B. van der Merwe, L. van Zijl, Reducing Nondeterministic Finite Automata with SAT Solvers. Proceedings of 8th International Workshop on Finite State Methods and Natural Language Processing, July 2009. Lecture Notes in Artificial Intelligence Vol 6062, pp 81--92.',
        hasPdf: true,
      },
      {
        citation: 'L. Botha, L. van Zijl, M. Hoffmann, Realtime LEGO Brick Image Retrieval with Cellular Automata. Journal of Universal Computer Science, 2009.',
        hasPdf: true,
      },
      {
        citation: 'L. van Zijl, L. Botha, Feature Extraction for Image Pattern Matching with Cellular Automata. Proceedings of the Prague Stringology Conference, August 2009.',
        hasPdf: true,
      },
      {
        citation: 'M.E. Chamberlain, L. van Zijl, A 3D Virtual Environment Development Platform for ASD Therapy Tools. Presentation at ESPRESSO Workshop, Pretoria, October 2009.',
      },
    ],
  },
  {
    year: 2008,
    publications: [
      {
        citation: 'L. van Zijl, E. Smal, Cellular Automata with Cell Clustering. Proceedings of AUTOMATA2008 Workshop, Bristol, UK, June 2008, pp 425--440.',
        hasPdf: true,
      },
      {
        citation:
          "J. Bungeroth, D. Stein, F. Dreuw, H. Ney, S. Morrisey, A. Way, L. van Zijl, The ATIS Sign Language Corpus. Proceedings of the International Conference on Language Resources and Evaluation (LREC'08), Morocco, May 2008.",
        hasPdf: true,
      },
      {
        citation: 'L. van Zijl, G. Olivrin, South African Sign Language Assistive Translation. Proceedings of the IASTED International Conference on Assistive Technologies, April 2008, Baltimore, USA.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2007,
    publications: [
      { citation: 'L. van Zijl, Ambiguity in Symmetric Difference NFAs. Invited talk at FASTAR/Espresso Workshop, Pretoria, October 2007.' },
      {
        citation: 'L. van Zijl and J. Fourie, Design and Development of a Generic Signing Avatar. Proceedings of Graphics and Visualization in Engineering, Florida, USA, January 2007, pp 95--100.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 2006,
    publications: [
      {
        citation:
          "L. van Zijl, South African Sign Language machine translation project, ASSETS'06 Proceedings of the 8th international ACM SIGACCESS conference on Computers and Accessibility, 2006, Portland, USA.",
        hasPdf: true,
      },
      {
        citation:
          "L. van Zijl and A. Combrink, The South African Sign Language Machine Translation Project: Issues on Non-manual Sign Generation. Proceedings of SAICSIT06, 9--11 October 2006, Somerset West, South Africa, pp 127--134.",
        hasPdf: true,
      },
    ],
  },
  {
    year: 2005,
    publications: [
      {
        citation: 'L. van Zijl, Magic Numbers for Symmetric Difference NFAs. International Journal of the Foundations of Computer Science, Vol 16 No 5, October 2005, pp. 1027--1038. (Revised version of DCFS2004 paper.)',
        hasPdf: true,
      },
      {
        citation: 'L. van Zijl, J. Daciuk, G. Mueller, Minimization of Unary Symmetric Difference NFAs. South African Computer Journal, July 2005, pp. 64--74. (Extended version of SAICS04 paper.)',
        hasPdf: true,
      },
      { citation: 'L. van Zijl, Cellular Automata, Generalized Nondeterminism and Succinct Representations of Regular Languages. Talk given at Automata 2005, Gdansk, Poland, September 2005.' },
      {
        citation: 'L. van Zijl, M. Hoffmann, The Development of a Plagiarism Detection System. Proceedings of SACLA2005, Kasane, Botswana, July 2005.',
      },
    ],
  },
  {
    year: 2004,
    publications: [
      {
        citation: 'L. van Zijl, On Binary Symmetric Difference NFAs and Succinct Descriptions of Regular Languages. Theoretical Computer Science, Vol 328 No 1, November 2004, pp 161--170. Copyright to this work belongs to Elsevier.',
        hasPdf: true,
      },
      {
        citation: 'L. van Zijl, Generalized acceptance, succinctness and supernondeterministic finite automata. Theoretical Computer Science, Vol 313 No 1, February 2004, pp 159 -- 172. Copyright to this work belongs to Elsevier.',
        hasPdf: true,
      },
      {
        citation: 'Assistive technologies for the Deaf: talk given at Africasource, a meeting for Free and Open Source software developers in Africa.',
      },
      {
        citation: 'Symmetric Difference NFAs and their Applications. Invited talk at Eindhoven FASTAR Workshop at Eindhoven University, September 2004. Proceedings published as Technical Report at Eindhoven University.',
      },
      {
        citation: 'L. van Zijl, Magic Numbers for Symmetric Difference NFAs. Poster paper at CIAA2004, Kingston, Canada, July 2004. Lecture Notes in Computer Science Vol. 3317, pp. 333--334, January 2005.',
      },
      {
        citation: 'L. van Zijl, Magic Numbers for Symmetric Difference NFAs. Preproceedings of DCFS 2004, London, Ontario, Canada, July 2004, pp. 274--284. This is an extended version of the CIAA2004 paper above.',
        hasPdf: true,
      },
      {
        citation: 'L. van Zijl, L. Raitt, Implementation experience with collision avoidance in signing avatars, AFRIGRAPH 04 Proceedings of the 3rd international conference on Computer graphics, virtual reality, visualisation and interaction in Africa, 2004.',
        hasPdf: true,
      },
      {
        citation: 'L. van Zijl, G. Mueller, Minimization of Unary Symmetric Difference NFAs. Proceedings of SAICSIT 2004, October 2004, Stellenbosch, South Africa. ACM International Proceedings Series, 2004.',
      },
    ],
  },
  {
    year: 2003,
    publications: [
      {
        citation: 'L. van Zijl, Succinct Descriptions of Regular Languages with Binary Symmetric Difference NFAs. Proc. of the 8th International Conference on the Implementation and Applicaton of Automata (CIAA2003), Santa Barbara, California, July 2003. Lecture Notes in Computer Science Vol 2759, July 2003, pp. 72--82. Copyright to this work belongs to Springer-Verlag.',
      },
      {
        citation: 'L. van Zijl, D. Barker, A Machine Translation System for South African Sign Language. Proc. Afrigraph 2003, ACM SIGGRAPH Conference Series, Febr. 2003, Cape Town, South Africa. Copyright to this work belongs to the ACM.',
      },
    ],
  },
  {
    year: 2002,
    publications: [
      {
        citation: 'L. van Zijl, Random Number Generation with Symmetric Difference NFAs. Proc. of 6th International Conference on the Implementation and Applicaton of Automata (CIAA2001), Pretoria, South Africa, July 2001. Lecture Notes in Computer Science Vol. 2494, October 2002, pp. 263--273. Copyright to this work belongs to Springer-Verlag.',
      },
      {
        citation: 'L. van Zijl, Supernondeterministic Finite Automata. Proc. of 6th International Conference on the Implementation and Applicaton of Automata (CIAA2001), Pretoria, South Africa, July 2001. Lecture Notes in Computer Science Vol. 2494, October 2002, pp. 274--288. Copyright to this work belongs to Springer-Verlag.',
      },
      {
        citation: 'H. Hakl, L. van Zijl, Diamond Terrain Algorithm: Continuous Levels of Detail for Height Fields. South African Computer Journal Vol. 29, December 2002.',
        hasPdf: true,
      },
      {
        citation: 'L. van Zijl, Nondeterminism and Succinctly Representable Regular Languages. Proc. SAICSIT2002, ACM International Proceedings Series, Port Elizabeth, South Africa. Copyright to this work belongs to the ACM.',
      },
    ],
  },
  {
    year: 2001,
    publications: [
      {
        citation: 'L. van Zijl, F. Olivier, J.-P. Harper, The MERLin Environment applied to *-NFAs. Proc. of the CIAA 2000, July 2000, London, Ontario, Canada. Lecture Notes in Computer Science Vol. 2081, 2001. Copyright to this work belongs to Springer-Verlag.',
      },
    ],
  },
  {
    year: 2000,
    publications: [
      {
        citation: 'J. Eloff and L. van Zijl, An Incremental Construction Algorithm for Venn Diagrams. SAICSIT-2000, Cape Town, South Africa, November 2000.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 1999,
    publications: [
      {
        citation: 'L. van Zijl, A.P.J. van der Walt, Some Automata-Theoretic Properties of Intersection-NFAs. South African Computer Journal No 24, November 1999.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 1997,
    publications: [
      {
        citation: 'L. van Zijl, Generalized Nondeterminism and the Succinct Representation of Regular Languages. PhD dissertation, Stellenbosch University, 1997.',
        hasPdf: true,
      },
    ],
  },
  {
    year: 1991,
    publications: [
      {
        citation: 'L. van Zijl, D. Mitton, Using statecharts to design and specify a direct manipulation user interface. In Proceedings of the Southern African Computing Symposium (pp. 51-68).',
      },
    ],
  },
];
