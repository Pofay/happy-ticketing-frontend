import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { head } from 'ramda';
import { Tooltip, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  const { projectId } = props;

  const memberIds = state.projects.byId[projectId].members;
  const allMembers = state.members.byId;

  return {
    members: memberIds.map(id => allMembers[id])
  };
};

const useStyles = makeStyles(theme => ({
  avatar: {
    marginLeft: 10,
    marginRight: 5
  }
}));

const ProjectMember = props => {
  const classes = useStyles();
  const { email } = props;
  return (
    <Tooltip title={email}>
      <Avatar className={classes.avatar}>{head(email).toUpperCase()}</Avatar>
    </Tooltip>
  );
};

const ProjectMembers = props => {
  const { members } = props;
  return members.map(m => (
    <div key={m.id}>
      <ProjectMember {...m} />
    </div>
  ));
};

export default connect(mapStateToProps)(ProjectMembers);
