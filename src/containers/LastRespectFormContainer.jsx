import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import LastRespectForm from '../components/LastRespectForm';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../utils/actionTypes';

const LastRespectFormContainer = (props) => {
  const dispatch = useDispatch();

  const [details, setDetails] = useState(null);

  const slotDetails = useSelector((state) => state.getSlotDetailsBasedOnSlotIdReducer.slotDetails);

  useEffect(() => {
    if (props.type === 'EDIT' && props.editSlotDetails !== null) {
      dispatch({
        type: actionTypes.GET_SLOT_DETAILS_BASED_SLOT_ID,
        payload: {
          slotId: props.editSlotDetails.id,
        },
      });
    }
  }, []);

  useEffect(() => {
    setDetails(slotDetails);
  }, [slotDetails]);

  return (
    <div style={{ height: '92%' }} className="col-12">
      {props.type === 'ADD' ? (
        <LastRespectForm selectedDate={props.date} selectedTime={props.time} siteId={props.siteId} onCancel={props.onCancel} type={props.type} details={details} />
      ) : props.type === 'EDIT' && details !== null ? (
        <LastRespectForm selectedDate={props.date} selectedTime={props.time} siteId={props.siteId} onCancel={props.onCancel} type={props.type} details={details} />
      ) : (
        <div />
      )}
    </div>
  );
};

LastRespectFormContainer.propTypes = {
  onCancel: PropTypes.func,
};

export default LastRespectFormContainer;
