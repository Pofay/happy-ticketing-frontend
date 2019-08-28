import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from '../../components/MenuBar';
import { Grid, List, ListItem } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import dummyProjects from '../../example-projects.json';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: '2%',
    marginRight: '2%'
  }
}));

const Projects = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MenuBar title={'Projects Page'} />
      <Grid container spacing={16}>
        <List component="nav">
          {dummyProjects.data.map(p => (
            <ListItem key={p.id}>
              <Link to={`projects/${p.id}`}>{p.name}</Link>
            </ListItem>
          ))}
        </List>
      </Grid>
    </div>
  );
};

export default Projects;
