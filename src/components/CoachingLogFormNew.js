import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import React from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    date: {
        width: '80%',
        marginLeft: '10%',
    },
    question: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '80%',
            marginLeft: '10%',
        },
    },
    box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8),
        textAlign: 'center',
    },
}));

const sessionFormat = [
  {
    value: 'Online',
    label: 'Online',
  },
  {
    value: 'Face-to-face',
    label: 'Face-to-face',
  },
  {
    value: 'No show',
    label: 'No show',
  },
];

const sessionDuration = [
    {
        value: '',
        label: '',
    },
    {
        value: '0',
        label: '0 minutes',
    },
    {
        value: '30',
        label: '30 minutes',
    },
    {
        value: '60',
        label: '60 minutes',
    },
]

const CoachingLogFormNew = (props) => {
    // current coaching log version = 1.2
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const client_id = props.client_id;

    const [ansDate, setAnsDate] = useState(new Date());
    const [ansSessionFormat, setAnsSessionFormat] = useState("Online");
    const [ansMeetingVenue, setAnsMeetingVenue] = useState("N/A");
    const [ansSessionDuration, setAnsSessionDuration] = useState("");
    const [ansQ1Introduction, setAnsQ1Introduction] = useState('');
    const [ansQ2Dermatology, setAnsQ2Dermatology] = useState('');
    const [ansQ3Pharmacology, setAnsQ3Pharmacology] = useState('');
    const [ansQ4Nutrition, setAnsQ4Nutrition] = useState('');
    const [ansQ5Stress, setAnsQ5Stress] = useState('');
    const [ansQ6Sleep, setAnsQ6Sleep] = useState('');
    const [ansQ7Exercise, setAnsQ7Exercise] = useState('');
    const [ansQ8Environment, setAnsQ8Environment] = useState('');
    const [ansQ9Others, setAnsQ9Others] = useState('');

    const handleAnsDateChange = (date) => {
      setAnsDate(date);
    };
    const handleAnsSessionFormatChange = (event) => {
        if (event.target.value === "Online" || event.target.value === "No show") {
            setAnsMeetingVenue("N/A");
        };
        setAnsSessionFormat(event.target.value);
    };
    const handleAnsMeetingVenueChange = (event) => {
        setAnsMeetingVenue(event.target.value);
    };
    const handleAnsSessionDurationChange = (event) => {
        setAnsSessionDuration(event.target.value);
    };
    const handleAnsQ1IntroductionChange = (event) => {
        setAnsQ1Introduction(event.target.value);
    }
    const handleAnsQ2DermatologyChange = (event) => {
        setAnsQ2Dermatology(event.target.value);
    }
    const handleAnsQ3PharmacologyChange = (event) => {
        setAnsQ3Pharmacology(event.target.value);
    }
    const handleAnsQ4NutritionChange = (event) => {
        setAnsQ4Nutrition(event.target.value);
    }
    const handleAnsQ5StressChange = (event) => {
        setAnsQ5Stress(event.target.value);
    }
    const handleAnsQ6SleepChange = (event) => {
        setAnsQ6Sleep(event.target.value);
    }
    const handleAnsQ7ExerciseChange = (event) => {
        setAnsQ7Exercise(event.target.value);
    }
    const handleAnsQ8EnvironmentChange = (event) => {
        setAnsQ8Environment(event.target.value);
    }
    const handleAnsQ9OthersChange = (event) => {
        setAnsQ9Others(event.target.value);
    }

    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleSubmitClick = () => {
        setOpenDialog(true);
    }

    const handleSubmitAnswer = async () => {
        setOpenDialog(false);
        const answer = JSON.stringify( {
                            ansDate: ansDate,
                            ansSessionFormat: ansSessionFormat,
                            ansMeetingVenue: ansMeetingVenue,
                            ansSessionDuration: ansSessionDuration,
                            ansQ1Introduction: ansQ1Introduction,
                            ansQ2Dermatology: ansQ2Dermatology,
                            ansQ3Pharmacology: ansQ3Pharmacology,
                            ansQ4Nutrition: ansQ4Nutrition,
                            ansQ5Stress: ansQ5Stress,
                            ansQ6Sleep: ansQ6Sleep,
                            ansQ7Exercise: ansQ7Exercise,
                            ansQ8Environment: ansQ8Environment,
                            ansQ9Others: ansQ9Others
                        } )
        // pass client id to the request
        await axios.post(`${api_url}coaching-log/create/${client_id}`, answer, {
            headers: { "Content-Type": "application/json"},
        }).then(response => {
            setOpenAckDialog(true)
        }).catch( err => {
            setOpenFailDialog(true)
            console.log(err.response)
        })
    }

    const [openAckDialog, setOpenAckDialog] = useState(false)
    const handleCloseAckDialog = () => {
        setOpenAckDialog(false)
        window.location.reload();
    }
    const [openFailDialog, setOpenFailDialog] = useState(false)
    const handleCloseFailDialog = () => {
        setOpenFailDialog(false)
    }

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker className={classes.date}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker"
                    label="Date"
                    value={ansDate}
                    onChange={handleAnsDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <form className={classes.question} noValidate autoComplete="off">
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Session Format"
                    value={ansSessionFormat}
                    onChange={handleAnsSessionFormatChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant={"outlined"}
                >
                    {sessionFormat.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    id="meeting-venue-text"
                    disabled={(ansSessionFormat === "Online" || ansSessionFormat === "No show")}
                    variant={(ansSessionFormat === "Online" || ansSessionFormat === "No show") ? "filled" : "outlined"}
                    label="Meeting Venue"
                    value={ansMeetingVenue}
                    onChange={handleAnsMeetingVenueChange}
                />
                <TextField
                    id="select-session-duration"
                    select
                    label="Session Duration"
                    value={ansSessionDuration}
                    onChange={handleAnsSessionDurationChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant={"outlined"}
                >
                    {sessionDuration.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    id="filled-textarea"
                    size='medium'
                    label="Part 1 - Introduction: Quality of Life"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ1Introduction}
                    onChange={handleAnsQ1IntroductionChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 2 - Dermatology: Eczema Symptom Severity"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ2Dermatology}
                    onChange={handleAnsQ2DermatologyChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 3 - Pharmacology: Standard Care Compliance"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ3Pharmacology}
                    onChange={handleAnsQ3PharmacologyChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 4 - Nutrition: Diet Quality"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ4Nutrition}
                    onChange={handleAnsQ4NutritionChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 5 - Stress, + People: Stress, Social Health"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ5Stress}
                    onChange={handleAnsQ5StressChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 6 - Sleep: Sleep Health"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ6Sleep}
                    onChange={handleAnsQ6SleepChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 7 - Exercise: Physical Activity"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ7Exercise}
                    onChange={handleAnsQ7ExerciseChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 8 - Environment: Environmental Allergen Exposure"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ8Environment}
                    onChange={handleAnsQ8EnvironmentChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 9 - Others: Self Efficacy"
                    placeholder="Text"
                    multiline
                    rows={3} rowsMax={10}
                    variant="outlined"
                    value={ansQ9Others}
                    onChange={handleAnsQ9OthersChange}
                />
            </form>
            <Box className={classes.box}>
                <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={handleSubmitClick}
                >
                Submit new entry
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Submit a new entry?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Submitting a new entry will lock all previous entries except the most recent entry.
                        Unsubmitted changes made to the last entry will also be LOST.
                        This change is NOT reversible.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitAnswer} color="primary" autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openAckDialog}
                    onClose={handleCloseAckDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Acknowledgement"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Successfully submitted a new entry.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAckDialog} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openFailDialog}
                    onClose={handleCloseFailDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Failed to submit.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseFailDialog} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
           </Box>
      </div>
    );
}

export default CoachingLogFormNew;
