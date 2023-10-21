import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddButton from './AddButton';

const columns = [
  {
    field: 'date',
    headerName: 'Date',
    width: 100,
    flex: 1,
  },
  {
    field: 'sets',
    headerName: 'Sets',
    type: 'number',
    width: 80,
    disableColumnMenu: true,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 100,
    flex: 1,
  },
  {
    field: 'actions',
    headerName: '',
    width: 90,
    disableColumnMenu: true,
    renderCell: (params) => (
      <>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const rows = [
  { id: 1, date: '2023-10-19', sets: 8, time: '1:24:30'},
  { id: 2, date: '2023-10-20', sets: 5, time: '1:21:21'},
  { id: 3, date: '2023-10-21', sets: 6, time: '1:14:29'},
  { id: 4, date: '2023-10-22', sets: 8, time: '1:01:56'},
];

export default function WorkoutTable({ data }) {
  return (
    <Box sx={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        autoPageSize
        autoHeight
        disableRowSelectionOnClick
      />
      <AddButton text={'Add Workout'}/>
    </Box>
  )
}