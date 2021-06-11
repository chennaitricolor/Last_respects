import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RequiredFieldMarker from './RequiredFieldMarker';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import InputMask from 'react-input-mask';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ModalDialog from './Dialog/ModalDialog';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import {
  alwaysDisableSaveButton,
  attenderRelationship,
  bookingStatus,
  buriedRadioButton,
  cancellationReason,
  enableReassignButtonStatus,
  genderRadioButton,
  getCookie,
  getMomentDateStr,
  isMobile,
  isTokenAlive,
  placeOfDeathRadioButton,
  yesNoRadioButton,
} from '../utils/CommonUtils';
import moment from 'moment';
import momentTimeZone from 'moment-timezone';
import { actionTypes } from '../utils/actionTypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  mobileRoot: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    overflowY: 'scroll',
    padding: '5%',
  },
  backButton: {
    fontSize: '12px',
    color: '#000',
  },
  form: {
    display: 'flex',
    flexFlow: 'column',
  },
  header: {
    fontSize: '18px',
    color: '#466783',
    fontWeight: 'bold',
    marginTop: '16px',
  },
  headerValue: {
    fontSize: '16px',
    color: '#4F4F4F',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  fieldLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#151522 !important',
  },
  textField: {
    width: '94%',
    marginTop: '16px',
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
  radioButton: {
    color: '#151522 !important',
    fontSize: '16px',
    fontWeight: 600,
    marginTop: '16px',
  },
  dropDown: {
    width: '94%',
    marginTop: '16px',

    '& label': {
      color: '#707070 !important',
      fontSize: '16px',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  formControlValue: {
    '& span': {
      color: '#466783',
    },
  },
  dropDownSelect: {
    fontSize: '16px',
    height: '40px',
    marginTop: '16px',
    backgroundColor: '#fff',

    '& div': {
      fontSize: '16px',
      color: '#4F4F4F',
    },
  },
  datePicker: {
    width: '94%',
    height: '40px',

    '& div': {
      backgroundColor: '#fff',
      height: '40px',

      '& input': {
        color: '#4F4F4F',
      },

      '& fieldset': {
        border: '1px solid #707070 !important',
      },
    },
  },
  datePickerDisabled: {
    '& div': {
      '& input': {
        color: '#4F4F4F',
      },
      '& fieldset': {
        // background: '#E0E0E0'
      },
    },
  },
  saveButton: {
    background: '#466783',
    color: '#F2F2F2',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '5%',
  },
  cancelButton: {
    border: '1px solid #E5E5E5',
    color: '#466783',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  reAssignButton: {
    border: '1px solid #466783',
    color: '#466783',
    fontSize: '14px',
    fontWeight: 'bold',
    float: 'right',
  },
  disabledField: {
    background: '#E0E0E0',
  },
  buttonProgress: {
    color: theme.palette.action.active,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const renderTextInput = (label, value, id, handleOnChange, styles, multiline, rows, disabled, isRequired = false) => {
  return (
    <div className="col-md-6 col-sm-12 col-12" style={{ marginTop: '16px' }}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <TextField
        className={clsx(`last-respect-form-${id}`, styles.textField, disabled ? styles.disabledField : '')}
        value={value}
        size="small"
        variant={'outlined'}
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? rows : null}
        onChange={(event) => handleOnChange(event, id, 'text')}
        InputLabelProps={{ shrink: true }}
        autoComplete={'disabled'}
      />
    </div>
  );
};

const renderRadioButtonField = (label, value, id, radioButtonList, handleOnChange, styles, disabled, isRequired, isFullwidth, type) => {
  let radioValue = value !== undefined && value !== '' && radioButtonList.length !== 0 ? radioButtonList.filter((values) => values.id === value) : [];
  const lastForm = clsx(`last-respect-form-${id}`);
  const formLabel = clsx(`last-respect-form-${id}-label`, styles.radioButton);
  const radioClass = isFullwidth ? `col-12 ${lastForm}` : `col-md-6  col-sm-12 col-12 ${lastForm}`;
  return (
    <div className={`${radioClass}`}>
      <Typography component={'div'} className={`${formLabel}`}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <RadioGroup
        className={`last-respect-form-${id}-radio-value`}
        style={{ display: 'inline-block' }}
        value={radioValue.length !== 0 ? radioValue[0].value : ''}
        onChange={(event) => handleOnChange(event, id, type, radioButtonList)}
      >
        {radioButtonList.map((radioButton, index) => {
          return (
            <FormControlLabel
              className={` ${styles.formControlValue} last-respect-form-${id}-form-control`}
              key={index}
              value={radioButton.value}
              control={<Radio />}
              label={radioButton.value}
              disabled={disabled}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};

const renderNumberInput = (label, value, id, handleOnChange, lengthAsMask, styles, disabled, isRequired = false) => {
  return (
    <div className="col-md-6  col-sm-12 col-12" style={{ marginTop: '16px' }}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <InputMask mask={lengthAsMask} maskChar={null} value={value} disabled={disabled} onChange={(event) => handleOnChange(event, id, 'text')}>
        {() => (
          <TextField
            className={clsx(styles.textField, disabled ? styles.disabledField : '')}
            size="small"
            variant={'outlined'}
            InputLabelProps={{ shrink: true }}
          />
        )}
      </InputMask>
    </div>
  );
};

const renderDropdownInput = (label, value, id, handleOnChange, list, styles, disabled, isRequired = false) => {
  return (
    <div className="col-md-6  col-sm-12 col-12">
      <FormControl className={styles.dropDown}>
        <Typography component={'div'} className={styles.fieldLabel}>
          {label}
          {isRequired && <RequiredFieldMarker />}
        </Typography>
        <Select
          variant={'outlined'}
          size={'small'}
          className={clsx(styles.dropDownSelect, disabled ? styles.disabledField : '')}
          value={value}
          onChange={(e) => handleOnChange(e.target.value, id, 'dropdown')}
        >
          {list.map((item) => {
            return (
              <MenuItem disabled={disabled} key={item.id} value={item.id}>
                {id === 'zone' ? `${item.id} - ${item.name}` : item.name || item.id}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

const renderDateField = (label, value, id, handleOnChange, styles, disabled, isRequired = false) => {
  return (
    <div className="col-md-6 col-sm-12 col-12" style={{ marginTop: '16px' }}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          className={clsx(styles.datePicker, disabled ? styles.datePickerDisabled : '')}
          disabled={disabled}
          disableFuture
          disableToolbar
          variant="inline"
          format="dd-MM-yyyy"
          inputVariant="outlined"
          autoOk
          margin="normal"
          value={value !== undefined ? value : null}
          onChange={(e) => handleOnChange(e, id, 'date')}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

const initialState = {
  deceasedName: '',
  dependent: '',
  sex: '',
  age: '',
  dateOfDeath: null,
  attenderAddress: '',
  cremationType: '',
  covidRelated: '',
  deathCertNo: '',
  placeOfDeath: '',
  attenderName: '',
  attenderContact: '',
  attenderType: '',
  selectedAttenderType: '',
  otherAttenderType: '',
  aadharOfDeceased: '',
  proofType: '',
  status: 'BOOKED',
  reasonForCancellation: '',
  otherComments: '',
};

const LastRespectForm = (props) => {
  const styles = useStyles();
  const mobileCheck = isMobile();

  const dispatch = useDispatch();
  const [details, setDetails] = useState(initialState);
  const [dataSet, setDataSet] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [snackInfo, setSnackInfo] = useState({
    openSnack: false,
    message: '',
    severity: 'success',
  });

  const snackBarInfo = useSelector((state) => state.showSnackBarMessageReducer);
  const siteInfo = useSelector((state) => state.getSitesBasedOnZoneIdReducer.payload);

  useEffect(() => {
    setSnackInfo({
      openSnack: snackBarInfo.openSnack,
      message: snackBarInfo.message,
      severity: snackBarInfo.severity,
    });
  }, [dispatch, snackBarInfo]);

  useEffect(() => {
    if (props.type === 'EDIT' && props.details !== null) {
      setDetails(props.details);
      setDataSet(true);
    } else {
      setDetails(initialState);
    }
  }, [props.type, props.details]);

  useEffect(() => {
    if (props.type === 'EDIT' && dataSet) {
      if (details.attenderType.startsWith('Others')) {
        let splittedAttenderType = props.details.attenderType.split(' - ');
        setDetails({
          ...details,
          selectedAttenderType: 'Others',
          otherAttenderType: splittedAttenderType.length > 1 ? splittedAttenderType[1] : '',
        });
      } else {
        setDetails({
          ...details,
          selectedAttenderType: details.attenderType,
        });
      }
      setDataSet(false);
    }
  }, [props.type, details, dataSet]);

  const handleOnChange = (event, id, type, dropDownList = []) => {
    if (type === 'text') {
      if (event.target.value !== '') {
        setDetails({
          ...details,
          [id]: event.target.value,
        });
      } else {
        setDetails({
          ...details,
          [id]: '',
        });
      }
    }
    if (type === 'bookingRadioButton') {
      let radioValue =
        bookingStatus[props.details.status] !== undefined
          ? bookingStatus[props.details.status].filter((status) => status.value === event.target.value)
          : [];
      if (event !== null) {
        setDetails({
          ...details,
          [id]: radioValue.length !== 0 ? radioValue[0].id : '',
        });
      }
    }
    if (type === 'radioButton') {
      let radioValue = dropDownList !== [] ? dropDownList.filter((values) => values.value === event.target.value) : [];
      if (event !== null) {
        setDetails({
          ...details,
          [id]: radioValue.length !== 0 ? radioValue[0].id : '',
        });
      }
    }
    if (type === 'yesNoRadioButton') {
      if (event !== null) {
        setDetails({
          ...details,
          [id]: event.target.value === 'Yes',
        });
      }
    }
    if (type === 'dropdown') {
      if (event !== null) {
        setDetails({
          ...details,
          [id]: event,
        });
      }
    }
    if (type === 'date') {
      if (event !== null) {
        setDetails({
          ...details,
          [id]: getMomentDateStr(event, 'YYYY-MM-DD'),
        });
      }
    }
  };

  const handleCloseSnackBar = () => {
    dispatch({
      type: actionTypes.RESET_SNACKBAR,
    });
  };

  const enableSubmit = () => {
    if (props.type === 'EDIT' && alwaysDisableSaveButton.includes(props.details.status)) {
      return false;
    }

    const {
      deceasedName,
      dependent,
      dateOfDeath,
      sex,
      age,
      attenderAddress,
      cremationType,
      covidRelated,
      placeOfDeath,
      attenderName,
      attenderContact,
      selectedAttenderType,
      otherAttenderType,
      status,
      reasonForCancellation,
      otherComments,
    } = details;

    if (props.type === 'ADD') {
      let covidRelatedFieldsCheck = false;
      let attenderTypeCheck = false;
      if (covidRelated !== '') {
        covidRelatedFieldsCheck = covidRelated === false || (covidRelated === true && placeOfDeath !== '');
      }
      if (selectedAttenderType !== '') {
        attenderTypeCheck =
          selectedAttenderType !== '' && (selectedAttenderType !== 'Others' || (selectedAttenderType === 'Others' && otherAttenderType !== ''));
      }
      return (
        deceasedName &&
        dependent &&
        dateOfDeath !== null &&
        sex &&
        age &&
        attenderAddress &&
        cremationType &&
        covidRelatedFieldsCheck &&
        attenderName &&
        attenderContact &&
        attenderContact.length == 10 &&
        attenderTypeCheck &&
        status
      );
    }

    if (props.type === 'EDIT') {
      if (!isOwnerForSelectedSite()) return false;

      let statusCheck = false;
      if (status !== props.details.status) statusCheck = true;
      if (status === 'CANCEL') {
        if (!reasonForCancellation) statusCheck = false;
        if (reasonForCancellation === 'Others' && !otherComments) statusCheck = false;
      }
      return statusCheck;
    }
  };

  const enableReAssignButton = () => {
    return isOwnerForSelectedSite();
  };

  const isOwnerForSelectedSite = () => {
    let currentSiteDetails = props.siteList.filter((site) => site.id === props.siteId);
    return currentSiteDetails.length !== 0 ? currentSiteDetails[0].isOwner : false;
  };

  const handleFormSubmit = () => {
    setSaveLoader(true);
    let token = getCookie('lrToken');

    if (token !== '' && isTokenAlive(token)) {
      let api,
        payload,
        requestMethod = 'POST';

      let slotDetails = details;
      slotDetails.age = parseInt(slotDetails.age);
      slotDetails.slot = props.selectedTime;
      slotDetails.burialSiteId = parseInt(props.siteId);
      slotDetails.dateOfCremation = moment(props.selectedDate, 'DD-MM-YYYY').format('MM-DD-YYYY');

      if (slotDetails.selectedAttenderType === 'Others') {
        slotDetails.attenderType = slotDetails.selectedAttenderType + ' - ' + slotDetails.otherAttenderType;
      }
      slotDetails.attenderType = slotDetails.selectedAttenderType;

      if (!slotDetails.covidRelated) slotDetails.placeOfDeath = '';

      if (props.type === 'ADD') {
        payload = {
          slotDetails: slotDetails,
        };
        api = apiUrls.postSlot;
      }

      if (props.type === 'EDIT') {
        payload = {
          slotDetails: slotDetails,
        };

        payload.type = details.status;
        payload.updatedTime = momentTimeZone().tz('Asia/Kolkata').format();

        if (details.status === 'CANCEL') {
          if (details.reasonForCancellation === 'Others') {
            payload.reason = details.reasonForCancellation + ' - ' + details.otherComments;
          } else {
            payload.reason = details.reasonForCancellation;
          }
        }

        api = apiUrls.updateSlotStatus.replace(':slotId', props.details.id);
        requestMethod = 'PUT';
      }

      callFetchApi(api, null, requestMethod, payload, token)
        .then((response) => {
          if (response.status == 200) {
            setSaveLoader(false);
            dispatch({
              type: actionTypes.GET_SLOTS_BASED_SITE_ID,
              payload: {
                siteId: props.siteId,
              },
            });
            dispatch({
              type: actionTypes.SHOW_SNACKBAR,
              payload: {
                openSnack: true,
                message: `Slot ${props.selectedTime} has ${props.type === 'ADD' ? 'Booked' : 'Updated'}`,
                severity: 'success',
              },
            });
            props.onCancel();
            props.setType('EDIT');
          } else {
            setSaveLoader(false);
            dispatch({
              type: actionTypes.SHOW_SNACKBAR,
              payload: {
                openSnack: true,
                message: 'Error',
                severity: 'error',
              },
            });
          }
        })
        .catch((error) => {
          if (error.response !== undefined && error.response.data !== undefined && error.response.data.error !== undefined) {
            let errorMessage = error.response.data.error[0];
            let message = errorMessage.message;
            if (errorMessage.message === 'Booking already exists') {
              if (error.response.data.meta !== undefined && error.response.data.meta.site !== undefined) {
                let zoneName = 'Zone - ' + error.response.data.meta.site.zoneOrDivision;
                let siteName = ' Site - ' + error.response.data.meta.site.siteName;
                let date =
                  error.response.data.meta.dateOfCremation !== undefined
                    ? moment(error.response.data.meta.dateOfCremation, 'YYYY-MM-DD').format('MMM-DD')
                    : '';
                let siteInfo = zoneName + siteName + ' on ' + date + ' ' + error.response.data.meta.slot;
                message = 'Slot has been already booked for this Aadhar Number: ' + details.aadharOfDeceased + ' for ' + siteInfo;
              }
            }
            setSaveLoader(false);
            dispatch({
              type: actionTypes.SHOW_SNACKBAR,
              payload: {
                openSnack: true,
                message: message,
                severity: 'error',
              },
            });
          }
        });
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const rootStyle = mobileCheck ? styles.mobileRoot : styles.root;
  return (
    <div className={rootStyle}>
      <div>
        {mobileCheck && (
          <div>
            <Button variant={'text'} onClick={props.onCancel} className={styles.backButton}>
              {'<- Back'}
            </Button>
          </div>
        )}
        <form className={styles.form}>
          <Typography className={styles.header} component={'div'}>
            Date & Time Slot
          </Typography>
          <div>
            <Typography className={styles.headerValue} component={'div'} style={{ display: 'inline-block' }}>
              {moment(props.selectedDate, 'DD-MM-YYYY').format('MMM-DD') + ' ' + props.selectedTime}
            </Typography>
            {props.type === 'EDIT' && enableReassignButtonStatus.includes(props.details.status) && (
              <div style={{ display: 'inline-block', float: 'right' }}>
                {openDialog && <ModalDialog setOpenDialog={setOpenDialog} slotDetails={props.details} closeBookingForm={props.onCancel} />}
                <Button
                  variant="outlined"
                  className={styles.reAssignButton}
                  disabled={!enableReAssignButton()}
                  onClick={() => {
                    setOpenDialog(!openDialog);
                  }}
                >
                  {siteInfo.isActive ? 'Re-Schedule' : 'Re-Assign'}
                </Button>
              </div>
            )}
          </div>
          <Typography className={styles.header} component={'div'}>
            Details
          </Typography>
          {props.type === 'EDIT' && (
            <div className="row ">
              <Typography className={styles.fieldLabel} component={'div'} style={{ display: 'inline-block', marginLeft: '16px', marginTop: '8px' }}>
                Booking Id: {details.bookingId}
              </Typography>
            </div>
          )}
          <div className="row ">
            {renderTextInput(
              'Name of Deceased',
              details.deceasedName,
              'deceasedName',
              handleOnChange,
              styles,
              false,
              null,
              props.type === 'EDIT',
              true,
            )}
            {renderTextInput(
              'Name of Father/Husband',
              details.dependent,
              'dependent',
              handleOnChange,
              styles,
              false,
              null,
              props.type === 'EDIT',
              true,
            )}
          </div>
          <div className="row ">
            {renderDateField('Date of Death', details.dateOfDeath, 'dateOfDeath', handleOnChange, styles, props.type === 'EDIT', true)}
            {renderRadioButtonField(
              'Sex',
              details.sex,
              'sex',
              genderRadioButton,
              handleOnChange,
              styles,
              props.type === 'EDIT',
              true,
              false,
              'radioButton',
            )}
          </div>
          <div className="row ">
            {renderNumberInput('Age', details.age, 'age', handleOnChange, '99', styles, props.type === 'EDIT', true)}
            {renderTextInput(
              'Address of Deceased Person',
              details.attenderAddress,
              'attenderAddress',
              handleOnChange,
              styles,
              true,
              3,
              props.type === 'EDIT',
              true,
            )}
          </div>
          <div className="row ">
            {renderRadioButtonField(
              'Buried or Burnt',
              details.cremationType,
              'cremationType',
              buriedRadioButton,
              handleOnChange,
              styles,
              props.type === 'EDIT',
              true,
              false,
              'radioButton',
            )}
          </div>
          <div className="row ">
            {renderRadioButtonField(
              'COVID 19?',
              details.covidRelated,
              'covidRelated',
              yesNoRadioButton,
              handleOnChange,
              styles,
              props.type === 'EDIT',
              true,
              false,
              'yesNoRadioButton',
            )}
            {details.covidRelated &&
              renderRadioButtonField(
                'Place of Death',
                details.placeOfDeath,
                'placeOfDeath',
                placeOfDeathRadioButton,
                handleOnChange,
                styles,
                props.type === 'EDIT',
                true,
                false,
                'radioButton',
              )}
          </div>
          <div className="row ">
            {renderTextInput(
              'Name of Informant/Booking Person',
              details.attenderName,
              'attenderName',
              handleOnChange,
              styles,
              false,
              null,
              props.type === 'EDIT',
              true,
            )}
            {renderNumberInput(
              'Phone Number',
              details.attenderContact,
              'attenderContact',
              handleOnChange,
              '9999999999',
              styles,
              props.type === 'EDIT',
              true,
            )}
          </div>
          <div className="row ">
            {renderDropdownInput(
              'Cremation Conducted by',
              details.selectedAttenderType,
              'selectedAttenderType',
              handleOnChange,
              attenderRelationship,
              styles,
              props.type === 'EDIT',
              true,
            )}
            {details.selectedAttenderType === 'Others' &&
              renderTextInput(
                'Other Attender Type',
                details.otherAttenderType,
                'otherAttenderType',
                handleOnChange,
                styles,
                false,
                null,
                props.type === 'EDIT',
                details.selectedAttenderType === 'Others',
              )}
            {renderNumberInput(
              'Aadhar Number',
              details.aadharOfDeceased,
              'aadharOfDeceased',
              handleOnChange,
              '999999999999',
              styles,
              props.type === 'EDIT',
              false,
            )}
          </div>
          <div className="row ">
            {renderRadioButtonField(
              'Status',
              details.status,
              'status',
              props.type === 'ADD' ? bookingStatus['NEW'] : props.details.status !== '' ? bookingStatus[props.details.status] : [],
              handleOnChange,
              styles,
              !isOwnerForSelectedSite(),
              true,
              true,
              'bookingRadioButton',
            )}
          </div>
          {props.type === 'EDIT' && (
            <div className="row ">
              {details.status === 'CANCEL' &&
                renderDropdownInput(
                  'Reason for Cancellation',
                  details.reasonForCancellation,
                  'reasonForCancellation',
                  handleOnChange,
                  cancellationReason,
                  styles,
                  false,
                  details.status === 'CANCEL',
                )}
              {details.status === 'CANCEL' &&
                details.reasonForCancellation === 'Others' &&
                renderTextInput(
                  'Other Comments',
                  details.otherComments,
                  'otherComments',
                  handleOnChange,
                  styles,
                  false,
                  null,
                  false,
                  details.reasonForCancellation === 'Others',
                )}
            </div>
          )}
        </form>
      </div>
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Button variant="contained" className={styles.saveButton} disabled={!enableSubmit() || saveLoader} onClick={handleFormSubmit}>
          {saveLoader && <CircularProgress size={24} className={styles.buttonProgress} />}Save
        </Button>
        <Button variant="contained" className={styles.cancelButton} disabled={saveLoader} onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
      <Snackbar
        open={snackInfo.openSnack}
        autoHideDuration={10000}
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
    </div>
  );
};

LastRespectForm.propTypes = {
  onCancel: PropTypes.func,
  type: PropTypes.string,
  details: PropTypes.object,
};

export default LastRespectForm;
