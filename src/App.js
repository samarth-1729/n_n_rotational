import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [rotation, setRotation] = useState(0);
  const [origins, setOrigins] = useState({});
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  const images = [
    "https://i.postimg.cc/crtmZTTr/image-part-001.jpg",
    "https://i.postimg.cc/CBKG24zM/image-part-002.jpg",
    "https://i.postimg.cc/nspY4xxD/image-part-003.jpg",
    "https://i.postimg.cc/5YkBWFCB/image-part-004.jpg",
    "https://i.postimg.cc/v4dWyycN/image-part-005.jpg",
    "https://i.postimg.cc/YjhNf85b/image-part-006.jpg",
    "https://i.postimg.cc/Mnb1KLBK/image-part-007.jpg",
    "https://i.postimg.cc/9r9Gs0F9/image-part-008.jpg",
    "https://i.postimg.cc/jCmH8PKK/image-part-009.jpg",
  ]; // Change to any n*n list

  const gridSize = Math.sqrt(images.length); // auto-detect grid size

  const rotateImage = () => {
    const deg = Number(document.getElementById("angle").value);
    if (!isNaN(deg)) setRotation(deg);
  };

  useEffect(() => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const newOrigins = {};
    imageRefs.current.forEach((img, index) => {
      if (img) {
        const rect = img.getBoundingClientRect();
        const imgCenterX = rect.left + rect.width / 2;
        const imgCenterY = rect.top + rect.height / 2;

        const originX = centerX - imgCenterX + rect.width / 2;
        const originY = centerY - imgCenterY + rect.height / 2;

        newOrigins[index] = `${originX}px ${originY}px`;
      }
    });

    setOrigins(newOrigins);
  }, [rotation]);

  return (
    <div className="App">
      <div className="inputTag">
        Enter the angle:
        <input type="number" id="angle" />
        <button className="button" onClick={rotateImage}>
          Rotate
        </button>
      </div>

      <div
        className="grid"
        ref={containerRef}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, auto)`,
        }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            ref={(el) => (imageRefs.current[idx] = el)}
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: origins[idx] || "center center",
              transition: "transform 0.5s ease",
            }}
            alt={`img-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
