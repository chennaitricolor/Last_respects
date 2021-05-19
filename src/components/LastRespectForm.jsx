import React, { useEffect, useState, useRef } from 'react';
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '92%',
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
    marginTop: '2%',
  },
  headerValue: {
    fontSize: '16px',
    color: '#4F4F4F',
    fontWeight: 'bold',
    marginTop: '2%',
  },
  fieldLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#151522 !important',
  },
  textField: {
    width: '94%',
    marginTop: '2%',
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
    marginTop: '3%',
  },
  dropDown: {
    width: '94%',
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
  formControlValue: {
    '& span': {
      color: '#466783',
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
});

const renderTextInput = (label, value, id, handleOnChange, styles, multiline, rows, disabled, isRequired = false) => {
  return (
    <div className="col-md-6 col-sm-12 col-12" style={{ marginTop: '3%' }}>
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

const renderRadioButtonField = (label, value, id, radioButtonList, handleOnChange, styles, disabled, isRequired, isFullwidth) => {
  const lastForm = clsx(`last-respect-form-${id}`);
  const formLablel = clsx(`last-respect-form-${id}-label`, styles.radioButton)
  const radioClass = isFullwidth ? `col-12 ${lastForm}` : `col-md-6  col-sm-12 col-12 ${lastForm}`;
  return (
    <div className={`${radioClass}`}>
      <Typography component={'div'} className={`${formLablel}`}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <RadioGroup
        className={`last-respect-form-${id}-radio-value`}
        style={{ display: 'inline-block' }}
        value={value}
        onChange={(event) => handleOnChange(event, id, 'radioButton')}
      >
        {radioButtonList.map((radioButton, index) => {
          return (
            <FormControlLabel
              className={` ${styles.formControlValue} last-respect-form-${id}-form-control`}
              key={index}
              value={radioButton}
              control={<Radio />}
              label={radioButton}
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
    <div className="col-md-6  col-sm-12 col-12" style={{ marginTop: '3%' }}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <InputMask mask={lengthAsMask} maskChar={null} value={value} disabled={disabled} onChange={(event) => handleOnChange(event, id, 'text')}>
        {() => <TextField className={clsx(styles.textField, disabled ? styles.disabledField : '')} size="small" variant={'outlined'} InputLabelProps={{ shrink: true }} />}
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
  isCovid19: '',
  deathCertificateNumber: '',
  attenderName: '',
  attenderContactNumber: '',
  attenderRelationship: '',
  address: '',
  addressProof: '',
  status: '',
  cancellationReason: '',
  otherComments: ''
};

const LastRespectForm = (props) => {
  const styles = useStyles();


  const [details, setDetails] = useState(initialState);

  useEffect(() => {
    if (props.type === 'EDIT') {
      setDetails(props.details);
    }
  }, [props.type]);

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
      if (event !== null) {
        setDetails({
          ...details,
          [id]: event.target.value,
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

  const yesNoRadioButton = ['Yes', 'No'];

  const status = ['Booked', 'Cancelled Booking', 'Completed', 'No Show'];

  const attenderRelationship = [
    { id: 'family', name: 'Family' },
    { id: 'ngo', name: 'NGO' },
    { id: 'relative', name: 'Relative' },
  ];

  const addressProof = [
    { id: 'aadharCard', name: 'Aadhar Card' },
    { id: 'drivingLicense', name: 'Driving License' },
    { id: 'rationCard', name: 'Ration Card' },
  ];

  const cancellationReason = [
    { id: 'machinery issue', name: 'Machinery Issue' },
  ];

  const enableSubmit = () => {
    const { deceasedName, isCovid19, deathCertificateNumber, attenderName, attenderContactNumber, attenderRelationship, address, addressProof, status } = details;

    return (
      deceasedName &&
      isCovid19 &&
      deathCertificateNumber &&
      attenderName &&
      attenderContactNumber &&
      attenderContactNumber.length == 10 &&
      attenderRelationship &&
      address &&
      addressProof &&
      status
    );
  };

  const modalRef = useRef();
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
              {'15th & 9:30 AM to 10:15 AM'}
            </Typography>
            {props.type === 'EDIT' && (
              <Button variant="outlined" className={styles.reAssignButton} onClick={() => { setOpenDialog(!openDialog) }}>
                Re-Assign
              </Button>
            )}
            {openDialog && <ModalDialog openDialog={openDialog} />}
            <Button variant="outlined" className={styles.reAssignButton} onClick={() => {
              console.log("opendialog state", openDialog);
              return setOpenDialog(!openDialog);
            }}>
              Re-Assign
            </Button>

          </div>
          <Typography className={styles.header} component={'div'}>
            Details
          </Typography>
          <div className="row ">
            {renderTextInput('Deceased Name', details.deceasedName, 'deceasedName', handleOnChange, styles, false, null, props.type === 'EDIT', true)}
            {renderRadioButtonField('COVID 19?', details.isCovid19, 'isCovid19', yesNoRadioButton, handleOnChange, styles, props.type === 'EDIT', true, false)}
          </div>
          <div className="row ">
            {renderTextInput('Death Certificate Number', details.deathCertificateNumber, 'deathCertificateNumber', handleOnChange, styles, false, null, props.type === 'EDIT', true)}
            {renderTextInput('Attender Name', details.attenderName, 'attenderName', handleOnChange, styles, false, null, props.type === 'EDIT', true)}
          </div>
          <div className="row ">
            {renderNumberInput('Attender Contact Number', details.attenderContactNumber, 'attenderContactNumber', handleOnChange, '9999999999', styles, props.type === 'EDIT', true)}
            {renderDropdownInput(
              'Attender Relationship',
              details.attenderRelationship,
              'attenderRelationship',
              handleOnChange,
              attenderRelationship,
              styles,
              props.type === 'EDIT',
              true,
            )}
          </div>
          <div className="row ">
            {renderTextInput('Address', details.address, 'address', handleOnChange, styles, true, 3, props.type === 'EDIT', true)}
            {renderDropdownInput('Address Proof', details.addressProof, 'addressProof', handleOnChange, addressProof, styles, props.type === 'EDIT', true)}
          </div>
          {renderRadioButtonField('Status', details.status, 'status', status, handleOnChange, styles, false, true, true)}
          {props.type === 'EDIT' && ( <div className="row ">
            {renderDropdownInput('Reason for Cancellation', details.cancellationReason, 'cancellationReason', handleOnChange, cancellationReason, styles, props.type === 'EDIT', true)}
            {renderTextInput('Other Comments', details.otherComments, 'otherComments', handleOnChange, styles, true, 3, props.type === 'EDIT', true)}
          </div>
          )}
        </form>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        <Button variant="contained" className={styles.saveButton} disabled={!enableSubmit()}>
          Save
        </Button>
        <Button variant="contained" className={styles.cancelButton} onClick={props.onCancel}>
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
