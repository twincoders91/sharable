import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import edit from "../Assets/universal/edit.svg";
import trophy from "../Assets/profile/trophy.svg";
import time from "../Assets/profile/time.svg";
import reviews from "../Assets/profile/reviews.svg";
import defaultavatar from "../Assets/profile/defaultavatar.jpeg";

const ProfileUser = ({ setBackButtonVisibility, user_id, setUserDetails }) => {
  //=============================FETCHING APIS============================
  const [averageRating, setAverageRating] = useState("");
  const [profile_image, setProfile_image] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userRatings, setUserRatings] = useState("");

  const navigate = useNavigate();

  const retreiveUserRatingsSummary = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8001/user/${user_id}/ratingssummary`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const user_ratings_jobs = await res.json();
      setUserRatings(user_ratings_jobs[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const retreiveUserInfo = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8001/user/${user_id}/profileimage`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const user_details = await res.json();
      if ((user_details.length = 0)) {
        try {
          const res = await fetch(`http://127.0.0.1:8001/user/${user_id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          });
          const user_details = await res.json();
          setUserDetails(user_details[0]);
          console.log(user_details);

          if (user_details[0].profile_image) {
            setProfile_image(user_details[0].profile_image);
          } else {
            setProfile_image(defaultavatar);
          }
          setUserUsername(user_details[0].username);
          setFirstName(user_details[0].first_name);
          setLastName(user_details[0].last_name);
          setEmail(user_details[0].email);
        } catch (e) {
          console.log(e);
        }
      } else {
        setUserDetails(user_details[0]);
        console.log(user_details);
        setUserUsername(user_details[0].username);
        setFirstName(user_details[0].first_name);
        setLastName(user_details[0].last_name);
        setEmail(user_details[0].email);
        setProfile_image(user_details[0].image_url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //=========================================================

  // const updateProfileImage = async (event) => {
  //   const formData = new FormData();
  //   formData.append("image", event.target.files[0]);
  //   await axios.post("http://127.0.0.1:8001/user/profileimage", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });

  //   setProfile_image(event.target.files[0]);
  //   console.log(event.target.files[0]);
  // };

  const updateProfileImage = async (event) => {
    try {
      // event.preventDefault();
      const file = event.target.files[0];
      // console.log(file);
      // GET SECURE URL FROM OUR SERVER TO ACCESS S3 BUCKET
      const { url } = await fetch("http://localhost:8001/s3url").then((res) =>
        res.json()
      );
      console.log(url);

      // POST THE IMAGE DIRECTLY TO THE S3 BUCKET
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      const imageUrl = url.split("?")[0];
      setProfile_image(imageUrl);
      // POST REQUEST TO MY SERVER TO STORE ANY EXTRA

      try {
        const res = await fetch("http://127.0.0.1:8001/profileimage/", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            image_url: imageUrl,
            user_id: user_id,
          }),
        });
        console.log(res);
      } catch (e) {
        console.error(e);
      }
      retreiveUserInfo();
    } catch (e) {
      console.error(e);
    }

    console.log(profile_image);

    console.log(user_id);
  };

  //=========================================================

  const handleEditProfile = async () => {
    navigate("/editprofileuser");
  };

  useEffect(() => {
    setBackButtonVisibility(true);
    retreiveUserInfo();
    retreiveUserRatingsSummary();
  }, []);

  return (
    <div className="profile--info--container">
      <div className="profile--image--box">
        <img src={profile_image} className="absolute profile--image" />
        <form>
          <input
            onChange={(e) => {
              updateProfileImage(e);
            }}
            type="file"
            accept="image/*"
          ></input>
        </form>
      </div>
      <div className="profile--info--card relative">
        <div className="profile--name--box mt60 fs16 fw700 white">
          <span>
            {userUsername.charAt(0).toUpperCase() + userUsername.slice(1)}
          </span>
        </div>

        <div className="profile--about--box ml24">
          <div className="fw700 fs16 white mt8">Name</div>
          <span className="fw400 fs12 mt12">{`${
            firstName.charAt(0).toUpperCase() + firstName.slice(1)
          } ${" "} ${
            lastName.charAt(0).toUpperCase() + lastName.slice(1)
          } `}</span>
        </div>
        <div className="profile--about--box ml24">
          <div className="fw700 fs16 white mt16">Email</div>
          <span className="fw400 fs12 mt12">{email}</span>
        </div>
        <div className="profile--medal--icons--box  mt16">
          <div className="category--profile--cards">
            <div className="category--profile--cards--box">
              <div className="category--profile--cards--image--box">
                <img src={time} className="profile--icons" alt="images"></img>
              </div>

              <div className="profile--description--cards">
                <div className="category--cards--text fw700 fs14">
                  {userRatings ? userRatings.total_jobs : <>0</>}
                </div>
                <div className="fw400 fs12">total jobs</div>
              </div>
            </div>
            <div className="category--profile--cards--box">
              <div className="category--profile--cards--image--box">
                <img
                  src={trophy}
                  className="profile--trophy--icons"
                  alt="images"
                ></img>
              </div>
              <div className="profile--description--cards">
                <div className="category--cards--text fw700 fs14">
                  {userRatings ? userRatings.average_rating : <>0</>}
                </div>
                <div className="fw400 fs12">average rating</div>
              </div>
            </div>
            <div className="category--profile--cards--box">
              <div className="category--profile--cards--image--box">
                <img
                  src={reviews}
                  className="profile--icons"
                  alt="images"
                ></img>
              </div>
              <div className="profile--description--cards">
                <div className="category--cards--text fw700 fs14">
                  {userRatings ? userRatings.total_ratings : <>0</>}
                </div>
                <div className="fw400 fs12">Rating Points</div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile--medal--icons--box  mt16">
          <div className="category--profile--cards"></div>
        </div>
        <div className="message--button--box mb24">
          <button
            className="message--button fw700 fs14"
            onClick={handleEditProfile}
          >
            <img src={edit} />
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;