import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from './../../utils/actionTypes';
import moment from 'moment-timezone';
import 'moment-duration-format';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'downtime', label: 'Downtime', minWidth: 100 },
  { id: 'uptime', label: 'Uptime', minWidth: 100 },
  { id: 'duration', label: 'Duration', minWidth: 100 },
];

function createData(date, downtime, uptime, duration) {
  return { date, downtime, uptime, duration };
}

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

const MachineryAuditList = ({ siteId = '' }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [activityLogs, setActivityLogs] = useState([]);

  const downtimeList = useSelector((state) => state.getMachineryDowntimeAuditReducer.auditList);

  useEffect(() => {
    if (siteId !== '') {
      dispatch({
        type: actionTypes.GET_DOWNTIME_AUDIT,
        payload: {
          siteId: siteId,
        },
      });
    }
  }, [siteId]);

  useEffect(() => {
    if (siteId !== '') {
      var newLogs = [];
      downtimeList.forEach((item) => {
        var startTime = item.startTime !== null ? moment(item.statusStartTime) : moment();
        var endTime = item.statusEndTime !== null ? moment(item.statusEndTime) : moment();
        newLogs.push(
          createData(
            startTime.format('DD/MM/YYYY'),
            startTime.format('h:mm A'),
            item.statusEndTime !== null ? endTime.format('h:mm A') : '-',
            formatDate(startTime, endTime),
          ),
        );
      });
      setActivityLogs(newLogs);
    }
  }, [downtimeList]);

  const formatDate = (startTime, endTime) => {
    var locMoment = moment.duration(endTime.diff(startTime), 'milliseconds');
    return locMoment.format('h [hrs], m [min]');
  };

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
          </TableRow>
        </TableHead>
        <TableBody>
          {activityLogs.map((item, i) => (
            <TableRow key={i}>
              {columns.map((column, j) => (
                <TableCell key={j}>{item[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MachineryAuditList;
