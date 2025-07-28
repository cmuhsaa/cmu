import { getTeacherById } from "@/lib/getData";
import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;

  const teacher = await getTeacherById(id);

  return (
    <div>
      <h1>{teacher.name}</h1>
      {teacher.avatar && (
        <img
          src={`${teacher.avatar.url}`}
          alt="Teacher Avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "contain",
          }}
        />
      )}
      <p>
        <strong>Email:</strong> {teacher.email}
      </p>
      <p>
        <strong>Phone:</strong> {teacher.phone}
      </p>
      <p>
        <strong>Title:</strong> {teacher.title}
      </p>
      <p>
        <strong>About:</strong> {teacher.about}
      </p>
      <p>
        <strong>Address:</strong> {teacher.address}
      </p>
      <p>
        <strong>Created:</strong> {teacher.createDate?.date} at{" "}
        {teacher.createDate?.formatedTime}
      </p>
      <p>
        <strong>Updated:</strong> {teacher.updateDate?.date} at{" "}
        {teacher.updateDate?.formatedTime}
      </p>
      <hr style={{ margin: "25px 0" }} />
    </div>
  );
};
export default Page;
