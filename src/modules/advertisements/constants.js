export default {
  NAME: "advertisements",
};

//PUBLIC_URL replaced by path to public folder at build time
export const pathToAds = process.env.PUBLIC_URL + "/img/ads/";

export const adRedirects = [['kweller', "http://www.kwellerprep.com"],
                            ['aimplus', "http://www.aimpluseducation.com"],
                            ['tutorverse', "https://thetutorverse.com/stuy"],
                            ['manhattanace', "http://www.manhattan-ace.org/"]
                             ];
