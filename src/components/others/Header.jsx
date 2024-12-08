import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { getLocalAuthData } from "../../utils/localStorage";
import { clearTasks } from "../../redux/slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const userData = useSelector((state) => state.auth.user);
  const taskData = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    dispatch(logoutUser());
    navigate("/");
    // Clear user data and local storage
  };
  
  useEffect(()=>{
    console.log(userData)
  },[])
  return (
    <div className="flex justify-between items-center px-10 py-12 text-white ">
      <div>
        <h1 className="text-[1.4vmax] font-medium">
          Hi! <br />
          <span className="text-[1.8vmax] font-semibold">
            {userData.name} 👋
          </span>
        </h1>
      </div>
      <div>
        <button
          onClick={Logout}
          className="px-5 py-2 text-xl font-semibold bg-red-500 hover:bg-red-600 transition-all duration-150 rounded-md"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
