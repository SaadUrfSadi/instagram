import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup,  onAuthStateChanged, signOut, sendPasswordResetEmail, updateProfile, signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import { getStorage , ref , uploadBytes, getDownloadURL} from 'firebase/storage'
import { getFirestore , collection , addDoc, getDocs, doc, getDoc,query, where, updateDoc, arrayUnion, arrayRemove, serverTimestamp} from 'firebase/firestore';
// import { getDatabase, set, ref} from "firebase/database";
import { getMessaging } from "firebase/messaging";
import emptyImg from "./images/empty.jpeg"



// ==================================================
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyC5-vuU1TOVSewEglGDC9a03hjEhWP5i5Q",
    authDomain: "bookify-62a91.firebaseapp.com",
    databaseURL: "https://bookify-62a91-default-rtdb.firebaseio.com",
    projectId: "bookify-62a91",
    storageBucket: "bookify-62a91.appspot.com",
    messagingSenderId: "151920696243",
    appId: "1:151920696243:web:818c6ea6cda970ed1f49c6"
  };

export const useFirebase = () => useContext(FirebaseContext);
// ===================================================
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();
  const storage = getStorage(firebaseApp);
  const firestore = getFirestore(firebaseApp);
//   const messaging = getMessaging(firebaseApp);
//   const database = getDatabase(firebaseApp);

//   =================================================
export const messaging = getMessaging(firebaseApp);
export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    const [ registerErr , setRegisterErr] = useState('');
    const [msg, setMsg] = useState('Post Now');
    const [loginErr, setLoginErr] = useState("");
    const [signupErr, setSignupErr] = useState("");
    const [sendEmail, setSendEmail] = useState("");
    const [usernameUser, setUsernameUser] = useState("");
    const [postError, setPostError] = useState("");
    const [users, setUsers] = useState([]);
    const [followRequests, setFollowRequests] = useState([]);
    const [usersFollowers, setUsersFollowers] = useState([]);
    const [emptyURL, setEmptyURL] = useState("");
    console.log(emptyURL);
    console.log(user);
    console.log(usersFollowers);

