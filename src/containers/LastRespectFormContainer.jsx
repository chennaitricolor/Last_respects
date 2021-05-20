import React from 'react';
import * as PropTypes from 'prop-types';
import LastRespectForm from '../components/LastRespectForm';

const LastRespectFormContainer = (props) => {
  let type = 'ADD';

  let details = {
    deceasedName: 'Test',
    isCovid19: 'No',
    deathCertificateNumber: '12312321',
    attenderName: 'test',
    attenderContactNumber: '1232131222',
    attenderRelationship: 'relative',
    address: '123213',
    addressProof: 'drivingLicense',
    status: 'Booked',
  };

  return (
    <div style={{ height: '100%' }}>
      <LastRespectForm onCancel={props.onCancel} type={type} details={details} />
    </div>
  );
};

LastRespectFormContainer.propTypes = {
  onCancel: PropTypes.func,
};

export default LastRespectFormContainer;
