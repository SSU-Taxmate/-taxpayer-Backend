import React, { useState} from 'react';

/*theme */
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';


/* Icon */

export default function TableTheme(props) {


  const theme = createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          paddingTop: 5,
          paddingBottom: 5,
          "&:last-child": {
            paddingRight: 5
          },

        }
      }
    },
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },

  });

  return (
    <MuiThemeProvider theme={theme}>
     {props.children}
    </MuiThemeProvider>
  )
}
