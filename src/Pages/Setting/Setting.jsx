import React, {useState , useEffect} from 'react';
import './Setting.css';
import { FaXmark } from "react-icons/fa6";
import emptyImg from '../../images/empty.jpeg';
import Help from '../../Components/Help/Help';
import { useFirebase } from '../../Firebase';

function Setting() {
  // console.log(bio)

  const firebase = useFirebase("");

      const [dpChange, setDpChange] = useState(false);
      const [bio, setBio] = useState("");
      const [charCount, setCharCount] = useState(0);
      const [username, setUsername] = useState("");
      const [dpImage, setDpImage] = useState(firebase.user?.photoURL || emptyImg);

      const changeDp = () => {
        setDpChange((prev)=> !prev)
    };

    const uploadPhoto = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      try {
          const newPhotoURL = await firebase.updatePhoto(file); 
          setDpImage(newPhotoURL);
          alert("Profile photo updated successfully!");
      } catch (error) {
          console.error("Error uploading photo:", error);
          alert("Failed to upload photo.");
      }
  };

  const removePhoto = async () => {
    try {
        const defaultImg = await firebase.removePhoto(emptyImg);
        setDpImage(defaultImg); 
        alert("Profile photo removed successfully!");
    } catch (error) {
        console.log("Error removing photo:", error);
        alert("Failed to remove photo.");
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Save bio to Firestore
    await firebase.updateUserBio(bio);
    alert("Bio updated successfully!");
  } catch (error) {
    console.error("Error updating bio:", error);
  }
};

const handleDescriptionChange = (e) => {
     const inputText = e.target.value;
     if (inputText.length <= 150) {
        setBio(inputText);
        setCharCount(inputText.length)
     } else {
      setBio(inputText.slice(0, 150));
     }
};

useEffect(() => {
  const fetchUsername = async () => {
    try {
      const fetchedUsername = await firebase.getUsername(); 
      setUsername(fetchedUsername); 
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  fetchUsername();
}, [firebase]);

  return (
    <main>
        <div className="setting-container">
        <div className="edit-profile">
            <h2>Edit Profile</h2>
        </div>
        <div className="setting-boxes-container">

       
        <div className="setting-box">
            <div className="setting-user-profile">
            <div className="handle-user-dp">
                 <img src={dpImage} alt="" />
                 <div className="setting-username">
                    <h3>{username}</h3>
                    <span>{firebase.user.displayName}</span>
                 </div>
                 </div>
               <div className="handler-dp-change">
                  <button onClick={changeDp}>Change Photo</button>
            </div>
          </div>
            </div>
             
             <div className="setting-name">
                <h3>Website</h3>
             </div>
            <div className="setting-box">
            <div className="setting-user-profile">
                 <div className="setting-website">
                    <p>Website</p>
                 </div>
          </div>
            </div>
            <div className="setting-web-info">
            <p>Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.</p>
          </div>

          <div className="setting-name">
                <h3>Bio</h3>
             </div>
            <div className="sett-text-area">
                 <textarea placeholder='Bio' 
                 onChange={handleDescriptionChange}
                 value={bio}
                 >{bio}</textarea>
                 <label htmlFor="">{charCount}/150</label>
            </div>

            <div className="setting-name">
                <h3>Show account suggestions on profiles</h3>
             </div>
             <div className="setting-box">
            <div className="setting-user-profile">
            <div className="handle-user-dp">
                 <div className="setting-username">
                    <h3>Show account suggestions on profiles</h3>
                    <p>Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.</p>
                 </div>
                 </div>
               <div className="handler-dp-change">
               {/* <Form>
                 <Form.Check // prettier-ignore
                   type="switch"
                  id="custom-switch"
                   />
                 </Form> */}
            </div>

          </div>
            </div>
        </div>
           
    </div>
      
    <div className="handler-setting-submit">
                  <button onClick={handleSubmit}>Submit</button>
            </div> 

            <div className="help">
                <Help/>
            </div>

            {dpChange && (
                  <div className="modal-overlay set-modal-overlay">
                  <div className="set-modal-content">
                    <div className="profile-set-name">
                    <h3>Change profile photo</h3>
                    </div>
                    <div className="set-width-line">

                     </div>
                      <div className="set-box upload-dp">
                        <h3 onClick={() => document.getElementById('file-input').click()}>Upload Photo</h3>
                      </div>
                      <input
                         type="file"
                         id="file-input"
                         style={{ display: 'none' }}
                         onChange={uploadPhoto}
                      />
                     <div className="set-width-line">

                     </div>
                      <div className="set-box remove-dp">
                        <h3 onClick={removePhoto}>Remove current photo</h3>
                      </div>
                      <div className="set-width-line">
                      
                     </div>
                      <div className="set-box cancel-dp">
                        <h3 onClick={() => changeDp()}>Cancel</h3>
                      </div>
                    <div className="x-mark">
                       <p onClick={() => changeDp()}><FaXmark /></p>
                    </div>
                    
                  </div>
                  </div>
                // </div>
            )} 
    
    </main>
  )
}

export default Setting