const fetchUsername = async () => {
    try {
        // if (!user) return;

        const q = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot) {
            const userData = querySnapshot.docs[0].data(); 
            setUsernameUser(userData.username);
        } else {
            console.log("No such user document!");
        }
    } catch (error) {
        console.error("Error fetching username:", error);
    }
    return fetchUsername();
};

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth , (user) =>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        })
    },[])
    // console.log(user);

    const searchUsername = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "instagram username"));
            const usersData = [];
            querySnapshot.forEach((doc) => {
              const userNameData =  usersData.push(doc.data()); 
            });
            setUsers(usersData);
        } catch (error) {
            console.log("searchUsername", error);
        }
    };
    
    const signupUserWithEmail = async (email, password, fullname, username) => {
        try {

                 const response = await fetch(emptyImg);
                 const blob = await response.blob(); 
                 const imgFile = new File([blob], "empty.jpeg", { type: "image/jpeg" });

                 const storageRef = ref(storage, `insta Profile Img/${imgFile.name}`);
                 await uploadBytes(storageRef, imgFile);
                 const imageURL = await getDownloadURL(storageRef);
                 setEmptyURL(imageURL);


            const querySnapshot = await getDocs(collection(firestore, "instagram username"));
            let usernameExists = false;
    
            querySnapshot.forEach((doc) => {
                if (doc.data().username === username) {
                    usernameExists = true;
                }
            });
    
            if (usernameExists) {
                setSignupErr("Username already taken, please choose a different one");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;
            await updateProfile(user, {
              displayName: fullname,
              photoURL: imageURL,
           });

           await addDoc(collection(firestore, "instagram username"),{
             username: username,
             email: email,
             fullName: fullname,
             userUID: user.uid,
             imgURL: imageURL,
           });
        } catch (error) {
            setSignupErr("Register Failed") 
        }
        
    };
    

    const updateUserBio = async (bio) => {
        try {
          if (!user) {
            throw new Error("User is not logged in.");
          }
      
          const q = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
          );
      
          const querySnapshot = await getDocs(q);
      
          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
      
            await updateDoc(docRef, {
              bio: bio,
            });
      
            console.log("Bio updated successfully!");
          } else {
            console.log("No matching user document found!");
          }
        } catch (error) {
          console.error("Error updating bio:", error);
          throw error;
        }
      };

      const getUserBio = async () => {
        try {
          if (!user) {
            throw new Error("User is not logged in.");
          }
      
          const q = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
          );
      
          const querySnapshot = await getDocs(q);
      
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            return userDoc.bio || "";
          } else {
            console.log("No matching user document found!");
            // return "";
          }
        } catch (error) {
          console.error("Error fetching bio:", error);
          throw error;
        }
      };

      const getUsername = async () => {
        try {
            const q = query(
                collection(firestore, "instagram username"),
                where("userUID", "==", user.uid)
            );
            const querSnapshot = await getDocs(q);

            if(!querSnapshot.empty){
                const userDoc = querSnapshot.docs[0].data();
                return userDoc.username || "nhi ha";
            }else{
                console.log("no username found");
            }
        } catch (error) {
            console.error("Error fetching username", error);
          throw error;
        }
      };

      const getPhotoUrl = async (userUID) => {
        try {
            const q = query(
                collection(firestore, "instagram username"),
                where("userUID", "==", userUID)
            );
            const querSnapshot = await getDocs(q);

            if(!querSnapshot.empty){
                const userDoc = querSnapshot.docs[0].data();
                return userDoc.photoURL || emptyImg;
            }else {
                return emptyImg;
              }
        } catch (error) {
            console.error("Error fetching photoURL", error);
          throw error;
        }
      };
      
      

    const updatePhoto = async (file) => {
        try {
            const imageRef = ref(storage, `instagram_users"/"profile_photos/${Date.now()}-${file.name}`);

            const uploadRes = await uploadBytes(imageRef, file);
      
            const downloadURL = await getDownloadURL(uploadRes.ref);
            
            await updateProfile(user, { photoURL: downloadURL });

            const q = query(
                collection(firestore, "instagram username"),
                where("userUID", "==", user.uid)
              );
          
              const querySnapshot = await getDocs(q);
          
              if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
          
                await updateDoc(docRef, {
                    photoURL: downloadURL
                });
          
                console.log("photo updated successfully!");
              } else {
                console.log("photo url error!");
              }

        } catch (error) {
            console.error("Error updating profile photo:", error);
            throw error;
        }
    };
    
    const removePhoto = async (emptyImg) => {
        try {
            await updateProfile(user, { photoURL: null });
            
            console.log("Profile photo removed successfully.");
            return emptyImg;
        } catch (error) {
            console.error("Error removing profile photo:", error);
            throw error;
        }
    };

    const loginWithEmailAndPassword = async(email , password) => {
        try {
            await signInWithEmailAndPassword(firebaseAuth , email , password)
            console.log("login success");  
        } catch (error) {
            setLoginErr("Wrong Password")
        }
    };

    const loginWithUsernameAndPassword  = async (username, password) => {
        try {
        const querySnapshot = await getDocs(collection(firestore, "instagram username"));
        let email = null;

        querySnapshot.forEach((doc) => {
            if (doc.data().username === username) {
                email = doc.data().email;
            }
        });

        if (email) {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            setLoginErr("");
        } else {
            console.log('Username does not exist');
            setLoginErr("Username does not exist");
        }
        } catch (error) {
            console.log("Error logging in:", error);
            setLoginErr("Sorry, your password was incorrect.");
    
        }
    };

    const siginWithGoogle = () => {
        try {
            signInWithPopup(firebaseAuth, googleProvider)
        } catch (error) {
            console.log("login with goggle error", error);
            
        }
    };

    const forgetPassword = async (email) => {
        try{
          await sendPasswordResetEmail(firebaseAuth, email);
          setSendEmail("Send Email")
        }
     catch(err){
          setSendEmail("Send Failed")
    }
};

