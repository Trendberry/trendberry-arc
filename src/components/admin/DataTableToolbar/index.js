import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'

import customPropTypes from 'material-ui/utils/customPropTypes'
import IconButton from 'material-ui/IconButton'
import Text from 'material-ui/Text'
import Toolbar from 'material-ui/Toolbar'

const IconAdd = (props) => (
  <SvgIcon {...props}>
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </SvgIcon>
)

const IconFilter = (props) => (
  <SvgIcon {...props}>
    <path d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" />
  </SvgIcon>
)

const toolbarStyleSheet = createStyleSheet('DataTableToolbar', (theme) => {
  return {
    root: { paddingRight: 12 },
    highlight: (
      theme.palette.type === 'light' ? {
        color: theme.palette.accent[500],
        backgroundColor: theme.palette.accent[50],
      } : {
        color: theme.palette.accent[50],
        backgroundColor: theme.palette.accent[500],
      }
    ),
    subheading: {
      color: theme.palette.accent[500],
    },
    spacer: { flex: '1 1 100%' },
    actions: {
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap'
    },
    title: { flex: '0 0 auto' },
  }
})

const DataTableToolbar = (props, context) => {
  const { numSelected, title } = props;
  const classes = context.styleManager.render(toolbarStyleSheet);
  let classNames = classes.root;

  if (numSelected > 0) {
    classNames += ` ${classes.highlight}`;
  }

  return (
    <Toolbar className={classNames}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Text className={classes.subheading} type="subheading">{numSelected} selected</Text>
        ) : (
          <Text type="title">{title}</Text>
        )}
      </div>

      <div className={classes.spacer} />
        {numSelected > 0 ? (
          <div className={classes.actions}>
            <IconButton>delete</IconButton>
          </div>
        ) : (
          <div className={classes.actions}>
            <IconButton>filter_list</IconButton>
            <IconButton>add</IconButton>
          </div>
        )}
    </Toolbar>
  );
}

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

DataTableToolbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default DataTableToolbar