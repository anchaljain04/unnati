import React, { useRef } from "react";

function MainLoader({ setLoader }) {
  const videoRef = useRef();
  const handleOnEnd = () => {
    setLoader(false);
  };
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.75;
  };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background:'black'
      }}
    >
      <video
        autoplay=""
        muted
        onEnded={handleOnEnd}
        height="100%"
        width="100%"
        ref={videoRef}
        onCanPlay={() => setPlayBack()}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <source src="/videos/mainLoader.mp4" type="video/mp4" />
      </video>
      {/* <h6>Loading</h6> */}
    </div>
  );
}

export default MainLoader;
