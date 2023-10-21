import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddButton from './AddButton';
import AddIcon from '@mui/icons-material/Add';

function addSet(exerciseName) {
  console.log('adding to ', exerciseName);
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset'}}}>
        <TableCell sx={{ padding: '5px'}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.exerciseName}
        </TableCell>
        <TableCell align="right">{row.numOfSets}</TableCell>
        <TableCell>
          <IconButton
            aria-label='add set'
            size='small'
            onClick={addSet(row.exerciseName)}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="sets">
                <TableHead>
                  <TableRow>
                    <TableCell>Reps</TableCell>
                    <TableCell align="right">Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sets.map((set, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {set.reps}
                      </TableCell>
                      <TableCell align="right">{set.weight || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    exerciseName: PropTypes.string.isRequired,
    numOfSets: PropTypes.number.isRequired,
    sets: PropTypes.arrayOf(
      PropTypes.shape({
        reps: PropTypes.number.isRequired,
        weight: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleWorkoutTable({ data }) {
  const rows = data.exercises.map((exercise) => ({
    exerciseName: exercise.name,
    numOfSets: exercise.sets.length,
    sets: exercise.sets,
  }));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Exercise Name</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.exerciseName} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton text={'Add Set'}/>
    </div>
  );
}
