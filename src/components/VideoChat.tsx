import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoChat(props: any) {
    console.log(props.peerStreams);
    let width = "100%";
    let height = "100%";
    if (props.peerStreams.length > 0) {
        width = `${100 / props.peerStreams.length}%`
        height = `${100 / props.peerStreams.length}%`
    }

    return (
        <div style={{ position: "relative", top: 0, right: 0, marginBottom: 25, marginTop: 25 }} >
            <ul>
                {props.peerStreams?.map((stream: MediaStream) => (
                    <li key={stream.id}>
                        <ReactPlayer url={stream} playing={true} width={width} height={height} />
                    </li>
                ))}
            </ul>
            <div style={{ position: "absolute", top: 0, right: 0 }}>
                <ReactPlayer url={props.userStream} playing={true} width="25%" height="25%" />
            </div>
        </div>
    )
}
