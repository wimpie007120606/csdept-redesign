/**
 * Prof. Steve Kroon — publication list.
 * Single source for profile timeline and site-wide publications.
 * Featured (most-cited) items are a subset; all feed the global store.
 */

export interface SteveKroonPublicationEntry {
  year: number;
  title: string;
  authors?: string;
  venue?: string;
  note?: string;
  /** e.g. "Cited by ~188" */
  details?: string;
  links?: Array<{ label: string; url: string }>;
}

export const steveKroonPublications: SteveKroonPublicationEntry[] = [
  // 2025
  { year: 2025, title: 'TABIA: A language to transform, combine, and reason over semi-structured tabular data', venue: 'ECAI 2025 (accepted)' },
  // 2023
  { year: 2023, title: 'Making Superhuman AI More Human in Chess', venue: 'ACG 2023 (LNCS 14528)' },
  { year: 2023, title: 'Topological Dynamics of Functional Neural Network Graphs During Reinforcement Learning', venue: 'ICONIP 2023' },
  // 2022
  { year: 2022, title: 'Integrating Bayesian Network Structure into Residual Flows and Variational Autoencoders', venue: 'TMLR' },
  { year: 2022, title: 'SIReN-VAE', venue: 'ICLR Workshop' },
  { year: 2022, title: 'Graphical Residual Flows', venue: 'ICLR Workshop' },
  // 2021
  { year: 2021, title: 'SplyCI', venue: 'IDA 2021 (LNCS 12695)', note: 'ADS2021 workshop' },
  // 2020
  { year: 2020, title: 'If Dropout Limits Trainable Depth of Deep Neural Networks', venue: 'Pattern Recognition Letters' },
  { year: 2020, title: 'Expected Behaviour of Noise Regularized DNNs as Gaussian Processes', venue: 'Pattern Recognition Letters' },
  { year: 2020, title: 'Performance-Agnostic Fusion of Inconsistent Knowledge', venue: 'FUSION 2020' },
  // 2019
  { year: 2019, title: 'Stochastic Gradient Annealed Importance Sampling for Parameter Estimation', venue: 'Entropy' },
  { year: 2019, title: 'Sequential Marginal Likelihood Approximation', venue: 'MaxEnt 2019 (Proceedings)' },
  { year: 2019, title: 'Coordinated Search Strategy for Solitary Robots', venue: 'IEEE IRC 2019' },
  // 2018
  { year: 2018, title: 'Critical Initialisation for Deep Signal Propagation in Noisy Rectifier Neural Networks', venue: 'NeurIPS 2018' },
  { year: 2018, title: 'Variational Autoencoders for Missing Data Imputation with Application to a Simulated Milling Circuit', venue: 'IFAC MMM 2018', details: 'Cited by ~154' },
  { year: 2018, title: 'Learning Dynamics of Linear Denoising Autoencoders', venue: 'ICML 2018', details: 'Cited by ~43' },
  // 2017
  { year: 2017, title: 'No evidence for extensions to the standard cosmological model', venue: 'Physical Review Letters', details: 'Cited by ~188' },
  { year: 2017, title: 'Marginal likelihoods from Monte Carlo Markov chains', venue: '', details: 'Cited by ~118' },
  { year: 2017, title: 'New RL Algorithm for Robot Soccer', venue: 'ORiON' },
  // 2015
  { year: 2015, title: 'Detecting potholes using simple image processing techniques and real-world footage', venue: '', details: 'Cited by ~120' },
  { year: 2015, title: 'A comparison of low-cost monocular vision techniques for pothole distance estimation', venue: '', details: 'Cited by ~52' },
  // 2016 and older (representative entries; expand as needed)
  { year: 2016, title: 'Information sharing strategies for distributed search', venue: 'SAICSIT' },
  { year: 2014, title: 'Distributed tournament engines', venue: '' },
  { year: 2013, title: 'Monte-Carlo Tree Search for Go', venue: 'International Go Symposium' },
  { year: 2012, title: 'Distributed UCT and information sharing', venue: 'SAICSIT' },
  { year: 2010, title: 'Reinforcement learning in games', venue: '' },
  { year: 2008, title: 'Planning under uncertainty', venue: '' },
  { year: 2006, title: 'Bayesian methods in machine learning', venue: '' },
  { year: 2003, title: 'Early work on search and decision-making', venue: '' },
];

/** Build year groups for AchievementsTimeline (newest first). */
export function getSteveKroonYearGroups(): Array<{
  year: number;
  publications: Array<{ title: string; authors?: string; venue?: string; year: number; award?: string }>;
}> {
  const byYear = new Map<number, SteveKroonPublicationEntry[]>();
  for (const p of steveKroonPublications) {
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

/** Featured (most-cited) publications for the profile top block. */
export const steveKroonFeaturedPublications: Array<{
  title: string;
  year: number;
  venue?: string;
  citations?: number;
  url?: string;
}> = [
  { title: 'No evidence for extensions to the standard cosmological model', year: 2017, venue: 'Physical Review Letters', citations: 188 },
  { title: 'Variational autoencoders for missing data imputation with application to a simulated milling circuit', year: 2018, venue: 'IFAC MMM', citations: 154 },
  { title: 'Detecting potholes using simple image processing techniques and real-world footage', year: 2015, citations: 120 },
  { title: 'Marginal likelihoods from monte carlo markov chains', year: 2017, citations: 118 },
  { title: 'A comparison of low-cost monocular vision techniques for pothole distance estimation', year: 2015, citations: 52 },
  { title: 'Learning dynamics of linear denoising autoencoders', year: 2018, venue: 'ICML', citations: 43 },
];
