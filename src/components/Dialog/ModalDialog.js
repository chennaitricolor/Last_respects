import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect } from 'react';

const useStyles = makeStyles({
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
    disabledField: {
      background: '#E0E0E0',
    },
  });

const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
];

const ModalDialog = (props) => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(props.openDialog);
    }, [props.openDialog]);

    return (
        <div >
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
            >
                <div className="row">
                    <div className="col-12 ">
                        <Autocomplete
                            id="combo-box-demo"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            style={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField {...params} label="Zone Name" variant="outlined" />
                            )}
                        />
                    </div>
                    <div className="col-12 ">
                        <Autocomplete
                            id="combo-box-demo"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            style={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField {...params} label="Site Name" variant="outlined" />
                            )}
                        />
                    </div>
                    <div className="col-12 ">
                        <Autocomplete
                                id="combo-box-demo"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                style={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Reassign Reason" variant="outlined" />
                                )}
                            />
                    </div>
                    <div className="col-12 ">
                        <Button variant="contained" className={styles.saveButton} >
                            Save
                        </Button>
                        <Button variant="contained" className={styles.cancelButton} >
                            Cancel
                        </Button>
                    </div>
                </div>
                
            </Dialog>
        </div>
    );
}

ModalDialog.propTypes = {

};


export default ModalDialog;