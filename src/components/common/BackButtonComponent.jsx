import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//styles
const useStyles = makeStyles(() => ({
  backButton: {
    fontSize: '12px',
    color: '#000',
    textTransform: 'none',
  },
}));

const BackButtonComponent = ({ displayText, styles, handleOnClick }) => {
  const defaultStyles = useStyles();
  return (
    <Button variant={'text'} className={styles !== undefined ? styles : defaultStyles.backButton} onClick={handleOnClick}>
      {displayText}
    </Button>
  );
};

export default BackButtonComponent;
