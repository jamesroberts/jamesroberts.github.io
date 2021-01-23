import React from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';

export default function RequestButton() {

    return <Button variant="contained" color="primary" onClick={getRequest}> Get </Button>
}

function getRequest() {
    // Make a request for a user with a given ID
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}