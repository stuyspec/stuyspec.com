import { createSelector } from 'reselect'

const getSections = (state) => state.sections.sections;

const getSectionByProps = (state, props) => props.section;
const getSubsectionsByProps = (state, props) => props.subsections;

export const getDeepSectionSlugsList = createSelector(
  [ getSectionByProps, getSubsectionsByProps ],
  (section, subsections = {}) => {
    return [ section.slug, ...Object.keys(subsections) ];
  }
);

/* Writes the filter function for objects.
 * predicate is the function which keys/properties must match
 */
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[ key ]))
    .reduce((res, key) => (res[ key ] = obj[ key ], res), {});

/**
 * Returns a modified version of state.sections.sections for Routes.
 * For each section, its subsections and the path to itself are defined.
 */
export const getAllSectionRoutes = createSelector(
  getSections,
  (sections) => {
    let sectionRoutes = {};
    Object.keys(sections).map(function (key) {
      const section = sections[ key ];
      let pathToSectionPage = '/' + section.slug;
      let subsections = {};
      if (section.parentSlug !== null) { // this section is a subsection
        pathToSectionPage = '/' + section.parentSlug + '/' + section.slug;
      } else { // this section is a parent
        subsections = Object.filter(sections, (potentialSubsection) => {
          return potentialSubsection.parentSlug === section.slug;
        });
      }
      sectionRoutes[ key ] = {
        ...section,
        pathToSectionPage: pathToSectionPage,
        subsections: subsections,
      }
    });
    return sectionRoutes;
  }
);

/**
 * Returns a modified version of state.sections.sections for Links from the
 *     home page.
 * For each section, its path to itself is defined.
 */
export const getAllSectionLinksFromHome = createSelector(
  getSections,
  (sections) => {
    let sectionLinks = {};
    Object.keys(sections).map((key) => {
      const section = sections[ key ];
      let pathToSectionPage = section.slug;
      if (section.parentSlug !== null) { // this section is a subsection
        pathToSectionPage = '/' + section.parentSlug + '/' + section.slug;
      }
      sectionLinks[ key ] = {
        ...section,
        pathToSectionPage: pathToSectionPage,
      }
    });
    return sectionLinks;
  }
)