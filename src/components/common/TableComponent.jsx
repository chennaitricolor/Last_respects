import React from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'downtime', label: 'Downtime', minWidth: 100 },
  { id: 'uptime', label: 'Uptime', minWidth: 100 },
  { id: 'duration', label: 'Duration', minWidth: 100 },
];

function createData(date, downtime, uptime, duration) {
  return { date, downtime, uptime, duration };
}

const rows = [
  createData('12/12/2020', '12:20 PM', '3:30 PM', '3 hr 10 mins'),
  createData('12/12/2020', '12:20 PM', '3:30 PM', '3 hr 10 mins'),
  createData('12/12/2020', '12:20 PM', '3:30 PM', '3 hr 10 mins'),
  createData('12/12/2020', '12:20 PM', '3:30 PM', '3 hr 10 mins'),
  createData('12/12/2020', '12:20 PM', '3:30 PM', '3 hr 10 mins'),
];

const useStyles = makeStyles(() => ({
  tableHeader: {
    backgroundColor: '#DBDBDB',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#DBDBDB',
    color: '#000000',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TableComponent = () => {
  const styles = useStyles();
  return (
    <TableContainer className="table">
      <Table aria-label="customized table">
        <TableHead>
          <TableRow className={styles.tableHeader}>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={column.align}>
                {column.label}
              </StyledTableCell>
            ))}
            {/* // <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
