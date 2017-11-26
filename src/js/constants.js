//export const STUY_SPEC_API_URL = "https://api.stuyspec.xyz";
export const STUY_SPEC_API_URL = "https://api.stuyspec.com";//"http://localhost:3000";
export const STUY_SPEC_URL = "https://staging.stuyspec.com";

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
export const SPEC_REEFER_PATTERN = /<spec-reefer id=(\d*)><\/spec-reefer>/;