import React, {useState} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import axios from 'axios';



const getResult = (setState, req) => async() => {
    try{
        console.log("request sent");
        const { data } = await axios.post('http://localhost:9090/trip/plan_trip.do', req);
        console.log("response received: ", data);
        setState(data);
    } catch (error) {
        console.log(error)
    }
}

export const Form = ( {setState} ) => {
    const emptyForm ={
        TripId: -1,
        StartLatitude: 0,
        StartLongitude: 0,
        StartTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        MaxDestTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    };

    const [formData, setFormData] = useState(emptyForm);

    const clear = () => {
        setFormData(emptyForm);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        getResult(setState, formData);
    }

    return(
        <Paper >
            <form autoComplete="off" noValidate c onSubmit={handleSubmit}>
            <Typography variant="h6">Input trip plan request</Typography>
            <TextField style={{margin:'10px'}} name="TripId" variant="outlined" label="Trip ID"  value={formData.TripId} onChange={(e)=>{setFormData({ ...formData, TripId: e.target.value })}}/>
            <TextField style={{margin:'10px'}} name="StartLatitude" variant="outlined" label="Start Latitude" value={formData.StartLatitude} onChange={(e)=>setFormData({ ...formData, StartLatitude: e.target.value })}/>
            <TextField style={{margin:'10px'}} name="StartLongitude" variant="outlined" label="Start Longitude"  value={formData.StartLongitude} onChange={(e)=>setFormData({ ...formData, StartLongitude: e.target.value })}/>

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker style={{margin:'10px'}} label="Start Time" inputVariant="outlined" value={formData.StartTime} onChange={(date) => setFormData({ ...formData, StartTime: moment(date._d.toUTCString()).format("YYYY-MM-DD HH:mm:ss") }) } />
                <DateTimePicker style={{margin:'10px'}} label="Max Dest Time" inputVariant="outlined" value={formData.MaxDestTime} onChange={(date) => setFormData({ ...formData, MaxDestTime: moment(date._d.toUTCString()).format("YYYY-MM-DD HH:mm:ss") }) } />
            </MuiPickersUtilsProvider>

            <Button variant="container" color="primary" size="large" type="submit" onClick={getResult(setState, formData)} fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form