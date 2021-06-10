import React, { useState, useEffect } from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import RequiredFieldMarker from '../RequiredFieldMarker';
import ErrorMessage from '../ErrorMessage';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../utils/actionTypes';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getReassignReasons, getMomentDateStr, getCookie, isTokenAlive } from '../../utils/CommonUtils';
import { apiUrls } from '../../utils/constants';
import { callFetchApi } from '../../services/api';
import moment from 'moment';

const useStyles = makeStyles({
  dropDownLabel: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#000000',
  },
  dropDown: {
    width: '100%',
    marginTop: '3%',

    '& label': {
      color: '#707070 !important',
      fontSize: '16px',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  dropDownSelect: {
    fontSize: '16px',
    height: '40px',
    marginTop: '3%',
    backgroundColor: '#fff',

    '& div': {
      fontSize: '16px',
      color: '#4F4F4F',
    },
  },
  saveButton: {
    background: '#466783',
    color: '#F2F2F2',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px 0',
    margin: '15px auto 0',
    width: '80%',
  },
  cancelButton: {
    border: '1px solid #E5E5E5',
    color: '#466783',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px 0',
    margin: '15px auto 0',
    width: '80%',
  },
  disabledField: {
    background: '#E0E0E0',
  },
  reassignModal: {
    padding: '15px 30px',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    cursor: 'pointer',
  },
  datePickerRoot: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#151522 !important',
  },
  textField: {
    width: '100%',
    marginTop: '5%',
    backgroundColor: '#fff',

    '& label': {
      color: '#707070 !important',
      fontSize: '16px',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },

    '& input': {
      fontSize: '16px',
      color: '#4F4F4F',
    },
  },
});

const reAssignReasons = getReassignReasons();

