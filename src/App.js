import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateAccountMain from "./LoginPage/CreateAccountMain";
import LoginPage from "./LoginPage/LoginPage";
import UserLoginPage from "./LoginPage/UserLoginPage";
import "./style.css";
import Services from "./Services/Services";
import HomePageMain from "./Home/HomePageMain";
import handymanData from "./DummyDataSets/profileHandyman";
import CreateServicesHandyman from "./Services/CreateServicesHandyman";
import UpdateServicesHandyman from "./Services/UpdateServicesHandyman";
import Profiles from "./Profile/Profiles";
import AcceptedServices from "./Services/AcceptedServices";
import EditProfileHandyMan from "./EditProfiles/EditProfileHandyMan";

export default function App() {
  //================================== Navbar States===========================================
  const [backButtonVisibility, setBackButtonVisibility] = useState(true);
  const [viewHmProfile, setViewHmProfile] = useState(false);
  //==================================Account States===========================================
  const [charSelect, setCharSelect] = useState("");
  const [usercredentialscreated, setUsercredentialscreated] = useState(false);
  const [username, setUsername] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [hm_id, setHm_id] = useState("");
  const [user_id, setUser_id] = useState("");
  //=================================Services States=====================================
  const [servicesCategory, setServicesCategory] = useState("");
  const [filteredServicesData, setFilteredServicesData] = useState([]);
  const [servicesCategorySelection, setServicesCategorySelection] =
    useState("");
  const [individualHMServices, setIndividualHMServices] = useState([]);

  //============================State that hold services data=====================================
  const [createService, setCreateService] = useState(false);
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceTOW, setServiceTOW] = useState([]);
  const [servicePriceFrom, setServicePriceFrom] = useState("");
  const [updateServiceDetails, setUpdateServiceDetails] = useState({});

  //=============================Profile States=====================================
  const [hmProfile, setHmProfile] = useState([]);
  const [individualHmStar, setIndividualHmStar] = useState([]);
  const [individualHmReviews, setIndividualHmReviews] = useState([]);
  //================total review_score and average review_score==================

  //================================APIS=============================================

  //======================= Back button settings ===========================

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/login"
          element={
            <UserLoginPage
              charSelect={charSelect}
              accountCreated={accountCreated}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <CreateAccountMain
              charSelect={charSelect}
              setCharSelect={setCharSelect}
              usercredentialscreated={usercredentialscreated}
              setUsercredentialscreated={setUsercredentialscreated}
              username={username}
              setUsername={setUsername}
              setAccountCreated={setAccountCreated}
            />
          }
        />
        <Route
          path="/home"
          element={
            <HomePageMain
              // averageRating={averageRating}
              charSelect={charSelect}
              setServicesCategory={setServicesCategory}
              setServicesCategorySelection={setServicesCategorySelection}
              setFilteredServicesData={setFilteredServicesData}
              username={username}
              setBackButtonVisibility={setBackButtonVisibility}
              backButtonVisibility={backButtonVisibility}
              setUpdateServiceDetails={setUpdateServiceDetails}
              setHm_id={setHm_id}
              hm_id={hm_id}
              setIndividualHMServices={setIndividualHMServices}
              individualHMServices={individualHMServices}
            />
          }
        />
        <Route
          path="/services"
          element={
            <Services
              // averageRating={averageRating}
              // handymanServicesData={handymanServicesData}
              servicesCategory={servicesCategory}
              servicesCategorySelection={servicesCategorySelection}
              backButtonVisibility={backButtonVisibility}
              setBackButtonVisibility={setBackButtonVisibility}
              setHm_id={setHm_id}
              setHmProfile={setHmProfile}
              setIndividualHmStar={setIndividualHmStar}
              setIndividualHmReviews={setIndividualHmReviews}
              filteredServicesData={filteredServicesData}
              setViewHmProfile={setViewHmProfile}
            />
          }
        />
        <Route
          path="/createservice"
          element={
            <CreateServicesHandyman
              backButtonVisibility={backButtonVisibility}
              setBackButtonVisibility={setBackButtonVisibility}
              setServiceCategory={setServiceCategory}
              setServiceDescription={setServiceDescription}
              setServiceTOW={setServiceTOW}
              setServicePriceFrom={setServicePriceFrom}
              hm_id={hm_id}
              setIndividualHMServices={setIndividualHMServices}
            />
          }
        />
        <Route
          path="/updateservice"
          element={
            <UpdateServicesHandyman
              updateServiceDetails={updateServiceDetails}
              setServiceCategory={setServiceCategory}
              setServiceDescription={setServiceDescription}
              setServiceTOW={setServiceTOW}
              setServicePriceFrom={setServicePriceFrom}
              setIndividualHMServices={setIndividualHMServices}
            />
          }
        />
        <Route
          path="/acceptedservice"
          element={<AcceptedServices username={username} user_id={user_id} />}
        />
        <Route
          path="/profile"
          element={
            <Profiles
              charSelect={charSelect}
              setBackButtonVisibility={setBackButtonVisibility}
              backButtonVisibility={backButtonVisibility}
              hm_id={hm_id}
              hmProfile={hmProfile}
              individualHmStar={individualHmStar}
              individualHmReviews={individualHmReviews}
              setViewHmProfile={setViewHmProfile}
              viewHmProfile={viewHmProfile}
            />
          }
        />
        <Route path="/editprofile" element={<EditProfileHandyMan />} />
      </Routes>
    </div>
  );
}
