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

import Pagination from '@material-ui/lab/Pagination';

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
    page: {
        marginTop: theme.spacing(4),
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


const CoachingLogFormView = (props) => {
    // current coaching log version = 1.2
    const classes = useStyles();
    const api_url = process.env.REACT_APP_API_URL;

    const num_of_entries = props.numOfEntries;
    const client_id = props.client_id;
    var coachingLogs = props.coachingLogs;
    var ans = [];
    coachingLogs.forEach(entry => ans.push(entry.data));

    const [ansDate, setAnsDate] = useState(ans[num_of_entries-1].ansDate);
    const [ansSessionFormat, setAnsSessionFormat] = useState(ans[num_of_entries-1].ansSessionFormat);
    const [ansMeetingVenue, setAnsMeetingVenue] = useState(ans[num_of_entries-1].ansMeetingVenue);
    const [ansSessionDuration, setAnsSessionDuration] = useState(ans[num_of_entries-1].ansSessionDuration);
    const [ansQ1Introduction, setAnsQ1Introduction] = useState(ans[num_of_entries-1].ansQ1Introduction);
    const [ansQ2Dermatology, setAnsQ2Dermatology] = useState(ans[num_of_entries-1].ansQ2Dermatology);
    const [ansQ3Pharmacology, setAnsQ3Pharmacology] = useState(ans[num_of_entries-1].ansQ3Pharmacology);
    const [ansQ4Nutrition, setAnsQ4Nutrition] = useState(ans[num_of_entries-1].ansQ4Nutrition);
    const [ansQ5Stress, setAnsQ5Stress] = useState(ans[num_of_entries-1].ansQ5Stress);
    const [ansQ6Sleep, setAnsQ6Sleep] = useState(ans[num_of_entries-1].ansQ6Sleep);
    const [ansQ7Exercise, setAnsQ7Exercise] = useState(ans[num_of_entries-1].ansQ7Exercise);
    const [ansQ8Environment, setAnsQ8Environment] = useState(ans[num_of_entries-1].ansQ8Environment);
    const [ansQ9Others, setAnsQ9Others] = useState(ans[num_of_entries-1].ansQ9Others);

    // change the last entry to React State to allow edit
    ans[num_of_entries-1].ansDate = ansDate;
    ans[num_of_entries-1].ansSessionFormat = ansSessionFormat;
    ans[num_of_entries-1].ansMeetingVenue = ansMeetingVenue;
    ans[num_of_entries-1].ansSessionDuration = ansSessionDuration;
    ans[num_of_entries-1].ansQ1Introduction = ansQ1Introduction;
    ans[num_of_entries-1].ansQ2Dermatology = ansQ2Dermatology;
    ans[num_of_entries-1].ansQ3Pharmacology = ansQ3Pharmacology;
    ans[num_of_entries-1].ansQ4Nutrition = ansQ4Nutrition;
    ans[num_of_entries-1].ansQ5Stress = ansQ5Stress;
    ans[num_of_entries-1].ansQ6Sleep = ansQ6Sleep;
    ans[num_of_entries-1].ansQ7Exercise = ansQ7Exercise;
    ans[num_of_entries-1].ansQ8Environment = ansQ8Environment;
    ans[num_of_entries-1].ansQ9Others = ansQ9Others;

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
    };
    const handleAnsQ2DermatologyChange = (event) => {
        setAnsQ2Dermatology(event.target.value);
    };
    const handleAnsQ3PharmacologyChange = (event) => {
        setAnsQ3Pharmacology(event.target.value);
    };
    const handleAnsQ4NutritionChange = (event) => {
        setAnsQ4Nutrition(event.target.value);
    };
    const handleAnsQ5StressChange = (event) => {
        setAnsQ5Stress(event.target.value);
    };
    const handleAnsQ6SleepChange = (event) => {
        setAnsQ6Sleep(event.target.value);
    };
    const handleAnsQ7ExerciseChange = (event) => {
        setAnsQ7Exercise(event.target.value);
    };
    const handleAnsQ8EnvironmentChange = (event) => {
        setAnsQ8Environment(event.target.value);
    };
    const handleAnsQ9OthersChange = (event) => {
        setAnsQ9Others(event.target.value);
    };

    const [page, setPage] = useState(num_of_entries);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    }
    const handleSubmitClick = () => {
        setOpenConfirmDialog(true);
    }

    const handleSubmitAnswer = async () => {
        setOpenConfirmDialog(false);
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
        // add client id
        await axios.put(`${api_url}coaching-log/edit/${client_id}`, answer, {
            headers: { "Content-Type": "application/json"},
        }).then(response => {
            setOpenAckDialog(true);
        }).catch (err => {
            setOpenFailDialog(true);
            console.log(err);
            console.log(err.response)
        })
    }

    const [openAckDialog, setOpenAckDialog] = useState(false)
    const handleCloseAckDialog = () => {
        setOpenAckDialog(false)
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
                    disabled={coachingLogs[page-1].locked}
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker"
                    label="Date"
                    value={ans[page-1].ansDate}
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
                    disabled={coachingLogs[page-1].locked}
                    label="Session Format"
                    value={ans[page-1].ansSessionFormat}
                    onChange={handleAnsSessionFormatChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                >
                    {sessionFormat.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    id="meeting-venue-text"
                    disabled={(coachingLogs[page-1].locked || ans[page-1].ansSessionFormat === "Online" || ans[page-1].ansSessionFormat === "No show") }
                    variant={(coachingLogs[page-1].locked || ans[page-1].ansSessionFormat === "Online" || ans[page-1].ansSessionFormat === "No show") ? "filled" : "outlined"}
                    label="Meeting Venue"
                    value={ans[page-1].ansMeetingVenue}
                    onChange={handleAnsMeetingVenueChange}
                />
                <TextField
                    id="select-session-duration"
                    select
                    disabled={coachingLogs[page-1].locked}
                    label="Session Duration"
                    value={ans[page-1].ansSessionDuration === null ? "" : ans[page-1].ansSessionDuration}
                    onChange={handleAnsSessionDurationChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
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
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ1Introduction}
                    onChange={handleAnsQ1IntroductionChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 2 - Dermatology: Eczema Symptom Severity"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ2Dermatology}
                    onChange={handleAnsQ2DermatologyChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 3 - Pharmacology: Standard Care Compliance"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ3Pharmacology}
                    onChange={handleAnsQ3PharmacologyChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 4 - Nutrition: Diet Quality"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ4Nutrition}
                    onChange={handleAnsQ4NutritionChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 5 - Stress, + People: Stress, Social Health"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ5Stress}
                    onChange={handleAnsQ5StressChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 6 - Sleep: Sleep Health"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ6Sleep}
                    onChange={handleAnsQ6SleepChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 7 - Exercise: Physical Activity"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ7Exercise}
                    onChange={handleAnsQ7ExerciseChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 8 - Environment: Environmental Allergen Exposure"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ8Environment}
                    onChange={handleAnsQ8EnvironmentChange}
                />
                <TextField
                    id="filled-textarea"
                    label="Part 9 - Others: Self Efficacy"
                    disabled={coachingLogs[page-1].locked}
                    multiline
                    rows={3} rowsMax={10}
                    variant={(coachingLogs[page-1].locked) ? "filled" : "outlined"}
                    value={ans[page-1].ansQ9Others}
                    onChange={handleAnsQ9OthersChange}
                />
            </form>
            <Box className={classes.box}>
                <Pagination
                    count={num_of_entries}
                    size="large"
                    page={page}
                    onChange={handlePageChange}
                    className={classes.page}/>
            </Box>
            <Box className={classes.box}>
                {
                  coachingLogs[page-1].locked ? <div/> :
                  <Button
                      className={classes.button}
                      variant='contained'
                      color='primary'
                      size='small'
                      onClick={handleSubmitClick}
                  >
                  Update
                  </Button>
                }
           </Box>
           <Dialog
               open={openConfirmDialog}
               onClose={handleCloseConfirmDialog}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
           >
               <DialogTitle id="alert-dialog-title">{"Update the last entry?"}</DialogTitle>
               <DialogContent>
                   <DialogContentText id="alert-dialog-description">
                   Updating the last entry will overwrite its original data. This change is NOT reversible.
                   </DialogContentText>
               </DialogContent>
               <DialogActions>
                   <Button onClick={handleCloseConfirmDialog} color="primary">
                       Cancel
                   </Button>
                   <Button onClick={handleSubmitAnswer} color="primary" autoFocus>
                       Update
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
                   Successfully updated the last entry.
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
                   Failed to update.
                   </DialogContentText>
               </DialogContent>
               <DialogActions>
                   <Button onClick={handleCloseFailDialog} color="primary" autoFocus>
                       OK
                   </Button>
               </DialogActions>
           </Dialog>
       </div>
   )
};

export default CoachingLogFormView;
