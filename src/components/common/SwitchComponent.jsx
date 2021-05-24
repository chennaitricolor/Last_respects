import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';

const SwitchComponent = ({ isOn, showLabels, offLabelText = 'OFF', onLabelText = 'ON', onSwitchChangeCallback }) => {
  const DefaultColor = '#466783';
  const useStyles = makeStyles({
    switchBase: {
      color: DefaultColor,
      '&$checked': {
        color: DefaultColor,
      },
      '&$checked + $track': {
        backgroundColor: DefaultColor,
      },
    },
    checked: {},
    track: {},
    label: {
      fontSize: 14,
    },
  });

  const classes = useStyles();

  const [switchChecked, SetSwitchChecked] = useState(isOn !== null ? Boolean(isOn) : false);

  const handleChange = () => {
    SetSwitchChecked(!switchChecked);
  };

  useEffect(() => {
    onSwitchChangeCallback(switchChecked);
  }, [switchChecked]);

  return (
    <div>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <span className={classes.label} style={{ fontWeight: !switchChecked ? 'bold' : '' }}>
              {offLabelText}
            </span>
          </Grid>
          <Grid item>
            <Switch
              focusVisibleClassName={classes.focusVisible}
              disableRipple
              classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
              }}
              onChange={handleChange}
              checked={switchChecked}
              size="small"
            />
          </Grid>
          <Grid item>
            <span className={classes.label} style={{ fontWeight: switchChecked ? 'bold' : '' }}>
              {onLabelText}
            </span>
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
};

export default SwitchComponent;
