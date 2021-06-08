import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwitchComponent from './../components/common/SwitchComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import TableComponent from './../components/common/TableComponent';
import Header from './../components/Header';
import { Link } from 'react-router-dom';

//styles
const useStyles = makeStyles(() => ({
  backButton: {
    textTransform: 'none',
  },
  headerSection: {
    paddingLeft: 20,
    marginTop: 20,
  },
  headerInfoText: {
    fontSize: '18px',
    color: '#466783',
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoSection: {
    marginTop: 10,
  },
  infoStatusDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  infoStatusText: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  switchColumn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  reAssignBtnBase: {
    fontSize: '14px',
    width: '103px',
    height: '30px',
    borderRadius: '3px',
    textTransform: 'none',
    boxSizing: 'border-box',
    borderRadius: '3px',
  },
  notificationDiv: {
    marginTop: 10,
  },
  notificationOnMessage: {
    fontSize: 12,
  },
  notificationOffDiv: {
    border: 1,
    borderRadius: 10,
    backgroundColor: '#EFDDC8',
    height: 84,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    marginRight: 20,
  },
  notificationOffMessage: {
    fontSize: 16,
    color: '#4F4F4F',
    marginLeft: 8,
  },
  activityDiv: {
    paddingLeft: 20,
    marginTop: 20,
  },
  activityText: {
    paddingLeft: 20,
    marginTop: 20,
  },
  tableDiv: {
    marginTop: 20,
  },
}));

const MachineryManagementContainer = () => {
  const styles = useStyles();

  const machineryManageOnNotification = (
    <span className={styles.notificationOnMessage}>
      On <strong>Turning Off</strong> the status you should to reassign the booked slots.
    </span>
  );

  const machineryManageOffNotification = (
    <div className={styles.notificationOffDiv}>
      <span className={styles.notificationOffMessage}>
        Please Re-assign the already booked slots and inform the respective relative member regarding the change in Time, Date and Location.
      </span>
    </div>
  );

  const [machineryManagementStatus, SetMachineryManagementStatus] = useState(true); //TODO: get status from db ?
  const [machineryManageNotification, SetMachineryManageNotification] = useState(machineryManageOnNotification);
  const [reAssignBtnDisabled, setReAssignBtnDisabled] = useState(true);

  const onSwitchChange = (switchValue) => {
    SetMachineryManagementStatus(switchValue);
  };

  useEffect(() => {
    SetMachineryManageNotification(machineryManagementStatus ? machineryManageOnNotification : machineryManageOffNotification);
    setReAssignBtnDisabled(machineryManagementStatus);
  }, [machineryManagementStatus]);

  return (
    <>
      <Header />
      <div className={styles.headerSection}>
        <div>
          <Button className={styles.backButton} component={Link} to="/slotBooking">
            {'<- Back to Home'}
          </Button>
        </div>
        <div className={styles.headerInfoText}>
          <span>Machinery Management</span>
        </div>
        <div className={styles.infoSection}>
          <div className="row">
            <div className={'col-6 col-md-9 ' + styles.infoStatusDiv}>
              <span className={styles.infoStatusText}>Status</span>
            </div>
            <div className={'col-6 col-md-3 ' + styles.switchColumn}>
              <div>
                <SwitchComponent isOn={machineryManagementStatus} onSwitchChangeCallback={onSwitchChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className={'col-6 col-md-9 '}></div>
            <div className={'col-6 col-md-3 ' + styles.switchColumn}>
              <Button
                variant={'text'}
                className={styles.reAssignBtnBase}
                disabled={reAssignBtnDisabled}
                style={{
                  color: `${reAssignBtnDisabled ? '' : '#FFFFFF'}`,
                  background: `${reAssignBtnDisabled ? '' : '#00AB88'}`,
                  border: `${reAssignBtnDisabled ? '1px solid #C4C4C4' : '1px solid #00AB88'}`,
                }}
              >
                Re-Assign
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.notificationDiv}>{machineryManageNotification}</div>
      </div>
      <div className={styles.activityDiv}>
        <strong>Last 5 activities</strong>
      </div>
      <div className={styles.tableDiv}>
        <TableComponent />
      </div>
    </>
  );
};

export default MachineryManagementContainer;