const postData = async (photo, detail, input) => {
    // console.log(photo)
   
   try {

    if (!detail && !input) {
        setPostError("Faild Missing data!");
      }else{

    const uploadImgURLs = [];

    for(const selectedImg of photo){
        const imageRef = ref(storage, `instagram_users/profile_photos/${Date.now()}-${selectedImg.name}`);

        const uploadRes = await uploadBytes(imageRef, selectedImg);
    
        const downloadURL = await getDownloadURL(uploadRes.ref);

        uploadImgURLs.push(downloadURL);
    };

    const q = query(
        collection(firestore, "instagram username"),
        where("userUID", "==", user.uid)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
            posts: arrayUnion({
                postURL: uploadImgURLs,
                detail: detail,
                postLocation: input,
            }),
        });

  
        setPostError("POST updated successfully!");
      } else {
        console.log("POST Error!");
      }
    }

   } catch (error) {
    console.log('err in post', error)
    setPostError("Error in post", error)
   }
};

  const listAllPost = async  () => {
   try {
    if (!user) {
        throw new Error("User is not logged in.");
    }

    const q = query(
        collection(firestore, "instagram username"),
        where("userUID", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    
    let allUserData = [];

    querySnapshot.forEach((doc) => {
        const userData = doc.data();

        allUserData.push({
            ...userData, 
            posts: userData.posts || [], 
        });
    });

    return allUserData; 

   } catch (error) {
    console.log("List Post", error)
   }
  };

  const sendFollowRequest = async (targetUserUID) => {
    try {
        if (!user) {
            throw new Error("User is not logged in.");
        }

        const q = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", targetUserUID)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const targetUserDoc = querySnapshot.docs[0].ref;

            await updateDoc(targetUserDoc, {
                followRequests: arrayUnion(user.uid),
            });

            console.log("Follow request sent successfully!");
        } else {
            console.log("Target user not found!");
        }

    } catch (error) {
        console.error("Error sending follow request:", error);
        throw error;
    }
};

const fetchFollowRequests = async () => {
  try {
      const q = query(
          collection(firestore, "instagram username"),
          where("userUID", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          
          const requestUIDs = userDoc.followRequests || [];

          const userDetailsPromises = requestUIDs.map(async (uid) => {
              const userQuery = query(
                  collection(firestore, "instagram username"),
                  where("userUID", "==", uid)
              );
              const userSnapshot = await getDocs(userQuery);
              if (!userSnapshot.empty) {
                  return userSnapshot.docs[0].data();
              }
              return null;
          });

          const userDetails = await Promise.all(userDetailsPromises);

          setFollowRequests(userDetails.filter((u) => u !== null));
      }
  } catch (error) {
      console.error("Error fetching follow requests:", error);
  }
};

const confirmFollow = async (requesterUID, requesterURL, requesterUsername, requesterFullname) => {
    try {

        const currentUserQuery = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
        );
        const currentUserSnapshot = await getDocs(currentUserQuery);

        if (!currentUserSnapshot.empty) {
            const currentUserDoc = currentUserSnapshot.docs[0].ref;

            await updateDoc(currentUserDoc, {
                followers: arrayUnion({
                    uid: requesterUID,
                    URL: requesterURL || emptyURL,
                    username: requesterUsername,
                    fullName: requesterFullname,
                }),
                followRequests: arrayRemove(requesterUID),
            });

            const requesterQuery = query(
                collection(firestore, "instagram username"),
                where("userUID", "==", requesterUID)
            );
            const requesterSnapshot = await getDocs(requesterQuery);

            if (!requesterSnapshot.empty) {
                const requesterDoc = requesterSnapshot.docs[0].ref;

                await updateDoc(requesterDoc, {
                    following: arrayUnion({
                        uid: user.uid,
                        photo: user.photoURL,
                        username:usernameUser,
                        fullName:user.displayName,
                    }),
                });
            }

            setFollowRequests((prev) =>
                prev.map((req) =>
                    req.userUID === requesterUID
                        ? { ...req, confirmed: true }
                        : req
                )
            );
            console.log("Follow request confirmed!");
        }
    } catch (error) {
        console.error("Error confirming follow request:", error);
    }
};

const followersFetchData = async () => {
    try {

        const q = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); 
            return userData.followers || [];
        } else {
            console.log("No such user document!");
        }
    } catch (error) {
        console.error("Error fetching followers:", error);
        throw error
    }
};


