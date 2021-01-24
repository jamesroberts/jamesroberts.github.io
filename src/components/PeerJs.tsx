import Peer from 'peerjs';
import React, { useState, useEffect } from 'react'
import { Button, Input } from '@material-ui/core';
import VideoChat from "./VideoChat";
import ReactPlayer from 'react-player'

export default function PeerJs() {

    const [id, setId] = useState("");
    const [peer, setPeer] = useState(new Peer());
    const [friendId, setFriendId] = useState('');
    const [conn, setConn] = useState<any>(null);
    const [peerStream, setPeerStream] = useState<any>(null);
    const [myStream, setStream] = useState<any>(null);

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
            setFriendId(call.peer);
            navigator.mediaDevices.getUserMedia({ audio: false, video: true })
                .then(function (mediaStream) {
                    console.log("Answering media stream..");
                    console.log(mediaStream);
                    call.answer(mediaStream);
                    setStream(mediaStream);
                    call.on('stream', function (stream) {
                        console.log("Setting stream from caller");
                        setPeerStream(stream);
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        console.log("Peer initialized");
    }, [peer]);

    useEffect(() => {
        console.log("Streams updated");
        console.log(myStream);
        console.log(peerStream);
    }, [myStream, peerStream])

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
                setStream(stream);
                let call = peer.call(friendId, stream);
                call.on('stream', function (stream) {
                    console.log("Setting stream from peer");
                    setPeerStream(stream);
                });
                setConn(call);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    return (
        <div>
            <Input onChange={event => setFriendId(event.target.value)} />
            {/* <Button variant="contained" color="primary" onClick={send}> Send </Button>
            <Button variant="contained" color="primary" onClick={connect}> Conect </Button> */}
            <Button variant="contained" color="primary" onClick={call}> Call </Button>

            <div>
                {"MY ID: " + id}
                <br />
                {"Connecting to: " + friendId}
            </div>
            <div style={{ position: "relative", top: 0, right: 0, marginBottom: 250, marginTop: 25 }} >
                <div>
                    <ReactPlayer url={peerStream} playing={true} width="100%" height="100%" />
                </div>
                <div style={{ position: "absolute", top: 0, right: 0 }}>
                    <ReactPlayer url={myStream} playing={true} width="25%" height="25%" />
                </div>
            </div>

        </div >
    )
}