const ModalDialog = (props) => {
  const styles = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [siteDetails, setSiteDetails] = useState({
    zoneName: '',
    siteName: '',
  });
  const [selectedReason, setReassignReason] = useState('');
  const [showReAssignComment, setShowReAssignComment] = useState(false);
  const [commentVal, setCommentVal] = useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let date = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [maxDate, setMaxDate] = useState(date.setDate(new Date().getDate() + 1));
  const [showError, setShowError] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const zoneList = useSelector((state) => state.getAllZoneReducer.zoneList);
  const siteList = useSelector((state) => state.getSitesBasedOnZoneIdReducer.siteList);
  const zoneDetailsPayload = useSelector((state) => state.getAllZoneReducer.payload);
  const payload = useSelector((state) => state.getSitesBasedOnZoneIdReducer.payload);
  const availableSlotDetails = useSelector((state) => state.getAvailableSlotDetailsBasedOnSiteIdReducer.slotDetails);
  const isActive = payload.isActive;
  const isOwner = payload.isOwner;
  const siteId = payload.siteId;
  let availableTimeSlots = availableSlotDetails !== null ? Object.keys(availableSlotDetails[Object.keys(availableSlotDetails)[0]]) : [];

  console.log("zone", zoneDetailsPayload.zoneName);
  console.log("site", zoneDetailsPayload.siteName);
  console.log("isActive", isActive);
  console.log("isOwner", isOwner);
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  useEffect(() => {
    setSiteDetails({
      isActive: isActive,
    });
  }, [isActive]);

  useEffect(() => {
    setSiteDetails({
      zoneName: zoneDetailsPayload.zoneName,
      siteName: zoneDetailsPayload.siteName,
    });
  }, [zoneDetailsPayload.zoneName,zoneDetailsPayload.siteName]);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_ALL_ZONES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (siteDetails.zoneName !== '') {
      const zoneFilterCdn = zoneList.filter((zone) => zone.zone_or_division === siteDetails.zoneName);
      if (zoneFilterCdn.length > 0) {
        let zoneId = zoneFilterCdn[0].zone_or_division_id;
        dispatch({
          type: actionTypes.GET_SITES_BASED_ZONE_ID,
          payload: {
            zoneId: zoneId,
          },
        });
      }
    }
  }, [dispatch, siteDetails.zoneName]);

  useEffect(() => {
    if (siteDetails.zoneName !== '' && siteDetails.siteName !== '') {
      const siteFilterCdn = siteList.filter((site) => site.site_name === siteDetails.siteName);
      if (siteFilterCdn.length > 0) {
        let siteId = siteFilterCdn[0].id;
        dispatch({
          type: actionTypes.GET_SLOTS_BASED_SITE_ID,
          payload: {
            siteId: siteId,
          },
        });
      }
    }
  }, [dispatch, siteDetails]);

  const enableSubmitAction = () => {
    let result = false;
    result =
      siteDetails.zoneName !== '' &&
      siteDetails.siteName !== '' &&
      selectedDate !== null &&
      selectedDate !== '' &&
      selectedTime !== '' &&
      selectedReason !== ''
      && isOwner;

    result = showReAssignComment ? commentVal !== '' : result;

    result  ? setEnableSubmit(true) : setEnableSubmit(false);
  };

  //handle submit
  useEffect( () => {
    enableSubmitAction();
  },[zoneDetailsPayload.zoneName ,siteDetails.siteName,selectedDate,selectedTime,selectedReason,isOwner,commentVal]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch({
      type: actionTypes.GET_AVAILABLE_SLOT_DETAILS_BASED_SITE_ID,
      payload: {
        siteId: siteId,
        availableFlag: true,
        date: getMomentDateStr(date, 'YYYY-MM-DD'),
      },
    });
  };

  const handleOnChange = (event, id) => {
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
      if (id === 'text') {
        setCommentVal(event);
      }
      if (id === 'reAssignReason') {
        event === 'Other' ? setShowReAssignComment(true) : setShowReAssignComment(false);
        setReassignReason(event);
      }
      if (id === 'time') {
        setSelectedTime(event);
      }
    }
  };

  const handleSubmit = () => {
    setShowError(false);
    setEnableSubmit(false);
    let token = getCookie('lrToken');
    if (token !== '' && isTokenAlive(token)) {
      let api = apiUrls.updateSlotStatus.replace(':slotId', props.slotDetails.id);
      let slotDetails = props.slotDetails;
      slotDetails.id = undefined;
      slotDetails.slot = selectedTime;
      slotDetails.dateOfCremation = moment(selectedDate, 'DD-MM-YYYY').format('MM-DD-YYYY');
      slotDetails.burialSiteId = parseInt(siteId);

      let reAssignPayload = {
        slotDetails: slotDetails,
        type: 'REASSIGN',
        reason: showReAssignComment ? selectedReason + ' - ' + commentVal : selectedReason,
      };

      callFetchApi(api, null, 'PUT', reAssignPayload, token).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.GET_SLOTS_BASED_SITE_ID,
            payload: {
              siteId: siteId,
            },
          });
          props.setOpenDialog(false);
        } else {
          setShowError(true);
        }
      });
    }
  };

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={true} onClose={handleClose} aria-labelledby="dialog-title" disableBackdropClick>
        <DialogTitle id="responsive-dialog-title">{'Re-Assign Booking'}</DialogTitle>
        <div className={`container ${styles.reassignModal}`}>
          <span className={`${styles.close}`} onClick={handleClose}>
            X Close
          </span>
          <div className="row">
            {showError && <ErrorMessage />}
            <div className="col-12 mb-4">
              <Typography className={styles.dropDownLabel} component={'div'}>
                Zone
              </Typography>
              <FormControl className={styles.dropDown}>
                <Select
                  variant={'outlined'}
                  size={'small'}
                  disabled={isActive}
                  className={clsx(styles.dropDownSelect, isActive ? styles.disabledField : '')}
                  value={siteDetails.zoneName}
                  onChange={(e) => handleOnChange(e.target.value, 'zoneName')}
                >
                  {zoneList.map((item) => {
                    return (
                      <MenuItem disabled={isActive} key={item.zone_or_division_id} value={item.zone_or_division}>
                        {item.zone_or_division}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 mb-4 ">
              <Typography className={styles.dropDownLabel} component={'div'}>
                Site
              </Typography>
              <FormControl className={styles.dropDown}>
                <Select
                  variant={'outlined'}
                  size={'small'}
                  className={clsx(styles.dropDownSelect, isActive ? styles.disabledField : '')}
                  value={siteDetails.siteName}
                  disabled={isActive}
                  onChange={(e) => handleOnChange(e.target.value, 'siteName')}
                >
                  {siteList.map((item) => {
                    return (
                      <MenuItem disabled={isActive} key={item.id} value={item.siteName}>
                        {item.siteName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 mb-4">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={styles.datePickerRoot}
                  disableToolbar
                  disablePast
                  variant="inline"
                  format="dd-MM-yyyy"
                  inputVariant="outlined"
                  autoOk
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  maxDate={maxDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="col-12 mb-4">
              <Typography className={styles.dropDownLabel} component={'div'}>
                Time
              </Typography>
              <FormControl className={styles.dropDown}>
                <Select
                  variant={'outlined'}
                  size={'small'}
                  className={styles.dropDownSelect}
                  value={selectedTime}
                  onChange={(e) => handleOnChange(e.target.value, 'time')}
                >
                  {availableTimeSlots.map((item, i) => {
                    return (
                      <MenuItem key={`item${i}`} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 mb-4">
              <Typography className={styles.dropDownLabel} component={'div'}>
                Re-Assign Reason
              </Typography>
              <FormControl className={styles.dropDown}>
                <Select
                  variant={'outlined'}
                  size={'small'}
                  className={styles.dropDownSelect}
                  value={selectedReason}
                  onChange={(e) => handleOnChange(e.target.value, 'reAssignReason')}
                >
                  {reAssignReasons.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.reason}>
                        {item.reason}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            {showReAssignComment ? (
              <div className="col-12 mb-4">
                <Typography component={'div'} className={` ${styles.fieldLabel} `}>
                  {'Reason'}
                  <RequiredFieldMarker />
                </Typography>
                <TextField
                  className={styles.textField}
                  value={commentVal}
                  size="small"
                  variant={'outlined'}
                  onChange={(event) => handleOnChange(event.target.value, 'text')}
                  InputLabelProps={{ shrink: true }}
                  autoComplete={'disabled'}
                />
              </div>
            ) : null}
            <div className="col-12 text-center">
              <Button variant="contained" className={styles.saveButton} disabled={!enableSubmit} onClick={handleSubmit}>
                Save
              </Button>
              <Button variant="contained" className={`${styles.cancelButton}`} onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

ModalDialog.propTypes = {};

export default ModalDialog;
