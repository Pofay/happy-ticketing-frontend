import { createSelector } from 'reselect';
const getMembers = state => state.members.byId;

const getMemberIds = (state, props) => {
  const { projectId } = props;
  return state.projects.byId[projectId].members;
};

const makeGetMembersForProject = () =>
  createSelector(
    [getMembers, getMemberIds],
    (members, memberIds) => memberIds.map(id => members[id])
  );

export const makeMapStateToProps = () => {
  const getMembersForProject = makeGetMembersForProject();

  const mapStateToProps = (state, props) => ({
    members: getMembersForProject(state, props)
  });

  return mapStateToProps;
};
