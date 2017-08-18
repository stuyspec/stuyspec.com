import { createSelector } from "reselect";

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
 *   children of a props-requested section. It is used for the subsection bar
 *   on the SectionPage.
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
 *   a target section for section and subsection routing. It is used for
 *   getting all articles in a section's tree.
 */
export const getSlugsInSectionTree = createSelector(
  [ getSections, getSectionFromProps ],
  (sections, targetSection) => {
    const subsectionsInSectionTree = getSubsectionsInSectionTree(sections, targetSection)
    return [ targetSection.slug, ...Object.keys(subsectionsInSectionTree) ];
  }
);

/**
 * The selector returns an object with only top level sections (no parents).
 */
export const getTopLevelSections = createSelector(
  [ getSections ],
  (sections) => {
    return Object.filter(sections, section => {
      return section.parentSlug === null;
    });
  }
)

/**
 * The selector returns a sections object in which all nested section objects
 *   contain the section's direct and indirect section children.
 */
export const getTopLevelSectionsWithChildren = createSelector(
  [ getSections, getTopLevelSections ],
  (sections, topLevelSections) => {
    return Object.values(topLevelSections).reduce((acc, topLevelSection) => {
      acc[ topLevelSection.slug ] = {
        ...topLevelSection,
        subsections: getSubsectionsInSectionTree(sections, topLevelSection),
      };
      return acc;
    }, {})
  }
);

export const getSectionSlugFromId = (sections, id) => {
  return Object.values(
    Object.filter(sections, section => section.id === id)
  )[ 0 ].slug;
};