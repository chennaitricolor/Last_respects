import React ,{ useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import agentXLoginLogo from '../images/GccLogo.jpg';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(() => ({
  loginContainer: {
    color: '#777',
    height: '100%',
    margin: 'auto',
    width: '100%',
    padding: '40px 0 0 0',
    maxWidth: '600px'
  },  
  mobileLoginContainer:{
    color: '#777',
    height: '100%',
    margin: 'auto',
    width: '100%',
  },
  loginInformationContainer: {
    backgroundColor: '#243762',
  },
  agentXTitle: {
    paddingTop: '5%',
    fontSize: '28px',
    textAlign: 'center',
    color: '#fff',
  },
  agentXLoginLogo: {
    padding: 0,
  },
  agentXSignInInformation: {
    paddingTop: '5%',
    paddingBottom: '5%',
    textAlign: 'center',
    color: '#fff',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
  },
  successMessage: {
    textAlign: 'center',
    color: 'green',
  },
  textField: {
    width: '94%',
    margin: '5% 2% 0% 2%',

    '& label': {
      color: '#707070 !important',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  actionButton: {
    margin: '5% 0% 10% 2%',
    fontSize: '20px',
    width: '94%',
    bottom: '0',
    backgroundColor: '#3C6886',
    color: '#fff',
  },
  '@global': {
    '.sign-in-button:hover': {
      backgroundColor: '#3C6886',
    },
  },
}));

export const LoginComponent = (props) => {

  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setMobile(false);
    } else {
        setMobile(true);
    }
  },[]);

  const styles = useStyles();
  return (
    <div className={isMobile ? styles.mobileLoginContainer : styles.loginContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'Last Respects'}</title>
      </Helmet>
      <div className={styles.loginInformationContainer}>
        <Typography className={styles.agentXTitle}>Last Respects</Typography>
        <div style={{ textAlign: 'center' }}>
          <img className={styles.agentXLoginLogo} alt={'loginLogo'} src={agentXLoginLogo} />
        </div>
        <Typography className={styles.agentXSignInInformation}>Sign in by entering the information below</Typography>
      </div>
      {props.getLoginResponse !== null && props.getLoginResponse.loginMessage === 'Unauthorized' ? <div className={styles.errorMessage}>Invalid Credentials</div> : <div />}
      <TextField
        className={'agent-x-login-email-id ' + styles.textField}
        label={'Mobile Number'}
        id={'userId'}
        value={props.loginDetails.userId}
        onChange={(event) => props.handleOnChange(event, 'userId', 'text')}
        margin={'normal'}
        autoComplete={'off'}
        variant={'outlined'}
      />
      <TextField
        className={styles.textField + ' agent-x-login-password'}
        label={'Password'}
        id={'Password'}
        value={props.loginDetails.password}
        onChange={(event) => props.handleOnChange(event, 'password', 'text')}
        type={props.loginDetails.showPassword ? 'text' : 'password'}
        margin={'normal'}
        autoComplete={'off'}
        variant={'outlined'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={props.handleClickShowPassword} onMouseDown={props.handleMouseDownPassword}>
                {props.loginDetails.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button id={'agent-x-sign-in-button'} variant="contained" className={styles.actionButton + ' sign-in-button'} onClick={(event) => props.handleLogin(event)}>
        SIGN IN
      </Button>
    </div>
  );
};

LoginComponent.propTypes = {
  loginDetails: PropTypes.object,
  handleOnChange: PropTypes.func,
  handleLogin: PropTypes.func,
  getLoginResponse: PropTypes.any,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
};
