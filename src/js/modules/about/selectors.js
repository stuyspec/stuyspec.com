import {createSelector} from 'reselect';

export const getAboutPages = state => state.about;

export const getParentAboutPagesWithChildren = createSelector(
  [ getAboutPages ],
  (aboutPage) => {
    let parentAboutPages = {};
    Object.keys(aboutPage).map((aboutSlug) => {
      const targetAboutPage = aboutPage[ aboutSlug ];
      if (targetAboutPage.parent === null) {
        parentAboutPages[ aboutSlug ] = {
          ...targetAboutPage,
          childAboutPages: Object.filter(aboutPage, aboutPage => {
            return aboutPage.parent === targetAboutPage.slug;
          })
        };
      }
    });
    console.log(parentAboutPages);
    return parentAboutPages;
  }
);