import { createSelector } from "reselect";
import { objectFilter } from "../../utils.js";

Object.filter = objectFilter;

export const getSections = (state) => state.sections.sections;
export const getSectionFromProps = (state, props) => props.section;

/**
 * The selector returns a filtered sections object which contains direct and
 *   indirect children of a target section.
 */
const getSubsectionsInSectionTree = (sections, targetSection) => {
  return Object.filter(sections, upwardsTraversingSection => {
    while (upwardsTraversingSection.parentSlug !== null) {
      upwardsTraversingSection = sections[ upwardsTraversingSection.parentSlug ];
    }
    return upwardsTraversingSection === targetSection;
  });
};

/**
 * The selector returns a filtered sections object which contains direct
 *   children of the props-requested section,
 */
export const getDirectSubsections = createSelector(
  [ getSections, getSectionFromProps ],
  (sections, targetSection) => {
    return Object.filter(sections, section => {
      return section.parentSlug === targetSection.slug;
    })
  }
)

/**
 * The selector returns an array of all direct and indirect section children of
 *   a target section for section and subsection routing.
 */
export const getSlugsInSectionTree = createSelector(
  [ getSections, getSectionFromProps ],
  (sections, targetSection) => {
    const subsectionsInSectionTree = getSubsectionsInSectionTree(sections, targetSection)
    return [ targetSection.slug, ...Object.keys(subsectionsInSectionTree) ];
  }
);

/**
 * The selector returns a sections object in which all nested section objects
 *   contain the section's direct and indirect section children.
 */
export const getTopLevelSectionsWithDirectChildren = createSelector(
  [ getSections ],
  (sections) => {
    let topLevelSectionsWithDirectChildren = {};
    Object.keys(sections).map((sectionSlug) => {
      const targetSection = sections[ sectionSlug ];
      if (targetSection.parentSlug === null) {
        topLevelSectionsWithDirectChildren[ sectionSlug ] = {
          ...targetSection,
          subsections: Object.filter(sections, section => {
            return section.parentSlug === targetSection.slug;
          })
        };
      }
    });
    return topLevelSectionsWithDirectChildren;
  }
);

export const getSectionSlugFromId = (sections, id) => {
  return Object.entries(
    Object.filter(sections, section => section.id === id)
  )[ 0 ];
};