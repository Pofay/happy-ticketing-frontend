import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, GridList, GridListTile, Paper } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  section: {
    marginTop: '2%'
  },
  tile: {
    minWidth: 80
  }
}));

const ProjectSummary = props => {
  const classes = useStyles();
  const { tasks, statusTitle } = props;

  return (
    <div className={classes.section}>
      <Typography variant="h6" component="h6">
        {statusTitle}
      </Typography>
      <GridList cellHeight={40} cols={3}>
        {tasks.map(t => (
          <GridListTile key={t.id} className={classes.tile}>
            <Paper component="div" style={showStatus(t.status)}>
              {t.name}
            </Paper>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

const showStatus = status => {
  const commonStyle = {
    border: 'solid',
    textAlign: 'center',
    padding: 5
  };

  if (status === 'PARTIAL')
    return {
      ...commonStyle,
      background: 'linear-gradient(to right, green 50%, white 50%)'
    };
  else if (status === 'COMPLETE')
    return { ...commonStyle, background: 'green' };
  else return commonStyle;
};

export default ProjectSummary;
