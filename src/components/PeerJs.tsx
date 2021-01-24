import Peer, { DataConnection, MediaConnection } from 'peerjs';
import React, { useState, useEffect } from 'react'
import { Button, Input } from '@material-ui/core';
import VideoChat from "./VideoChat";
import { Switch } from '@material-ui/core/';
import VideoCallIcon from '@material-ui/icons/VideoCall';

export default function PeerJs() {

    const [id, setId] = useState("");
    const [peer, setPeer] = useState(new Peer());
    const [friendId, setFriendId] = useState('');
    const [dataConnection, setDataConnection] = useState<DataConnection | null>(null);
    const [mediaConnection, setMediaConnection] = useState<MediaConnection | null>(null);
    const [peerStreams, setPeerStreams] = useState<MediaStream[] | []>([]);
    const [userStream, setUserStream] = useState<MediaStream | null>(null);
    const [shareScreen, setShareScreen] = useState<boolean>(false);

    function handleNewPeer(id: string) {
        setId(id)
    }

    function handlePeerDataConnection(conn: DataConnection) {
        conn = addDataConnectionListeners(conn);
        setDataConnection(conn);
        setFriendId(conn.peer);
    }

    function getAvailableConstraints() {
        // TODO: Get specific constraints
        return { audio: false, video: true };
    }

    async function handlePeerRecieveMediaCall(call: MediaConnection) {
        // TODO: Add an answer or decline prompt
        setFriendId(call.peer);
        let constraints = getAvailableConstraints();
        try {
            let stream;
            if (shareScreen) {
                // @ts-ignore
                stream = await navigator.mediaDevices.getDisplayMedia(constraints);
            } else {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
            }

            call.answer(stream);
            setUserStream(stream);
            call = addMediaConectionListeners(call);
            setMediaConnection(call);
        } catch (error) {
            console.log(error);
        }
    }

    function addDataConnectionListeners(conn: DataConnection) {
        conn.on('open', () => {
            console.log("Connected opened with peer: " + conn.peer);
        });
        conn.on('data', (data: any) => {
            // TODO: Set this to state.
            console.log(data);
        });
        conn.on('close', () => {
            // Handle error
            console.log("Connection closed.");
        });
        conn.on('error', (error: any) => {
            // Handle error
            console.log(error);
        });
        return conn;
    }

    function addMediaConectionListeners(call: MediaConnection) {
        call.on('stream', (stream) => setPeerStreams(peerStreams => [...peerStreams, stream]));
        call.on('error', (error: any) => console.log(error));
        call.on('close', function () {
            setPeerStreams(() => []);
            setMediaConnection(null);
        });
        return call;
    }

    function stopAllStreams() {
        // @ts-ignore
        userStream?.getTracks().forEach(track => track.stop());
        peerStreams?.forEach((stream: MediaStream) => stream.getTracks().forEach(track => track.stop()));
        setUserStream(null);
        setPeerStreams(() => []);
    }

    useEffect(() => {
        peer.on('open', handleNewPeer);
        peer.on('connection', handlePeerDataConnection);
        peer.on('call', handlePeerRecieveMediaCall);
        console.log("Peer initialized");
    }, [peer]);

    function send(conn: DataConnection) {
        conn.send('Hello!');
    }

    function connect() {
        let conn = peer.connect(friendId);
        conn = addDataConnectionListeners(conn);
        setDataConnection(conn);
    }

    function disconnectMediaConnection() {
        mediaConnection?.close()
        setMediaConnection(null);
        stopAllStreams();
    }

    async function call() {
        try {
            let stream;
            if (shareScreen) {
                // @ts-ignore
                stream = await navigator.mediaDevices.getDisplayMedia({ audio: false, video: true });
            } else {
                stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
            }

            let call = peer.call(friendId, stream);
            call = addMediaConectionListeners(call);
            setMediaConnection(call);
            setUserStream(stream);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSwitchChange = (event: any) => {
        setShareScreen(event.target.checked)
    };

    return (
        <div>
            <Input onChange={event => setFriendId(event.target.value)} />
            {/* <Button variant="contained" color="primary" onClick={send}> Send </Button>
            <Button variant="contained" color="primary" onClick={connect}> Conect </Button> */}
            <Button variant="contained" color="primary" onClick={call}> <VideoCallIcon fontSize="large" /> </Button>
            <Switch
                checked={shareScreen}
                onChange={handleSwitchChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            /> Share Screen
            <div>
                {"MY ID: " + id}
                <br />
                {"Connecting to: " + friendId}
            </div>
            <VideoChat peerStreams={peerStreams} userStream={userStream} />
            <div>
                {
                    mediaConnection
                        ? <Button variant="contained" color="secondary" onClick={disconnectMediaConnection}> Disconnect </Button>
                        : null
                }

            </div>
        </div >
    )
}
