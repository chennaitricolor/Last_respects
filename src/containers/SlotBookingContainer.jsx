import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateSelection from '../components/SlotBooking/DateSelection';
import ZoneSelection from '../views/ZoneSelection/ZoneSelection';
import TimeSlotSelection from '../components/SlotBooking/TimeSlotSelection';
import LastRespectFormContainer from './LastRespectFormContainer';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../utils/actionTypes';

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
  const dispatch = useDispatch();

  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());
  const [siteDetails, setSiteDetails] = useState({
    zoneName: '',
    siteName: '',
  });

  const zoneList = useSelector((state) => state.getAllZoneReducer.zoneList);
  const siteList = useSelector((state) => state.getSitesBasedOnZoneIdReducer.siteList);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_ALL_ZONES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (siteDetails.zoneName !== '') {
      let zoneId = zoneList.filter((zone) => zone.zone_or_division === siteDetails.zoneName)[0].zone_or_division_id;
      dispatch({
        type: actionTypes.GET_SITES_BASED_ZONE_ID,
        payload: {
          zoneId: zoneId,
        },
      });
    }
  }, [dispatch, siteDetails.zoneName]);

  useEffect(() => {
    if (siteDetails.zoneName !== '' && siteDetails.siteName !== '') {
      let siteId = siteList.filter(site => site.site_name === siteDetails.siteName)[0].id
      dispatch({
        type: actionTypes.GET_SLOTS_BASED_SITE_ID,
        payload: {
          siteId: siteId,
        },
      });
    }
  }, [dispatch, siteDetails]);

  const selectDate = (date) => {
    setSelectedDate(date.date);
  };

  const handleOnChangeForDropdown = (event, id) => {
    if (event !== null) {
      if (id === 'zoneName') {
        setSiteDetails({
          zoneName: event,
          siteName: '',
        });
      }
      if (id === 'siteName') {
        setSiteDetails({
          ...siteDetails,
          siteName: event,
        });
      }
    }
  };

  return (
    <>
      <Header />
      {!isFormOpen && (
        <div className={styles.slotBookingDiv}>
          <ZoneSelection siteDetails={siteDetails} zoneList={zoneList} siteList={siteList} handleOnChangeForDropdown={handleOnChangeForDropdown} />
          <div className={styles.slotBookingTitle}>Slot Booking</div>
          <div onClick={()=>setFormOpen(true)}>Open Form</div>
          <DateSelection selectedDate={selectedDate} selectDate={selectDate} />
          <TimeSlotSelection />
        </div>
      )}
      {isFormOpen && <LastRespectFormContainer onCancel={() => setFormOpen(false)} />}
    </>
  );
};

export default SlotBookingContainer;
