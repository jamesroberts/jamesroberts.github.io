import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Button } from '@material-ui/core';
import CallEndIcon from '@material-ui/icons/CallEnd';

export default function VideoChat(props: any) {
    // console.log(props.peerStreams);
    let width = "100%";
    let height = "100%";
    if (props.peerStreams.length > 0) {
        width = `${100 / props.peerStreams.length}%`
        height = `${100 / props.peerStreams.length}%`
    }

    function onDisconnect() {
        props.onDisconnect()
    }


    return (
        <div style={{ position: "relative", top: 0, right: 0, marginBottom: 25, marginTop: 25 }} >
            <div style={{ position: "absolute", top: 7, right: 7 }}>
                <ReactPlayer url={props.userStream} playing={true} width="25%" height="25%" style={{ borderRadius: 100 }} />
            </div>
            {/* <ul style={{ listStyle: "none" }}>
                {props.peerStreams?.map((stream: MediaStream) => (
                    <li key={stream.id}>
                        <ReactPlayer url={stream} playing={true} width={width} height={height} />
                    </li>
                ))}
            </ul> */}
            <ReactPlayer url={props.peerStreams[0]} playing={true} width={width} height={height} />
            <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                marginBottom: 25
            }}>
                {props.userStream ? <Button style={{ borderRadius: 100 }} variant="contained" color="secondary" onClick={onDisconnect}> <CallEndIcon fontSize="large" /> </Button> : null}
            </div>


        </div>
    )
}
