import React,{ useState, useEffect } from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import RequiredFieldMarker from '../RequiredFieldMarker';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../utils/actionTypes';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getReassignReasons } from '../../utils/CommonUtils';

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


const time = [
    { title: '8:30 AM - 9:15 AM', year: 1994 },
    { title: '9:15 AM - 10:00 AM', year: 1972 },
    { title: '10:00 AM - 10:45 AM', year: 1974 },
    { title: '10:45 AM - 11:30 AM', year: 2008 },
];

const reAssignReasons = getReassignReasons();

const ModalDialog = (props) => {

  const styles = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [siteDetails, setSiteDetails] = useState({
    zoneName: '',
    siteName: '',
  });
  const [reAssignVal, setReassignVal] = useState(reAssignReasons);
  const [showReAssignComment, setShowReAssignComment] = useState(false);
  const [commentVal, setCommentVal] = useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let date = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [maxDate, setMaxDate] = useState(date.setDate(date.getDate()+1))

  const zoneList = useSelector((state) => state.getAllZoneReducer.zoneList);
  const siteList = useSelector((state) => state.getSitesBasedOnZoneIdReducer.siteList);
  const slotList = useSelector((state)=> state.getSlotsBasedOnSiteIdReducer);
  const zoneName = useSelector((state) => state.getAllZoneReducer.zoneName);
  const isActive = useSelector((state) => state.getAllZoneReducer.isActive);
  
  //console.log('isActive', isActive);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  useEffect(()=>{
    setSiteDetails({
      isActive: isActive,
    });
  },[isActive]);

  useEffect(()=>{
    setSiteDetails({
      zoneName: zoneName,
    });
  },[zoneName]);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_ALL_ZONES,
    });
  }, [dispatch]);


  useEffect(() => {
    
    if (siteDetails.zoneName !== '') {
      let zoneId = zoneList.filter((zone) => zone.zone_or_division === siteDetails.zoneName)[0].zone_or_division_id;
      console.log('zoneId===>',zoneId);
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
      if (id  === 'text') {
        setCommentVal(event);
      }
      if(id === 'reAssignReason'){
        event === 'Other' ? setShowReAssignComment(true) : setShowReAssignComment(false);
        setReassignVal(event);
      }
    }
  }

  const enableSubmit = () => {

  }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={true} onClose={handleClose} aria-labelledby="dialog-title" disableBackdropClick >
        <DialogTitle id="responsive-dialog-title">{'Re-Assign Booking'}</DialogTitle>
        <div className={`container ${styles.reassignModal}`}>
          <span className={`${styles.close}`} onClick={handleClose}>
            X Close
          </span>
          <div className="row">
            <div className="col-12 mb-4">
              <Typography className={styles.dropDownLabel} component={'div'}>
                Zone
              </Typography>
              <FormControl className={styles.dropDown}>
                <Select
                  variant={'outlined'}
                  size={'small'}
                  className={styles.dropDownSelect}
                  value={siteDetails.zoneName}
                  onChange={(e) => handleOnChange(e.target.value, 'zoneName')}
                 >
                  {zoneList.map((item) => {
                    return (
                      <MenuItem key={item.zone_or_division_id} value={item.zone_or_division}>
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
                    className={styles.dropDownSelect}
                    value={siteDetails.siteName}
                    onChange={(e) => handleOnChange(e.target.value, 'siteName')}
                  >
                    {siteList.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.site_name}>
                          {item.site_name}
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
                  format="MM/dd/yyyy"
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
              <Autocomplete
                id="time-combo-box"
                options={time}
                getOptionLabel={(option) => option.title}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Time" variant="outlined" />}
              />
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
                    value={reAssignVal}
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
            {showReAssignComment ? (<div className="col-12 mb-4">
                <Typography component={'div'} className={` ${styles.fieldLabel} `}>
                  {'Reason'}
                  <RequiredFieldMarker />
                </Typography>
                <TextField
                  className={styles.textField}
                  value={commentVal}
                  size="small"
                  variant={'outlined'}
                  onChange={(event) => handleOnChange(event, 'text')}
                  InputLabelProps={{ shrink: true }}
                  autoComplete={'disabled'}
                />
            </div>) : null }
            <div className="col-12 text-center">
              <Button variant="contained" className={styles.saveButton} >
                Save
              </Button>
              <Button variant="contained" className={`${styles.cancelButton}`}>
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
