import React from "react";
import { useNavigate } from "react-router-dom";

export function Doctor({ doctor }: any) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor pointer"
      onClick={() => navigate(`/book-appointments/${doctor.userId}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number :</b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address :</b>
        {doctor.address}
      </p>
      <p>
        <b>Consultation Fee :</b>
        {doctor.feePerConsultation} DT
      </p>
      <p>
        <b>Timings :</b>
        {doctor.timings[0]}-{doctor.timings[1]}
      </p>
    </div>
  );
}
