import MaterialTable from 'material-table';
import React, { useState } from 'react';

/*theme */
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';





function DefaultTable(props) {
  const [title, setTitle] = useState(props.title);
  const [columns, setColumns] = useState(props.columns);
  const [data, setData] = useState(props.data);
  const [options, setOptions] = useState(props.options);
 

  const theme = createTheme({
    overrides: {
      MuiTableCell: {
        root: {
          paddingTop: 5,
          paddingBottom: 5,
          "&:last-child": {
            paddingRight: 5
          }
        }
      },
      MuiSelect: {
        select: {
          paddingTop: 2
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
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={options}
        // other props
        localization={{
          body: {
            emptyDataSourceMessage: '보여줄 데이터가 없습니다.',
            filterRow: {
              filterTooltip: '필터'
            }
          },
          grouping:{
            placeholder:'여기에 그룹화 할 헤더를 끌어다놓으세요',
            groupedBy: '그룹화 : '
          },
          pagination: {
            labelDisplayedRows: '{from}-{to} of {count}',
          },
          toolbar: {
            nRowsSelected: '{0} 행이 선택되었습니다.',
            searchTooltip: '검색',
          },
        }}
      />
    </MuiThemeProvider>
  )
}



export default DefaultTable


