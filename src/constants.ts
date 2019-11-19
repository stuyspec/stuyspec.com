// Will get replaced by CRA with relevant environment url
export const STUY_SPEC_API_URL = process.env.REACT_APP_API_URL;

// TODO: a Newspaper model in API that contains an issuu_config
export const ISSUU_CONFIG = 69577246;

export const STUY_SPEC_API_HEADERS = {
  headers: {
    "X-Key-Inflection": "camel",
  },
};

export const PROFILE_SLUGS: { [index: string] : string} = {
  illustration: "illustrators",
  photo: "photographers",
  illustrators: "illustration",
  photographers: "photo",
};

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const SPEC_REFERENCE_PATTERN = /<spec-reference id=(\d*)><\/spec-reference>/;
