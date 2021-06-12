import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateSelection from '../components/SlotBooking/DateSelection';
import ZoneSelection from '../views/ZoneSelection/ZoneSelection';
import TimeSlotSelection from '../components/SlotBooking/TimeSlotSelection';
import LastRespectFormContainer from './LastRespectFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../utils/actionTypes';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Header from '../components/Header';
import { isMobile } from '../utils/CommonUtils';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  slotBookingDiv: {
    //height: '90%',
    position: 'relative',
    overflow: 'auto',
  },
  slotData: {
    background: '#EEFAFE',
    padding: 0,
  },
  customContainer: {
    maxWidth: 1500,
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  timeSlotTitle: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
  },
  slotHeaderTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 24,
  },
  selectZoneSiteMessage: {
    color: '#000',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '32px',
  },
}));

const SlotBookingContainer = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  //use preselected zone and site from machinery management screen
  const zoneNamePayload = useSelector((state) => state.getAllZoneReducer.payload);
  const sitePayload = useSelector((state) => state.getSitesBasedOnZoneIdReducer.payload);

  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const [siteDetails, setSiteDetails] = useState({
    zoneName: zoneNamePayload?.zoneName !== null && zoneNamePayload?.zoneName !== undefined ? zoneNamePayload?.zoneName : '',
    siteName: sitePayload?.siteName !== null && sitePayload?.siteName !== undefined ? sitePayload.siteName : '',
    siteId: sitePayload?.siteId !== null && sitePayload?.siteId !== undefined ? sitePayload.siteId : '',
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [type, setType] = useState('ADD');
  const [selectedSlotDetails, setSelectedSlotDetails] = useState(null);
  const [snackInfo, setSnackInfo] = useState({
    openSnack: false,
    message: '',
    severity: 'success',
  });

  const zoneList = useSelector((state) => state.getAllZoneReducer.zoneList);
  const siteList = useSelector((state) => state.getSitesBasedOnZoneIdReducer.siteList);
  const dateTimeSlotDetails = useSelector((state) => state.getSlotsBasedOnSiteIdReducer.slotDetails);
  const snackBarInfo = useSelector((state) => state.showSnackBarMessageReducer);
  const mobileCheck = isMobile();

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_ALL_ZONES,
    });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch({
        type: actionTypes.RESET_DATA_UNMOUNT_SLOT_BOOKING,
      });

      setSiteDetails({
        zoneName: '',
        siteName: '',
        siteId: '',
      });
      setType('ADD');
      setSelectedDate(moment(new Date()).format('DD-MM-YYYY'));
      setSelectedTimeSlot('');
      setSelectedSlotDetails(null);
    };
  }, []);

  useEffect(() => {
    if (siteDetails.zoneName !== '' && zoneList?.length > 0) {
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
      dispatch({
        type: actionTypes.GET_SLOTS_BASED_SITE_ID,
        payload: {
          siteId: siteDetails.siteId,
        },
      });
    }
  }, [dispatch, siteDetails]);

  useEffect(() => {
    setSnackInfo({
      openSnack: snackBarInfo.openSnack,
      message: snackBarInfo.message,
      severity: snackBarInfo.severity,
    });
  }, [dispatch, snackBarInfo]);

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  const handleOnChangeForDropdown = (event, id) => {
    if (event !== null) {
      if (id === 'zoneName') {
        dispatch({
          type: actionTypes.CLEAR_DATA_ON_ZONE_SELECTION,
        });
        setSiteDetails({
          zoneName: event,
          siteName: '',
          siteId: '',
        });
      }
      if (id === 'siteName') {
        let selectedSite = siteList.find((site) => site.siteName === event);
        setSiteDetails({
          ...siteDetails,
          siteName: event,
          siteId: selectedSite !== undefined ? selectedSite.id : '',
        });
        dispatch({
          type: actionTypes.SET_ACTIVE_FLAG,
          payload: {
            isActive: selectedSite !== undefined ? selectedSite.isActive : false,
            isOwner: selectedSite !== undefined ? selectedSite.isOwner : false,
            siteId: selectedSite !== undefined ? selectedSite.id : '',
            siteName: event,
          },
        });
        dispatch({
          type: actionTypes.SET_ZONE_AND_SITE_NAME,
          payload: {
            zoneName: siteDetails.zoneName,
            siteName: event,
          },
        });
      }
    }
  };

  const openSlotForm = (payload) => {
    setSelectedTimeSlot(payload.time);
    setType(payload.type);
    mobileCheck ? setFormOpen(true) : setFormOpen(false);
    setSelectedSlotDetails(payload.slotDetails);
  };

  const handleCloseSnackBar = () => {
    dispatch({
      type: actionTypes.RESET_SNACKBAR,
    });
  };

  const handleCancel = () => {
    window.scrollTo(0, 0);
    dispatch({
      type: actionTypes.CLEAR_SLOT_DETAILS,
    });
    setFormOpen(false);
  };

  return (
    <>
      <Header />
      {!isFormOpen && (
        <div className={`container ${styles.customContainer} ${styles.slotBookingDiv}`}>
          <ZoneSelection siteDetails={siteDetails} zoneList={zoneList} siteList={siteList} handleOnChangeForDropdown={handleOnChangeForDropdown} />
          <div className={`row slotContent `}>
            <div className="col-12">
              <h4 className={`${styles.slotHeaderTitle}`}> Slot Booking</h4>
            </div>
            {dateTimeSlotDetails !== null && siteDetails.siteName !== '' ? (
              <div className={`col-12 ${styles.overflowHidden}`}>
                <DateSelection dateTimeSlotDetails={dateTimeSlotDetails} selectedDate={selectedDate} selectDate={selectDate} />
                <div className="row">
                  <TimeSlotSelection
                    dateTimeSlotDetails={dateTimeSlotDetails}
                    selectedDate={selectedDate}
                    siteDetails={siteDetails}
                    siteList={siteList}
                    openSlotForm={openSlotForm}
                  />
                  {!mobileCheck && selectedTimeSlot !== '' && (
                    <LastRespectFormContainer
                      date={selectedDate}
                      time={selectedTimeSlot}
                      siteList={siteList}
                      siteId={siteDetails.siteId}
                      type={type}
                      setType={setType}
                      editSlotDetails={selectedSlotDetails}
                      onCancel={handleCancel}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className={`row slotContent `}>
                <div className="col-12">
                  <Typography className={styles.selectZoneSiteMessage} component={'h3'}>
                    Please Select Zone & Site Name to View Slot Details
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {mobileCheck && isFormOpen && (
        <LastRespectFormContainer
          date={selectedDate}
          time={selectedTimeSlot}
          siteList={siteList}
          siteId={siteDetails.siteId}
          type={type}
          editSlotDetails={selectedSlotDetails}
          onCancel={handleCancel}
        />
      )}
      <Snackbar
        open={snackInfo.openSnack}
        autoHideDuration={6000}
        action={
          <React.Fragment>
            <IconButton aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={snackInfo.severity}>
          {snackInfo.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SlotBookingContainer;
