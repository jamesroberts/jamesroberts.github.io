import Peer from 'peerjs';
import React, { useState, useEffect, useRef } from 'react'
import { Button, Input } from '@material-ui/core';
import ReactPlayer from 'react-player'

export default function PeerJs() {

    const [id, setId] = useState("");
    const [peer, setPeer] = useState(new Peer());
    const [friendId, setFriendId] = useState('');
    const [conn, setConn] = useState<any>(null);
    const [stream, setStream] = useState<any>(null);

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
        peer.on('call', function (call) {
            // Answer the call, providing our mediaStream
            setConn(call);
            setFriendId(call.peer);
            navigator.mediaDevices.getUserMedia({ audio: false, video: true })
                .then(function (mediaStream) {
                    console.log("Answering media stream..");
                    console.log(mediaStream);
                    call.answer(mediaStream);
                    setStream(mediaStream);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        console.log("Peer initialized");
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

    function call() {
        console.log("Calling...");
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(function (stream) {
                let conn = peer.call(friendId, stream);
                setConn(conn);
                setStream(stream);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    return (
        <div>
            <Input onChange={event => setFriendId(event.target.value)} />
            <Button variant="contained" color="primary" onClick={send}> Send </Button>
            <Button variant="contained" color="primary" onClick={connect}> Conect </Button>
            <Button variant="contained" color="primary" onClick={call}> Call </Button>

            <div>
                {"MY ID: " + id}
                <br />
                {"Connecting to: " + friendId}
            </div>
            <div>
                <ReactPlayer url={stream} playing={true} />
            </div>
        </div>
    )
}





