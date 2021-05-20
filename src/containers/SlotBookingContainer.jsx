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
  slotData: {
    background: "#EEFAFE",
    padding:0
  },
  customContainer:{
    maxWidth: 1500,
    border: "1px solid #ccc",
  },
  overflowHidden:{
    overflow:'hidden'
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
        <div className={`container ${styles.customContainer} ${styles.slotBookingDiv} mt-4`} >
          <ZoneSelection />
          <div className={`row slotContent `}>
              <div className="col-12">
                <h4> Slot Booking</h4>
              </div>
              <div className={`col-12 ${styles.overflowHidden}`}>
                <DateSelection selectedDate={selectedDate} selectDate={selectDate} />
               <div className='row'>
                  <TimeSlotSelection />
                  <div className={`col-9 ${styles.slotData}`}>
                      <h4 className="col-12 displaydate"> Date & Time Slot : 15/12/2021 & 9.30am to 10.15 am </h4>
                      <div className="form col-12">
                          <LastRespectFormContainer/>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isFormOpen && <LastRespectFormContainer onCancel={() => setFormOpen(false)} />}
    </>
  );
};

export default SlotBookingContainer;