const followingFetchData = async () => {
    try {

        const q = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); 
            return userData.following || [];
        } else {
            console.log("No such user document!");
        }
    } catch (error) {
        console.error("Error fetching following:", error);
        throw error
    }
};

const postFetchData = async () => {
    try {

        const q = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); 
            return userData.posts || [];
        } else {
            console.log("No such user document!");
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error
    }
};


const deleteFollowRequest = async (requesterUID) => {
    try {
        const currentUserQuery = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", user.uid)
        );
        const currentUserSnapshot = await getDocs(currentUserQuery);

        if (!currentUserSnapshot.empty) {
            const currentUserDoc = currentUserSnapshot.docs[0].ref;

            await updateDoc(currentUserDoc, {
                followRequests: arrayRemove(requesterUID),
            });

            setFollowRequests((prev) =>
                prev.filter((req) => req.userUID !== requesterUID)
            );
            console.log("Follow request deleted!");
        }
    } catch (error) {
        console.error("Error deleting follow request:", error);
    }
};

 const unfollowUser = async (targetUID) => {
    try {
        const currentUID = user.uid;

        const currentUserQuery = query(
            collection(firestore, "instagram username"),
            where("userUID", "==", currentUID)
        );

        const currentUserSnapshot = await getDocs(currentUserQuery);

        if (!currentUserSnapshot.empty) {
            const currentUserDoc = currentUserSnapshot.docs[0].ref;

            await updateDoc(currentUserDoc, {
                following: arrayRemove({
                    uid: targetUID,
                }),
            });

            const targetUserQuery = query(
                collection(firestore, "instagram username"),
                where("userUID", "==", targetUID)
            );

            const targetUserSnapshot = await getDocs(targetUserQuery);

            if (!targetUserSnapshot.empty) {
                const targetUserDoc = targetUserSnapshot.docs[0].ref;

                await updateDoc(targetUserDoc, {
                    followers: arrayRemove(currentUID),
                });
            }

            console.log("Unfollowed successfully!");
        }
    } catch (error) {
        console.error("Error unfollowing user:", error);
    }
};



  
    const isLoggedIn = user ? true : false;

   
    const logout = () => {
        return signOut(firebaseAuth);
    };


    // ========================================================================

    return(
        <FirebaseContext.Provider 
        value={{
            signupUserWithEmail,
             loginWithEmailAndPassword ,
              loginWithUsernameAndPassword,
               siginWithGoogle,
                isLoggedIn,
                 logout,
                  forgetPassword,
                   loginErr, 
                   setLoginErr, 
                   signupErr, 
                   setSignupErr, 
                   setRegisterErr , 
                   registerErr, 
                   msg, 
                   setMsg, 
                   messaging, 
                   user, 
                   sendEmail, 
                   searchUsername, 
                   users,
                   removePhoto,
                   updatePhoto,
                   usernameUser,
                   updateUserBio,
                   getUserBio,
                   getUsername,
                   getPhotoUrl,
                   postData,
                   postError,
                   listAllPost,
                   fetchFollowRequests,
                   sendFollowRequest,
                   deleteFollowRequest,
                   confirmFollow,
                   followRequests,
                   usersFollowers,
                   followersFetchData,
                   unfollowUser,
                   postFetchData,
                   followingFetchData,
                   }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}