import React from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
        padding: '10px 0',
        margin: '15px auto 0',
        width: "80%"
    },
    cancelButton: {
        border: '1px solid #E5E5E5',
        color: '#466783',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '10px 0',
        margin: '15px auto 0',
        width: "80%"
    },
    disabledField: {
        background: '#E0E0E0',
    },
    reassignModal: {
        padding: '15px 30px'
    },
    close: {
        position: 'absolute',
        top: '10px',
        right: '20px',
        cursor: 'pointer'
    },
    datePickerRoot: {
        width: '100%',

    }
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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleClose = () => {
        props.setOpenDialog(false);
    };

    return (
        <div >
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                fullWidth
            >
                <DialogTitle id="responsive-dialog-title">{"Re-Assign Booking"}</DialogTitle>
                <div className={`container ${styles.reassignModal}`}>
                    <span className={`${styles.close}`} onClick={handleClose}>X Close</span>
                    <div className="row">
                        <div className="col-12 mb-4">
                            <Autocomplete
                                id="zone-combo-box"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                style={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Zone Name" variant="outlined" />
                                )}
                            />
                        </div>
                        <div className="col-12 mb-4 ">
                            <Autocomplete
                                id="site-combo-box"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                style={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Site Name" variant="outlined" />
                                )}
                            />
                        </div>
                        <div className="col-12 mb-4">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={styles.datePickerRoot}
                                    disableToolbar
                                    disablePast
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    inputVariant="outlined"
                                    autoOk
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="col-12 mb-4">
                            <Autocomplete
                                id="time-combo-box"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                style={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Time" variant="outlined" />
                                )}
                            />
                        </div>
                        <div className="col-12 mb-4">
                            <Autocomplete
                                id="reassign-combo-box"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                style={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Reassign Reason" variant="outlined" />
                                )}
                            />
                        </div>
                        <div className="col-12 text-center">
                            <Button variant="contained" className={styles.saveButton} >
                                Save
                            </Button>
                            <Button variant="contained" className={`${styles.cancelButton}`} >
                                Cancel
                        </Button>
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    );
}

ModalDialog.propTypes = {

};


export default ModalDialog;