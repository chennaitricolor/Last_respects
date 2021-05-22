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
  dateText: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#828282',
  },
  dateTextSelected: {
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
});

const DateSelection = (props) => {
  const styles = useStyles();

  const formatDate = (dateString) => {
    return moment(dateString, 'DD-MM-YYYY').format('MMM-DD');
  };

  const getSlotsAvailable = () => {
    return '2';
  };

  let dateArray = props.dateTimeSlotDetails !== null ? Object.keys(props.dateTimeSlotDetails) : null;

  return (
    <div className={` ${styles.dateSelectionDiv} `}>
      <h6 className={styles.dateTitle}>Date</h6>
      <div className={styles.dateCards}>
        {dateArray !== undefined &&
          dateArray !== null &&
          dateArray.map((date, index) => {
            return (
              <div key={index} style={{ display: 'inline-block', marginRight: '8px' }} onClick={() => props.selectDate(date)}>
                <Card className={props.selectedDate === date ? clsx(styles.dateCard, styles.dateCardSelected) : styles.dateCard}>
                  <CardContent>
                    <Typography className={props.selectedDate === date ? clsx(styles.dateText, styles.dateTextSelected) : styles.dateText} variant={'h5'} component={'div'}>
                      {formatDate(date)}
                    </Typography>
                    <Typography className={props.selectedDate === date ? clsx(styles.slotText, styles.slotTextSelected) : styles.slotText} component={'div'}>
                      {`${getSlotsAvailable()} Slots Available`}
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
