import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { head } from 'ramda';
import { Tooltip, Avatar } from '@material-ui/core';

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

export default ProjectMembers;
