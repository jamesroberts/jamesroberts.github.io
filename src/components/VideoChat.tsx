import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoChat(myStream: any, peerStream: any) {
    return (
        <div>
            <ReactPlayer url={peerStream} playing={true}>
                <ReactPlayer url={myStream} playing={true} width={25} height={50} />
            </ReactPlayer>
        </div>
    )
}
