import React from 'react';
import './Explore.css'
import { dpData, exploreData } from '../../Data';

// Function to shuffle the array
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const isTargetImage = (index) => {
    const position = index + 1; // Convert zero-based index to one-based
  
    // First target always 3rd and then 6th
    if (position === 3 || position === 6) return true;
  
    // Skip next 6 images after targeting 3rd and 6th
    if (position > 1 && (position - 1) % 12 === 0) return true;
  
    return false;
  };

  
function Explore() {
    const shuffledData = shuffleArray([...dpData]);

  return (
    <>
    <main>
        <div className="explore-section-container">
            <div className="explore-box-container">
                {
                    shuffledData.map((items, index)=> (
                        <div  className={`explore-box ${isTargetImage(index) ? "span-box" : ""}`}
                            key={index}>
                            <img src={items.img} alt="" />
                             {/* <video 
                             src={items.img}
                             muted
                            //  autoPlay
                             loop
                             playsInline
                             className="reel-video"
                             >
                             </video> */}
                        </div>
                    ))
                }
            </div>
        </div>
    </main>
    
    </>
  )
}

export default Explore