import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  timeSlotDiv: {
    marginTop: '5%',
  },
  marginRight: {
    marginRight: '2%',
  },
  timeSlotWrapper: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    height: '100%',
    maxHeight: 1000,
    overflow: 'auto',
    cursor: 'pointer',
  },
  timeSlot: {
    padding: '10px 15px',
    marginRight: '16px',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  timeSlotBooked: {
    border: '1px solid #EB5757',
    background: '#EB5757',
    opacity: '80%',
  },
  timeSlotAvailable: {
    border: '1px solid #27AE60',
    background: '#27AE60',
  },
  timeSlotBlocked: {
    border: '1px solid #828282',
    background: '#828282',
    cursor: 'not-allowed',
  },
});

const TimeSlotSelection = (props) => {
  const styles = useStyles();

  let timeSlotArray =
    props.dateTimeSlotDetails !== null && props.selectedDate !== null ? Object.keys(props.dateTimeSlotDetails[props.selectedDate]) : [];

  const isSlotAvailable = (time) => {
    let timeSlots = props.dateTimeSlotDetails[props.selectedDate];
    return timeSlots[time].id === undefined;
  };

  const selectTime = (time) => {
    let type = isSlotAvailable(time) ? 'ADD' : 'EDIT';
    let slotDetails = null;
    if (
      props.dateTimeSlotDetails !== null &&
      props.dateTimeSlotDetails[props.selectedDate] !== null &&
      props.dateTimeSlotDetails[props.selectedDate][time] !== null
    ) {
      slotDetails = props.dateTimeSlotDetails[props.selectedDate][time];
    }
    let openSlotForm = {
      date: props.selectedDate,
      time,
      type,
      slotDetails,
    };
    props.openSlotForm(openSlotForm);
  };

  const getClassesForTimeSlot = (time) => {
    let yesterdayDate = moment().subtract(1, 'days').format('DD-MM-YYYY');
    let slotAvailable = isSlotAvailable(time);
    if (yesterdayDate === props.selectedDate) {
      return slotAvailable ? clsx(styles.timeSlot, styles.timeSlotBlocked) : clsx(styles.timeSlot, styles.timeSlotBooked);
    }
    return slotAvailable ? clsx(styles.timeSlot, styles.timeSlotAvailable) : clsx(styles.timeSlot, styles.timeSlotBooked);
  };

  const isDisabledTime = (time) => {
    let yesterdayDate = moment().subtract(1, 'days').format('DD-MM-YYYY');
    let slotAvailable = isSlotAvailable(time);
    if (yesterdayDate === props.selectedDate) {
      if (slotAvailable) return true;
    }
    return false;
  };

  return (
    <div className="col-xs-12 col-md-3 pr-0">
      <List disablePadding={true} className={`${styles.timeSlotWrapper}`}>
        {timeSlotArray.map((time, index) => {
          return (
            <ListItem key={index} button disabled={isDisabledTime(time)} onClick={() => selectTime(time)} style={{ padding: 0 }}>
              <ListItemText className={getClassesForTimeSlot(time)}>{time}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

TimeSlotSelection.propTypes = {
  dateTimeSlotDetails: PropTypes.object,
  selectedDate: PropTypes.string,
  openSlotForm: PropTypes.func,
};

export default TimeSlotSelection;
