import MaterialTable from 'material-table';
import React, { useState,  } from 'react';


/*theme */
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';


/* Icon */

export default function DetailTable(props) {
  const [title, setTitle] = useState(props.title);

  const [columns, setColumns] = useState([
    { title: '번호', field: 'id' },
    { title: '이름', field: 'name' },
    { title: '직업', field: 'job' },
    { title: '신용등급', field: 'creditRating' },
    { title: '총 보유 자산 (미소)', field: 'assets' },
    { title: '부동산', field: 'real_estate' },

  ]);

  const [data, setData] = useState([
    { id: 1, name: 'Baran', job: '우체부', salary: 150, creditRating: '3', assets: '10000' },
    { id: 2, name: 'AELIN', job: '통계청', salary: 200, creditRating: '2', assets: '25000' },
    { id: 3, name: 'SHWAN', job: '신용평가위원', salary: 280, creditRating: '3', assets: '40000' },
    { id: 4, name: 'EUKL', job: '은행원', salary: 200, creditRating: '6', assets: '23900' },
    { id: 5, name: 'qQE', job: '교실청소부', salary: 300, creditRating: '4', assets: '39000' },

  ]);
  const [options,setOptions]=useState({

  });

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
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 5000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 5000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 5000)
            }),
        }}

        //detail
        detailPanel={[
          {
            icon: 'favorite_border',
            openIcon: 'favorite',
            tooltip: '학생 통계',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: 'black',
                    backgroundColor: '#FDD835',
                  }}
                >
                  {rowData.job}
                </div>
              )
            },
          },
        ]}

        // other props
        localization={{
        
         
          header: {
            actions: '수정/삭제'
          },
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
            searchTooltip:'검색'

          },
        }}
      />
    </MuiThemeProvider>
  )
}
