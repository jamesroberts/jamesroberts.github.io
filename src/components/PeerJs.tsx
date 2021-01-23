import Peer from 'peerjs';
import React, { useState, useEffect } from 'react'
import { Button, Input } from '@material-ui/core';

export default function PeerJs() {

    const [id, setId] = useState({});
    const [peer] = useState(new Peer());
    const [friendId, setFriendId] = useState('');
    const [conn, setConn] = useState<any>(null);

    useEffect(() => {
        peer.on('open', function (id: any) {
            setId(id)
        });

        peer.on('connection', function (conn: any) {
            conn.on('data', function (data: any) {
                console.log(data);
            });
            conn.on('open', () => {
                console.log("Connection opened");
                console.log("Connected to :" + conn.peer);
            });
            setConn(conn);
            setFriendId(conn.peer);
        });
    }, [peer]);


    function send() {
        if (conn) {
            conn.send('Hello!');
        }
    }

    function connect() {
        console.log("Connecting...");
        let conn = peer.connect(friendId);
        conn.on('data', function (data: any) {
            console.log(data);
        });
        setConn(conn);
    }

    return (
        <div>
            <Input onChange={event => setFriendId(event.target.value)} />
            <Button variant="contained" color="primary" onClick={send}> Send </Button>
            <Button variant="contained" color="primary" onClick={connect}> Conect </Button>

            <div>
                {"MY ID: " + id}
                <br />
                {"Connecting to: " + friendId}
            </div>
        </div>
    )
}





