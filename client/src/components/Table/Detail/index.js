import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
/*theme */
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { number } from 'prop-types';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  FavoriteBorderIcon: forwardRef((props, ref) => <FavoriteBorderIcon {...props} ref={ref} />),
  FavoriteIcon: forwardRef((props, ref) => <FavoriteIcon {...props} ref={ref} />),
  ChatBubbleOutlineIcon: forwardRef((props, ref) => <ChatBubbleOutlineIcon {...props} ref={ref} />),
  ChatBubbleIcon: forwardRef((props, ref) => <ChatBubbleIcon {...props} ref={ref} />)

};

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

  const theme = createMuiTheme({
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
        icons={tableIcons}

        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
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
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000)
            }),
        }}

        //detail
        detailPanel={[
          {
            icon: FavoriteBorderIcon,
            openIcon: FavoriteIcon,
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
            placeholder:'이곳으로 드래그 해주세요',
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
