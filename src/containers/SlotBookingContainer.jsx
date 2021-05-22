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
  slotTimeTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16, 
  },
  slotData: {
    background: "#EEFAFE",
    padding: 0
  },
  customContainer: {
    maxWidth: 1500,
    border: "1px solid #ccc",
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  legends: {
    display: 'flex',
    marginBottom : 15,
  },
  informationLegend: {
    width: 40,
    height: 8,
    maxWidth: 100,
    margin: '-2px 10px 0 15px',
    borderRadius: 3,
  },
  legendWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-end',
  },
  bookedColor: {
    background: '#EB5757',
  },
  availableColor: {
    background: '#219653',
  },
  rowFullWidth: {
    width: "100%",
  },
  timeSlotTitle: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
  },
  slotHeaderTitle:{
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 24,
  }
}));

const SlotBookingContainer = (props) => {

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
        dispatch({
          type: actionTypes.SET_ZONE_NAME,
          payload: {
            zoneName: event,
          },
        });
      }
      if (id === 'siteName') {
        setSiteDetails({
          ...siteDetails,
          siteName: event,
        });
        dispatch({
          type: actionTypes.SET_ACTIVE_FLAG,
          payload: {
            isActive: false,
          },
        });
      }
    }
  };

  return (
    <>
      <Header />
      {!isFormOpen && (
        <div className={`container ${styles.customContainer} ${styles.slotBookingDiv} mt-4`} >
           <ZoneSelection siteDetails={siteDetails} zoneList={zoneList} siteList={siteList} handleOnChangeForDropdown={handleOnChangeForDropdown}/>
          <div className={`row slotContent `}>
            <div className="col-12">
              <h4 className={`${styles.slotHeaderTitle}`}> Slot Booking</h4>
            </div>
            <div className={`col-12 ${styles.overflowHidden}`}>
              <DateSelection selectedDate={selectedDate} selectDate={selectDate} />
              <div className={`row ${styles.rowFullWidth}`}>
                <div className={`col-12 ${styles.legends}`}>
                  <h6 className={`m-0 ${styles.slotTimeTitle}`}>Time Slots</h6>
                  <div className={` ml-auto ${styles.legendWrapper}`}>
                    <div item md={2} className={styles.informationLegend + ' ' + styles.bookedColor} />
                    <span>{'Booked'}</span>
                  </div>
                  <div className={` ${styles.legendWrapper}`}>
                    <div item md={2} className={styles.informationLegend + ' ' + styles.availableColor} />
                    <span>{'Available'}</span>
                  </div>
                </div>
              </div>
              <div className='row'>
                <TimeSlotSelection />
                <div className={`col-9 ${styles.slotData}`}>
                  <h4 className="col-12 displaydate"> Date & Time Slot : 15/12/2021 & 9.30am to 10.15 am </h4>
                  <div className="form col-12">
                    <LastRespectFormContainer />
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
