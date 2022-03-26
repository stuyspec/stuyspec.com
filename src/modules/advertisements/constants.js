export default {
  NAME: 'advertisements',
};

// PUBLIC_URL replaced by path to public folder at build time
export const pathToAds = `${process.env.PUBLIC_URL}/img/ads/`;

export const adRedirects = [['kweller', 'http://www.kwellerprep.com'],
  ['tutorverse', 'https://thetutorverse.com/stuy'],
  ['manhattanace', 'http://www.manhattan-ace.org/'],
  ['georgetown', 'https://qrco.de/stuy-hoya'],
  ['parsons', 'https://qrco.de/stuy-parsons'],
  ['columbia', 'https://qrco.de/stuy-cbs'],
  ['rochester', 'https://qrco.de/stuy-roch'],
];
