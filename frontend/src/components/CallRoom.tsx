import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function CallRoom() {

  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideo.current) {
          localVideo.current.srcObject = stream;
        }

        stream.getTracks().forEach(track =>
          peerRef.current?.addTrack(track, stream)
        );
      });

    peerRef.current.ontrack = event => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0];
      }
    };
  }, []);

  async function shareScreen() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    });

    const sender = peerRef.current
      ?.getSenders()
      .find(s => s.track?.kind === "video");

    if (sender) {
      sender.replaceTrack(screenStream.getVideoTracks()[0]);
    }
  }

  return (
    <div>
      <video ref={localVideo} autoPlay muted />
      <video ref={remoteVideo} autoPlay />

      <button onClick={shareScreen}>
        🖥 Share Screen
      </button>
    </div>
  );
}
