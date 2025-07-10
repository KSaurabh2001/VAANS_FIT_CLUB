import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import ClassSessionPage from "../Component/GymHandler/ClassSession";

import Auth from "./login";
import AddGymForm from "../Component/GymOwner/AddGymForm";
import AllGyms from "../Component/GymOwner/AllGyms";
import AddMembershipForm from "../Component/GymOwner/AddMembershipForm";
import AllMemberships from "../Component/GymOwner/AllMembership";
import AddGymHandlerForm from "../Component/GymOwner/AddGymHandler";
import AllGymHandlers from "../Component/GymOwner/AllGymHandler";
import AddUserOrTrainerForm from "../Component/GymOwner/AddUserOrTrainer";
import AssignHandlerToGym from "../Component/GymOwner/AssignGym";
import EditProfileOwnerForm from "../Component/GymOwner/EditOwnerProfile";
import AssignTrainerToUser from "../Component/GymHandler/AssignTrainerToUser";
import AssignTrainerToClassSession from "../Component/GymHandler/AssignTrainerToSession";
import EditHandlerProfile from "../Component/GymHandler/EditHandlerProfile";
import AddClassSessionForm from "../Component/GymHandler/AddClassSesion";

import AllGymTrainers from "../Component/GymHandler/AllTrainer";
import AllGymUsers from "../Component/GymHandler/AllUser";
import AllGymSessions from "../Component/GymHandler/AllGymSessions";
import EditClassSession from "../Component/GymHandler/EditClassSession";
import GymPage from "../Component/GymHandler/GymPage";
import AddWorkoutForm from "../Component/GymTrainer/AddWorkout";
import AddDietForm from "../Component/GymTrainer/AddDiet";
import WorkoutList from "../Component/GymTrainer/AllWorkouts";
import DietList from "../Component/GymTrainer/AllDiet";
import AssignDietToUser from "../Component/GymTrainer/HandleUserDiet";
import AssignWorkoutToUser from "../Component/GymTrainer/HandleUserWorkout";
import EditTrainerProfile from "../Component/GymTrainer/EditTrainerProfile";
import TrainerProfile from "../Component/GymTrainer/TrainerProfile";
import UserProfileforOther from "../Component/GymTrainer/GymUserProfile.jsx";
import EditGymUserProfile from "../Component/GymUser/EditGymUSer";
import ClassBookingPage from "../Component/GymUser/EnrollSession.jsx";
import VerifyPayment from "../Component/GymHandler/VerifyPayment.jsx";
import EditGymForm from "../Component/GymOwner/EditGymForm.jsx";
import MembershipPage from "../Component/GymOwner/MembershipPage.jsx";

const Routers = () => {
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="addGym" element={<AddGymForm />} />
          <Route path="allGyms" element={<AllGyms />} />
          <Route path="allMembership" element={<AllMemberships />} />
          <Route path="addMembership" element={<AddMembershipForm />} />
          <Route path="addGymHandler" element={<AddGymHandlerForm />} />
          <Route path="allGymHandler" element={<AllGymHandlers />} />
          <Route path="addUserOrTrainer" element={<AddUserOrTrainerForm />} />
          <Route path="assignGym" element={<AssignHandlerToGym />} />
          <Route path="editOwnerProfile" element={<EditProfileOwnerForm />} />
          <Route path="editgym/:id" element={<EditGymForm />} />
          <Route
            path="assignTrainerToUser"
            element={<AssignTrainerToUser />}
          />
          <Route
            path="assignTrainerToSession"
            element={<AssignTrainerToClassSession />}
          />
          <Route path="editHandlerProfile" element={<EditHandlerProfile />} />
          <Route path="addClassSession" element={<AddClassSessionForm />} />
          <Route path="allGymUser" element={<AllGymUsers />} />
          <Route path="allGymTrainer" element={<AllGymTrainers />} />
          <Route path="allGymSessions" element={<AllGymSessions />} />
          <Route path="gym/:id" element={<GymPage />} />
          <Route path="class-session/:id" element={<ClassSessionPage />} />
            <Route path="editclasssession/:id" element={<EditClassSession />} />
             <Route path="verifyPayment" element={<VerifyPayment />} />
          <Route path="addWorkout" element={<AddWorkoutForm />} />
          <Route path="addDiet" element={<AddDietForm />} />
          <Route path="allWorkout" element={<WorkoutList />} />
          <Route path="allDiet" element={<DietList />} />
          <Route path="assignDietToUser" element={<AssignDietToUser />} />
          <Route path="assignWorkoutToUser" element={<AssignWorkoutToUser />} />
          <Route path="editTrainerProfile" element={<EditTrainerProfile />} />
          <Route path="trainerProfile/:id" element={<TrainerProfile/>} />
          <Route path="userProfileForOthers/:id" element={<UserProfileforOther/>} />
          <Route path="editUserProfile" element={<EditGymUserProfile />} />
           <Route path="bookSession" element={<ClassBookingPage />} />
           <Route path="membershipPage/:id" element={<MembershipPage />} />
        </Route>

        <Route path="/" element={<Auth />}></Route>
      </Routes>
    </div>
  );
};

export default Routers;
