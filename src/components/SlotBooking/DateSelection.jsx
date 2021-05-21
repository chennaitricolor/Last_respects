import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  dateSelectionDiv: {
    marginTop: '2%',
  },
  dateTitle: {
    lineHeight: '16px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
  },
  dateCards : {
    marginBottom : 20,
  },
  dateCard: {
    border: '1px solid #828282',
    display: 'inline-block',
    borderRadius: '3px',
    margin: '2% 2% 0 0',
    textAlign: 'center',

    '& .p-card-title': {
      fontSize: '20px',
      color: '#828282',
      fontWeight: 'bold',
      paddingTop: '5%',
    },

    '& .p-card-content': {
      fontSize: '12px',
      color: '#828282',
      padding: '0 2% 0 2%',
    },
  },
  dateCardSelected: {
    border: '1px solid #466783',
    background: '#466783',
    display: 'inline-block',
    borderRadius: '3px',
    margin: '2% 2% 0 0',
    textAlign: 'center',

    '& .p-card-title': {
      fontSize: '20px',
      color: '#fff',
      fontWeight: 'bold',
      paddingTop: '5%',
    },

    '& .p-card-content': {
      fontSize: '12px',
      color: '#fff',
      padding: '0 2% 0 2%',
    },
  },
});

const DateSelection = (props) => {
  const styles = useStyles();

  const date = [
    {
      date: '16',
      available: 8,
    },
    {
      date: '17',
      available: 8,
    },
    {
      date: '18',
      available: 8,
    },
  ];

  console.log(props);

  return (
    <div className={` ${styles.dateSelectionDiv} `}>
      <h6 className={styles.dateTitle}>Date</h6>
      <div className={styles.dateCards}>
        {date.map((date, index) => {
          return (
            <div  key={index} style={{ display: 'inline-block' }} onClick={() => props.selectDate(date)}>
              <Card className={props.selectedDate === date.date ? styles.dateCardSelected : styles.dateCard}>
                <CardContent>
                  <Typography variant={'h5'} component={'div'}>
                    {date.date}
                  </Typography>
                  <Typography>{date.available + ' Slots Available'}</Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

DateSelection.propTypes = {
  selectedDate: PropTypes.string,
  selectDate: PropTypes.func,
};

export default DateSelection;
