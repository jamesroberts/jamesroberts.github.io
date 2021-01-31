import Peer, { DataConnection, MediaConnection } from 'peerjs';
import React, { useState, useEffect } from 'react'
import { Button, Input, TextField } from '@material-ui/core';
import VideoChat from "./VideoChat";
import { Switch } from '@material-ui/core/';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ShareIcon from '@material-ui/icons/Share';
import { useLocation } from "react-router-dom";

export default function PeerJs() {
    const [id, setId] = useState("");
    const [peer, setPeer] = useState(new Peer());
    const [friendId, setFriendId] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);
    const [dataConnection, setDataConnection] = useState<DataConnection | null>(null);
    const [mediaConnection, setMediaConnection] = useState<MediaConnection | null>(null);
    const [peerStreams, setPeerStreams] = useState<MediaStream[] | []>([]);
    const [userStream, setUserStream] = useState<MediaStream | null>(null);
    const [shareScreen, setShareScreen] = useState<boolean>(false);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    // Clean this up later
    let query = useQuery();
    let friend = query.get("friend");
    if (friend && friendId == '') {
        setFriendId(friend);
    }

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

    function generateLink() {
        if (id) {
            let link = window.location.protocol + "//" + window.location.host + "/?friend=" + id
            navigator.clipboard.writeText("Hey Friend! Give me a call using this link :\n" + link)
            setLinkCopied(true);
        }
    }

    return (
        <div>
            <Input onChange={event => setFriendId(event.target.value)} placeholder="Caller ID" />
            {/* <Button variant="contained" color="primary" onClick={send}> Send </Button>
            <Button variant="contained" color="primary" onClick={connect}> Conect </Button> */}
            <Button variant="contained" color="primary" onClick={call} style={{ margin: 10 }}> <VideoCallIcon fontSize="large" /> </Button>

            <Button variant="contained" color="primary" onClick={generateLink}> <ShareIcon fontSize="large" /> </Button>
            {linkCopied ? <div style={{ fontSize: 15, color: "green" }}>Link copied to clipboard</div> : null}
            <br />
            <Switch
                checked={shareScreen}
                onChange={handleSwitchChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            /> Share Screen
            < div >
                {"Your Caller ID: " + id}
                < br />
                {(friendId != '') ? "Connecting to: " + friendId : null}
            </div >
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