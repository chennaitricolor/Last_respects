import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwitchComponent from './../components/common/SwitchComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import TableComponent from './../components/common/TableComponent';
import Header from './../components/Header';
import { Link } from 'react-router-dom';
import ZoneSelection from '../views/ZoneSelection/ZoneSelection';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from './../utils/actionTypes';

//styles
const useStyles = makeStyles(() => ({
  disabledDiv: {
    pointerEvents: 'none',
    opacity: '0.7',
  },
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
  const dispatch = useDispatch();

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
  const [siteDetails, setSiteDetails] = useState({
    zoneName: '',
    siteName: '',
    siteId: '',
    isActive: false,
    isOwner: false,
  });

  const [machineryManagementStatus, SetMachineryManagementStatus] = useState(siteDetails.isActive); //TODO: get status from db ?
  const [machineryManageNotification, SetMachineryManageNotification] = useState(machineryManageOnNotification);
  const [siteSelected, SetSiteSelected] = useState(siteDetails.siteId !== '');
  const [isSiteOwner, setIsSiteOwner] = useState(siteDetails.siteId !== '');
  const [siteList, setSiteList] = useState([]);

  const zoneList = useSelector((state) => state.getAllZoneReducer.zoneList);
  const siteListSelector = useSelector((state) => state.getSitesBasedOnZoneIdReducer.siteList);

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
    setSiteList(siteListSelector);
  }, [siteListSelector]);

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
        dispatch({
          type: actionTypes.SET_ZONE_NAME,
          payload: {
            zoneName: event,
          },
        });
      }
      if (id === 'siteName') {
        let siteDetail = siteListSelector.filter((site) => site.siteName === event)[0];
        setSiteDetails({
          ...siteDetails,
          siteName: event,
          siteId: siteDetail.id,
          isActive: siteDetail.isActive,
          isOwner: siteDetail.isOwner,
        });
        dispatch({
          type: actionTypes.SET_ACTIVE_FLAG,
          payload: {
            isActive: siteListSelector[0].isActive,
            isOwner: siteListSelector[0].isOwner,
            siteId: siteDetail.id,
          },
        });
      }
    }
  };

  useEffect(() => {
    SetSiteSelected(siteDetails.siteId !== '');
    setIsSiteOwner(siteDetails.isOwner);
    SetMachineryManagementStatus(siteDetails.isActive);
  }, [siteDetails]);

  const onSwitchChange = (switchValue) => {
    if (siteSelected) {
      dispatch({
        type: actionTypes.PUT_SITE_STATUS,
        payload: {
          siteId: siteDetails.siteId,
          status: !switchValue,
        },
      });
      siteDetails.isActive = !switchValue;
      setSiteDetails(siteDetails);
      SetMachineryManagementStatus(siteDetails.isActive);
      updateAndReplaceCurrentSite();
    }
  };

  const updateAndReplaceCurrentSite = () => {
    var newSiteDetails = [];
    siteList.forEach((site) => {
      if (site.id === siteDetails.siteId) {
        site.isActive = siteDetails.isActive;
      }
      newSiteDetails.push(site);
    });
    setSiteList(newSiteDetails);
  };

  useEffect(() => {
    SetMachineryManageNotification(machineryManagementStatus ? machineryManageOnNotification : machineryManageOffNotification);
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

          <ZoneSelection siteDetails={siteDetails} zoneList={zoneList} siteList={siteList} handleOnChangeForDropdown={handleOnChangeForDropdown} />
        </div>
        <div className={isSiteOwner ? '' : styles.disabledDiv}>
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
                  disabled={machineryManagementStatus}
                  style={{
                    color: `${machineryManagementStatus ? '' : '#FFFFFF'}`,
                    background: `${machineryManagementStatus ? '' : '#00AB88'}`,
                    border: `${machineryManagementStatus ? '1px solid #C4C4C4' : '1px solid #00AB88'}`,
                  }}
                >
                  Re-Assign
                </Button>
              </div>
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
