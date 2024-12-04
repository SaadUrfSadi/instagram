import React, { useState } from 'react'
import { dpData } from '../../Data'

function StoryAndReels() {

    const [dp, setDp] = useState(dpData);
    console.log(dp);
    
  return (
    <>
    <div className="story-and-reels">
    <div className="story">
              {
                dpData.map((items, value)=>(
                  <div className="dp-box" key={value}>
                      <div className="dp">
                      <img src={items.img} alt="" />
                      <p>{items.username}</p>
                      </div>
                  </div>
                ))
              }
            </div>
    </div>
    </>
  )
}

export default StoryAndReels