import React, {useEffect} from "react";
import UserLayout from "@/layouts/userLayout";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUser } from "@/config/redux/action/authAction/AuthAction";

export default function Discover() {
  const authState = useSelector((state) => {state.auth}); 
  const dispatch = useDispatch();

  useEffect(() => {
    if(!authState.allProfilesFetched){
      dispatch(fetchAllUser());
    };
  }, []);

  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Discover Page</h1>
      </DashboardLayout>
    </UserLayout>
  );
}