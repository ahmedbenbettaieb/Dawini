import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import { useAppSelector } from "../redux/store";
import moment from "moment";

export function BookAppointment({ Children }: any) {
  const params = useParams();
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const[selectedTimings,setSelectedTimings]=useState();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    timings: [],
  });
 
  const { user } = useAppSelector((state) => state.user);

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
        console.log(response.data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <h1 className="normal-text">
            Timings:{doctor.timings[0]} to {doctor.timings[1]}
          </h1>
        </div>
      )}
    </Layout>
  );
}
