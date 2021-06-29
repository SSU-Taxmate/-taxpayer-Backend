import MaterialTable from 'material-table';
import React, { useState} from 'react';

import axios from 'axios'
/*theme */
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';


/* Icon */

export default function EditableTable(props) {
  const [title, setTitle] = useState(props.title);
  const [columns, setColumns] = useState(props.columns);
  const [data, setData] = useState(props.data);
  const [options, setOptions] = useState(props.options);

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
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={options}

        //editable
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              //console.log(newData)
              setTimeout(() => {
                setData([...data, newData]);
                axios.post('/api/classes/:classId/homeworks/types',newData) 
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              //console.log(newData,oldData)
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //이 부분에 함수를 만들자!
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000)
            }),
        }}
        // other props
        localization={{

          header: {
            actions: '수정/삭제'
          },
          body: {
            editRow: {
              deleteText: '이 행을 정말 삭제 하시겠습니까?',
            },
            emptyDataSourceMessage: '보여줄 데이터가 없습니다.',
            filterRow: {
              filterTooltip: '필터'
            }
          },
          grouping: {
            placeholder: '여기에 그룹화 할 헤더를 끌어다놓으세요',
            groupedBy: '그룹화 : '
          },
          pagination: {
            labelDisplayedRows: '{from}-{to} of {count}'
          },
          toolbar: {
            nRowsSelected: '{0} 행이 선택되었습니다.',
            searchTooltip: '검색'

          },
        }}
      />
    </MuiThemeProvider>
  )
}
