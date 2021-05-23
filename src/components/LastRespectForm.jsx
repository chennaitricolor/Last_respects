import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  addressProof,
  alwaysDisableSaveButton,
  attenderRelationship,
  bookingStatus,
  cancellationReason,
  enableReassignButtonStatus,
  getCookie,
  isTokenAlive,
  yesNoRadioButton,
} from '../utils/CommonUtils';
import moment from 'moment';
import momentTimeZone from 'moment-timezone';
import { actionTypes } from '../utils/actionTypes';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
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
        value={radioValue.length != 0 ? radioValue[0].value : ''}
        onChange={(event) => handleOnChange(event, id, type)}
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

const initialState = {
  deceasedName: '',
  covidRelated: '',
  deathCertNo: '',
  attenderName: '',
  attenderContact: '',
  attenderType: '',
  attenderAddress: '',
  proofType: '',
  status: 'BOOKED',
  reasonForCancellation: '',
  otherComments: '',
};

const LastRespectForm = (props) => {
  const styles = useStyles();

  const dispatch = useDispatch();
  const [details, setDetails] = useState(initialState);
  const [saveLoader, setSaveLoader] = useState(false);

  useEffect(() => {
    if (props.type === 'EDIT' && props.details !== null) {
      setDetails(props.details);
    } else {
      setDetails(initialState);
    }
  }, [props.type, props.details]);

  const handleOnChange = (event, id, type) => {
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
    if (type === 'radioButton') {
      let radioValue =
        bookingStatus[props.details.status] !== undefined
          ? bookingStatus[props.details.status].filter((status) => status.value === event.target.value)
          : [];
      if (event !== null) {
        setDetails({
          ...details,
          [id]: radioValue.length != 0 ? radioValue[0].value : '',
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
  };

  const enableSubmit = () => {
    if (props.type === 'EDIT' && alwaysDisableSaveButton.includes(props.details.status)) {
      return false;
    }

    const { deceasedName, covidRelated, attenderName, attenderContact, status, reasonForCancellation } = details;

    if (props.type === 'ADD') {
      return deceasedName && covidRelated !== '' && attenderName && attenderContact && attenderContact.length === 10 && status;
    }

    if (props.type === 'EDIT') {
      let statusCheck = false;
      if (status !== 'BOOKED') statusCheck = true;
      if (status === 'CANCEL' && !reasonForCancellation) statusCheck = false;
      return statusCheck;
    }
  };

  const handleFormSubmit = () => {
    setSaveLoader(true);
    let token = getCookie('lrToken');

    if (token !== '' && isTokenAlive(token)) {
      let api,
        payload,
        requestMethod = 'POST';
      let slotDetails = details;
      slotDetails.slot = props.selectedTime;
      slotDetails.burialSiteId = parseInt(props.siteId);
      slotDetails.dateOfCremation = moment(props.selectedDate, 'DD-MM-YYYY').format('MM-DD-YYYY');

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

        if (details.status === 'CANCEL') payload.reason = details.reasonForCancellation;

        api = apiUrls.updateSlotStatus.replace(':slotId', props.details.id);
        requestMethod = 'PUT';
      }

      callFetchApi(api, null, requestMethod, payload, token).then((response) => {
        if (response.status == 200) {
          setSaveLoader(false);
          dispatch({
            type: actionTypes.GET_SLOTS_BASED_SITE_ID,
            payload: {
              siteId: props.siteId,
            },
          });
          props.onCancel();
        } else {
          setSaveLoader(false);
        }
      });
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className={styles.root}>
      <div>
        <div>
          <Button variant={'text'} onClick={props.onCancel} className={styles.backButton}>
            {'<- Back'}
          </Button>
        </div>
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
                {openDialog && <ModalDialog setOpenDialog={setOpenDialog} />}
                <Button
                  variant="outlined"
                  className={styles.reAssignButton}
                  onClick={() => {
                    setOpenDialog(!openDialog);
                  }}
                >
                  Re-Assign
                </Button>
              </div>
            )}
          </div>
          <Typography className={styles.header} component={'div'}>
            Details
          </Typography>
          <div className="row ">
            {renderTextInput('Deceased Name', details.deceasedName, 'deceasedName', handleOnChange, styles, false, null, props.type === 'EDIT', true)}
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
          </div>
          <div className="row ">
            {renderTextInput(
              'Death Certificate Number',
              details.deathCertNo,
              'deathCertNo',
              handleOnChange,
              styles,
              false,
              null,
              props.type === 'EDIT',
              false,
            )}
            {renderTextInput('Attender Name', details.attenderName, 'attenderName', handleOnChange, styles, false, null, props.type === 'EDIT', true)}
          </div>
          <div className="row ">
            {renderNumberInput(
              'Attender Contact Number',
              details.attenderContact,
              'attenderContact',
              handleOnChange,
              '9999999999',
              styles,
              props.type === 'EDIT',
              true,
            )}
            {renderDropdownInput(
              'Attender Relationship',
              details.attenderType,
              'attenderType',
              handleOnChange,
              attenderRelationship,
              styles,
              props.type === 'EDIT',
              true,
            )}
          </div>
          <div className="row ">
            {renderTextInput('Address', details.attenderAddress, 'attenderAddress', handleOnChange, styles, true, 3, props.type === 'EDIT', true)}
            {renderDropdownInput('Address Proof', details.proofType, 'proofType', handleOnChange, addressProof, styles, props.type === 'EDIT', false)}
          </div>
          <div className="row ">
            {renderRadioButtonField(
              'Status',
              details.status,
              'status',
              props.type === 'ADD' ? bookingStatus['NEW'] : props.details.status !== '' ? bookingStatus[props.details.status] : [],
              handleOnChange,
              styles,
              false,
              true,
              true,
              'radioButton',
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
                  false,
                )}
              {/*{renderTextInput(*/}
              {/*  'Other Comments',*/}
              {/*  details.otherComments,*/}
              {/*  'otherComments',*/}
              {/*  handleOnChange,*/}
              {/*  styles,*/}
              {/*  true,*/}
              {/*  3,*/}
              {/*  props.type === 'EDIT',*/}
              {/*  true,*/}
              {/*)}*/}
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
    </div>
  );
};

LastRespectForm.propTypes = {
  onCancel: PropTypes.func,
  type: PropTypes.string,
  details: PropTypes.object,
};

export default LastRespectForm;
