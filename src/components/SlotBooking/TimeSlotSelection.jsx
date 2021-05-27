import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ReactComponent as Success } from '../../images/Sucess.svg';
import { ReactComponent as PendingAction } from '../../images/PendingAction.svg';

const useStyles = makeStyles({
  rowFullWidth: {
    width: '100%',
  },
  legends: {
    display: 'flex',
    marginBottom: 15,
  },
  slotTimeTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
  },
  legendWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-end',
  },
  informationLegend: {
    width: 40,
    height: 8,
    maxWidth: 100,
    margin: '-2px 10px 0 15px',
    borderRadius: 3,
  },
  bookedColor: {
    background: '#EB5757',
  },
  availableColor: {
    background: '#219653',
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
    marginBottom: '2px',
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
  },
});

const TimeSlotSelection = (props) => {
  const styles = useStyles();

  let timeSlotArray = [];

  if (props.dateTimeSlotDetails !== null && props.selectedDate !== null) {
    timeSlotArray = [];
    let currentTimeSlotDetails = props.dateTimeSlotDetails[props.selectedDate];
    let sortedTimeSlot = Object.entries(currentTimeSlotDetails).sort((a, b) => a[1].slotDetails.slotOrder - b[1].slotDetails.slotOrder);
    sortedTimeSlot.map((time) => {
      timeSlotArray.push(time[0]);
    });
  }

  const isSlotAvailable = (time) => {
    let timeSlots = props.dateTimeSlotDetails[props.selectedDate];
    return timeSlots[time].id === undefined;
  };

  const isTimeSlotCompleted = (time) => {
    let timeSlots = props.dateTimeSlotDetails[props.selectedDate];
    return timeSlots[time].id !== undefined && timeSlots[time].status === 'COMPLETED';
  };

  const isTimeSlotInProgress = (time) => {
    let timeSlots = props.dateTimeSlotDetails[props.selectedDate];
    return timeSlots[time].id !== undefined && timeSlots[time].status !== 'COMPLETED';
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

  const isCurrentTimeCrossedSlotTime = (time) => {
    let currentDate = moment().format('DD-MM-YYYY');
    if (currentDate === props.selectedDate) {
      let timeArray = time.split('-');
      let trimmedTimeArray = [];

      timeArray.forEach((timeValue) => {
        trimmedTimeArray.push(timeValue.trim());
      });

      if (trimmedTimeArray.length === 2) {
        if (moment(trimmedTimeArray[1], 'hh:mm A').isBefore(moment())) return true;
      }
      return false;
    }
    return false;
  };

  const getClassesForTimeSlot = (time) => {
    let yesterdayDate = moment().subtract(1, 'days').format('DD-MM-YYYY');
    let slotAvailable = isSlotAvailable(time);
    let timeSlotCompleted = isTimeSlotCompleted(time);

    if (yesterdayDate === props.selectedDate) {
      return slotAvailable ? clsx(styles.timeSlot, styles.timeSlotBlocked) : clsx(styles.timeSlot, styles.timeSlotBooked);
    }

    if (isCurrentTimeCrossedSlotTime(time)) return clsx(styles.timeSlot, styles.timeSlotBlocked);

    if (slotAvailable) return clsx(styles.timeSlot, styles.timeSlotAvailable);

    if (timeSlotCompleted) {
      return clsx(styles.timeSlot, styles.timeSlotBlocked);
    }

    return slotAvailable ? clsx(styles.timeSlot, styles.timeSlotAvailable) : clsx(styles.timeSlot, styles.timeSlotBooked);
  };

  const isDisabledTime = (time) => {
    let yesterdayDate = moment().subtract(1, 'days').format('DD-MM-YYYY');
    let slotAvailable = isSlotAvailable(time);

    if (yesterdayDate === props.selectedDate) {
      if (slotAvailable) return true;
    }

    if (isCurrentTimeCrossedSlotTime(time)) {
      if (isSlotAvailable(time)) return true;
    }

    let currentSiteDetails = props.siteList.filter((site) => site.id === props.siteDetails.siteId);
    let isOwner = currentSiteDetails.length !== 0 ? currentSiteDetails[0].isOwner : false;
    return !isOwner && slotAvailable;
  };

  return (
    <div className="col-xs-12 col-md-3 pr-0">
      <div className={`row ${styles.rowFullWidth}`}>
        <div className={`col-12 ${styles.legends}`}>
          <h6 className={`m-0 ${styles.slotTimeTitle}`}>Time Slots</h6>
          <div className={` ml-auto ${styles.legendWrapper}`}>
            <div md={2} className={styles.informationLegend + ' ' + styles.bookedColor} />
            <span>{'Booked'}</span>
          </div>
          <div className={` ${styles.legendWrapper}`}>
            <div md={2} className={styles.informationLegend + ' ' + styles.availableColor} />
            <span>{'Available'}</span>
          </div>
        </div>
      </div>
      <List disablePadding={true} className={`${styles.timeSlotWrapper}`}>
        {timeSlotArray.map((time, index) => {
          return (
            <ListItem key={index} button disabled={isDisabledTime(time)} onClick={() => selectTime(time)} style={{ padding: 0, opacity: 'initial' }}>
              <ListItemText className={getClassesForTimeSlot(time)}>
                {time}
                {isTimeSlotCompleted(time) && <Success style={{ marginTop: '4px', float: 'right' }} />}
                {isCurrentTimeCrossedSlotTime(time) && isTimeSlotInProgress(time) && <PendingAction style={{ marginTop: '4px', float: 'right' }} />}
              </ListItemText>
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
