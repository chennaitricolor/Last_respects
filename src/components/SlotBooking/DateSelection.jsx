import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import clsx from 'clsx';

const useStyles = makeStyles({
  dateSelectionDiv: {
    marginTop: '16px',
  },
  dateTitle: {
    lineHeight: '16px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '16px',
  },
  dateCards: {
    marginBottom: '16px',
    cursor: 'pointer',
  },
  dateCard: {
    border: '1px solid #828282',
    borderRadius: '3px',
    textAlign: 'center',
    width: '110px',
  },
  dateCardSelected: {
    border: '1px solid #466783',
    background: '#466783',
  },
  yesterdayDateCard: {
    border: '1px solid #828282',
    background: '#828282',
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#828282',
  },
  dateTextSelected: {
    color: '#fff',
  },
  yesterdayDateText: {
    color: '#fff',
  },
  slotText: {
    paddingTop: '8px',
    fontSize: '16px',
    color: '#828282',
  },
  slotTextSelected: {
    color: '#fff',
  },
  yesterdaySlotText: {
    color: '#fff',
  },
});

const DateSelection = (props) => {
  const styles = useStyles();

  const formatDate = (dateString) => {
    return moment(dateString, 'DD-MM-YYYY').format('MMM-DD');
  };

  let dateArray = props.dateTimeSlotDetails !== null ? Object.keys(props.dateTimeSlotDetails) : null;

  const getAvailableSlotCount = (date) => {
    let yesterdayDate = moment().subtract(1, 'days').format('DD-MM-YYYY');
    let availableCount = 0;
    let dateSlots = props.dateTimeSlotDetails[date];

    if (yesterdayDate === date) return 'Previous Date';

    Object.values(dateSlots).forEach((value) => {
      if (value.id === undefined) availableCount++;
    });

    return `${availableCount} Slots Available`;
  };

  const getClassesForDateSlot = (date, yesterdayStyle, style, selectedStyle) => {
    let yesterdayDate = moment().subtract(1, 'days').format('DD-MM-YYYY');

    if (props.selectedDate === date) return clsx(style, selectedStyle);

    if (yesterdayDate === date) return clsx(yesterdayStyle, style);

    return clsx(style);
  };

  return (
    <div className={` ${styles.dateSelectionDiv} `}>
      <h6 className={styles.dateTitle}>Date</h6>
      <div className={styles.dateCards}>
        {dateArray !== undefined &&
          dateArray !== null &&
          dateArray.map((date, index) => {
            return (
              <div key={index} style={{ display: 'inline-block', marginRight: '8px' }} onClick={() => props.selectDate(date)}>
                <Card className={getClassesForDateSlot(date, styles.yesterdayDateCard, styles.dateCard, styles.dateCardSelected)}>
                  <CardContent>
                    <Typography className={getClassesForDateSlot(date, styles.yesterdayDateText, styles.dateText, styles.dateTextSelected)} variant={'h5'} component={'div'}>
                      {formatDate(date)}
                    </Typography>
                    <Typography className={getClassesForDateSlot(date, styles.yesterdaySlotText, styles.slotText, styles.slotTextSelected)} component={'div'}>
                      {`${getAvailableSlotCount(date)}`}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

DateSelection.propTypes = {
  dateTimeSlotDetails: PropTypes.object,
  selectedDate: PropTypes.string,
  selectDate: PropTypes.func,
};

export default DateSelection;
