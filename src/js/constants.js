// Will get replaced by gulpfile with relevant environment url
//export const STUY_SPEC_API_URL = "__API_URL_HERE__";
export const STUY_SPEC_API_URL = "https://api.stuyspec.com/";

// TODO: a Newspaper model in API that contains an issuu_config
export const ISSUU_CONFIG = 58064428;

export const STUY_SPEC_API_HEADERS = {
  headers: {
    "X-Key-Inflection": "camel",
  },
};

export const MEDIA_CREATOR_SLUGS = {
  illustration: "illustrators",
  photo: "photographers",
};

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const SPEC_REFERENCE_PATTERN = /<spec-reference id=(\d*)><\/spec-reference>/;
export const SPEC_IMG_CAROUSEL_PATTERN = /<spec-img-carousel><\/spec-img-carousel>/;
