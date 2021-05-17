import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateSelection from '../components/SlotBooking/DateSelection';
import ZoneSelection from '../views/ZoneSelection/ZoneSelection';
import TimeSlotSelection from '../components/SlotBooking/TimeSlotSelection';
import LastRespectFormContainer from './LastRespectFormContainer';

const useStyles = makeStyles(() => ({
  slotBookingDiv: {
    marginTop: '2%',
    marginLeft: '2%',
  },
  slotBookingTitle: {
    color: '#466783',
    fontSize: '18px',
    fontWeight: 'bold',
  },
}));

const SlotBookingContainer = () => {
  const styles = useStyles();

  const [isFormOpen, setFormOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());

  useEffect(() => {
    console.log('Test');
  }, []);

  const selectDate = (date) => {
    setSelectedDate(date.date);
  };

  return (
    <>
      {!isFormOpen && (
        <div className={styles.slotBookingDiv}>
          <ZoneSelection />
          <div className={styles.slotBookingTitle}>Slot Booking</div>
          <DateSelection selectedDate={selectedDate} selectDate={selectDate} />
          <TimeSlotSelection />
        </div>
      )}
      {isFormOpen && <LastRespectFormContainer onCancel={() => setFormOpen(false)} />}
    </>
  );
};

export default SlotBookingContainer;
