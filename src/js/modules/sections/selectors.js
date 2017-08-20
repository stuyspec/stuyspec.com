import { createSelector } from "reselect";

export const getSections = (state) => state.sections.sections;
export const getSectionFromProps = (state, props) => props.section;

/**
 * The selector returns a filtered sections object which contains direct and
 *   indirect children of a target section.
 */
const getSubsectionsInSectionTree = (sections, targetSection) => {
  return Object.filter(sections, section => {
    // traverse upwards toward parent section
    while (section.parentId !== null) {
      section = sections[ section.parentId ];
    }
    return section === targetSection;
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
      return section.parentId === targetSection.id;
    });
  }
);

/**
 * The selector returns an array of all direct and indirect section children of
 *   a target section for section and subsection routing. It is used for
 *   getting all articles in a section's tree.
 */
export const getSectionTreeIds = createSelector(
  [ getSections, getSectionFromProps ],
  (sections, targetSection) => {
    const subsectionsInSectionTree = getSubsectionsInSectionTree(
      sections,
      targetSection
    );
    return [ targetSection.id, ...Object.keys(subsectionsInSectionTree) ];
  }
);

/**
 * The selector returns an object with only top level sections (sections with
 *   no parents).
 */
export const getTopLevelSections = createSelector(
  [ getSections ],
  sections => {
    return Object.filter(sections, section => {
      return section.parentId === null;
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
      acc[ topLevelSection.id ] = {
        ...topLevelSection,
        subsections: getSubsectionsInSectionTree(sections, topLevelSection),
      };
      return acc;
    }, {});
  }
);