import Peer, { DataConnection, MediaConnection } from 'peerjs';
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Input } from '@material-ui/core';
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
    const [incomingCall, setIncomingCall] = useState<boolean>(false);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    // Clean this up later
    let query = useQuery();
    let friend = query.get("friend");
    if (friend && friendId === '') {
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

        return {
            audio: false,
            video: {
                frameRate: { ideal: 30, exact: 30 },
                // height: { ideal: 250, max: 500 },
                // width: { ideal: 250, max: 300 },
            }
        };
    }

    async function getUserStream() {
        let constraints = getAvailableConstraints();
        try {
            let stream: MediaStream;
            if (shareScreen) {
                // @ts-ignore
                stream = await navigator.mediaDevices.getDisplayMedia(constraints);
            } else {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
            }
            setUserStream(stream);
            return stream;
        } catch (error) {
            console.log(error);
        }
    }

    async function handlePeerRecieveMediaCall(call: MediaConnection) {
        console.log("Handling call");
        // TODO: Add an answer or decline prompt
        setIncomingCall(true);
        setFriendId(call.peer);
        let stream = await getUserStream();
        if (stream) {
            setUserStream(stream);
            call.answer(stream);
            call = addMediaConectionListeners(call);
            setMediaConnection(call);
        }
    }

    function addDataConnectionListeners(conn: DataConnection) {
        conn.on('open', () => {
            console.log("Connected opened with peer: " + conn.peer);
            console.log(userStream);
        });
        conn.on('data', (data: any) => {
            // TODO: Set this to state.
            console.log(data);
        });
        conn.on('close', () => {
            console.log("Connection closed.");
            // TODO: Fix issue where user streams aren't being stopped on friend close
            console.log(userStream);
            stopPeerStream(conn.peer);
            if (peerStreams.length == 0) {
                console.log("No more peer streams");
                stopAllStreams();
            }
            setFriendId('');
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
        return call;
    }

    function stopAllStreams() {
        if (userStream) {
            userStream.getTracks().forEach(track => track.stop());
            userStream.getVideoTracks().forEach(track => track.stop());
            console.log("User stream tracks stopped");
            setUserStream(null);
        }
        if (peerStreams) {
            peerStreams.forEach((peer: MediaStream) => {
                peer.getTracks().forEach(track => track.stop());
                peer.getVideoTracks().forEach(track => track.stop());
            });
            console.log("Peer streams stopped");
            setMediaConnection(null);
            setPeerStreams(() => []);
        }
        setUserStream(null);
    }

    function stopPeerStream(peerId: string) {
        peerStreams?.forEach((stream: MediaStream) => {
            if (stream.id === peerId) {
                stream.getTracks().forEach(track => track.stop());
                stream.getVideoTracks().forEach(track => track.stop());
            }
        });
        setPeerStreams((peerStreams) => peerStreams.filter(stream => stream.id !== peerId));
    }

    useEffect(() => {
        peer.on('open', handleNewPeer);
        peer.on('connection', handlePeerDataConnection);
        peer.on('call', handlePeerRecieveMediaCall);
        console.log("Peer initialized");
    }, []);

    function send(conn: DataConnection) {
        conn.send('Hello!');
    }

    function connect() {
        let conn = peer.connect(friendId);
        conn = addDataConnectionListeners(conn);
        setDataConnection(conn);
    }

    function disconnectMediaConnection() {
        mediaConnection?.close();
        dataConnection?.close();
        setMediaConnection(null);
        stopAllStreams();
        setFriendId('');
    }

    async function call() {
        let stream = await getUserStream();
        if (stream) {
            let call = peer.call(friendId, stream);
            call = addMediaConectionListeners(call);
            setMediaConnection(call);
            setUserStream(stream);
            connect();
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

    function callForm() {
        return (
            < div >
                <Input onChange={event => setFriendId(event.target.value)} placeholder="Caller ID" />
                {/* <Button variant="contained" color="primary" onClick={send}> Send </Button>
                <Button variant="contained" color="primary" onClick={connect}> Conect </Button> */}
                <Button variant="contained" color="primary" onClick={call} style={{ margin: 10 }}> <VideoCallIcon fontSize="large" /> </Button>

                <Button variant="contained" color="primary" onClick={generateLink}> <ShareIcon fontSize="large" /> </Button>
                { linkCopied ? <div style={{ fontSize: 15, color: "green" }}>Link copied to clipboard</div> : null}
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
                    {(friendId !== '') ? "Connecting to: " + friendId : null
                    }
                </div >
            </div >
        )
    }

    return (
        < div >
            {peerStreams.length > 0 ? null : callForm()}
            <VideoChat peerStreams={peerStreams} userStream={userStream} onDisconnect={disconnectMediaConnection} />
            {/* <div>
                {
                    mediaConnection
                        ? <Button variant="contained" color="secondary" onClick={disconnectMediaConnection}> Disconnect </Button>
                        : null
                }

            </div> */}
        </div >
    )
}
