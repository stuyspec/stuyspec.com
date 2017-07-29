import { createSelector } from 'reselect';
import { objectFilter } from '../../utils.js';

Object.filter = objectFilter;

const getSections = (state) => state.sections.sections;
const getSectionByProps = (state, props) => props.section;
const getSubsectionsByProps = (state, props) => props.subsections;

export const getDeepSectionSlugsList = createSelector(
  [ getSectionByProps, getSubsectionsByProps ],
  (section, subsections = {}) => {
    return [ section.slug, ...Object.keys(subsections) ];
  }
);

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
      };
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
      };
    });
    return sectionLinks;
  }
);

const getParentSections = createSelector(
  getSections,
  (sections) => {
    return Object.filter(sections, section => {
      return section.parentSlug === null;
    });
  }
);
const getSubsections = createSelector(
  getSections,
  (sections) => {
    return Object.filter(sections, section => {
      return section.parentSlug !== null;
    });
  }
);

/**
 * Returns a modified version of state.sections.sections for the Footer.
 * For each section, its subsections are included as a key: object.
 */
export const getSectionsWithSubsections = createSelector(
  [ getParentSections, getSubsections ],
  (parentSections, allSubsections) => {
    let sectionsWithSubsections = [];
    Object.keys(parentSections).map((parentSectionSlug) => {
      const sectionWithSubsections = {
        ...parentSections[ parentSectionSlug ],
        subsections: Object.filter(allSubsections, subsection => {
          return subsection.parentSlug === parentSectionSlug;
        }),
      }
      sectionsWithSubsections.push(sectionWithSubsections);
    });
    return sectionsWithSubsections;
  }
);