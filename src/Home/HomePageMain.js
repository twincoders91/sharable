import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ProfileHandyman from "../Profile/ProfileHandyman";
import HomePage from "./HomePage";
import HomePageHandyman from "./HomePageHandyman";

const HomePageMain = ({
  charSelect,
  handymanServicesData,
  setServicesCategory,
  setServicesCategorySelection,
  username,
  setBackButtonVisibility,
  backButtonVisibility,
  setUpdateServiceDetails,
  setHm_id,
  hm_id,
  individualHMServices,
  setIndividualHMServices,
}) => {
  //============================States to make sure correct pages show============================
  const [updateService, setUpdateService] = useState(false);

  const [hmRatings, setHmRatings] = useState([]);

  //============================Filtering HM data down to HM's username===========================
  const HMindividualServices = handymanServicesData.filter(
    (filteredServices) => {
      return filteredServices.username === username;
    }
  );

  //=====================================API========================================
  //============================= Get Handyman ID ================================

  const getHandymanID = async () => {
    if (!username) return;
    try {
      const res = await fetch(`http://127.0.0.1:8001/handyman/${username}/id`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      console.log(res);
      const data = await res.json();
      setHm_id(data.id);
      getHmRatings(data.id);
      fetchIndividualHMServices(data.id);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  //============================= Get Handyman Ratings ================================

  const getHmRatings = async (id) => {
    const res = await fetch(
      `http://127.0.0.1:8001/handyman/${id}/averageratingandjobs`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const ratingData = await res.json();
    setHmRatings(ratingData);
  };

  //============================= Fetch all Services ================================

  const fetchIndividualHMServices = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8001/services/handyman/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await res.json();
      setIndividualHMServices(data);
      console.log(individualHMServices);
    } catch (e) {
      console.log(e);
    }
  };

  //================================================================================

  useEffect(() => {
    getHandymanID();
  }, []);

  console.log(individualHMServices);

  return (
    <div>
      <Navbar
        backButtonVisibility={backButtonVisibility}
        charSelect={charSelect}
      />
      {charSelect == "user" && (
        <HomePage
          handymanServicesData={handymanServicesData}
          setServicesCategory={setServicesCategory}
          setServicesCategorySelection={setServicesCategorySelection}
          setBackButtonVisibility={setBackButtonVisibility}
        />
      )}
      {charSelect == "handyman" && updateService == false && (
        <HomePageHandyman
          HMindividualServices={HMindividualServices}
          setUpdateService={setUpdateService}
          setUpdateServiceDetails={setUpdateServiceDetails}
          setBackButtonVisibility={setBackButtonVisibility}
          hm_id={hm_id}
          individualHMServices={individualHMServices}
          setIndividualHMServices={setIndividualHMServices}
          setHmRatings={setHmRatings}
          hmRatings={hmRatings}
        />
      )}
      {/* <ProfileHandyman
        averageRating={averageRating}
        totalReviews={totalReviews}
        totalJobs={totalJobs}
      /> */}
    </div>
  );
};

export default HomePageMain;
