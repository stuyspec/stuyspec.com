import gql from "graphql-tag";

export const UserByUIDQuery = gql`
  query UserByUIDQuery($uid: String!) {
    userByUID(uid: $uid) {
      id
      first_name
      last_name
    }
  }
`;
