import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { creatLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //after hit the submit button
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      //call createLogEntry to send the created data to the api
      await creatLogEntry(data);

      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      //if there is an error, we are not closing the form
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input {...register("title")} required />
      <label htmlFor="comments">Comments</label>
      <textarea {...register("comments")} rows={3}></textarea>
      <label htmlFor="description">Description</label>
      <textarea {...register("description")} rows={3}></textarea>
      <label htmlFor="image">Image</label>
      <input {...register("image")} />
      <label htmlFor="visitDate">Visit Date</label>
      <input {...register("visitDate")} type="date" required />
      <button disabled={loading}>
        {loading ? "Loading..." : "Create Entry"}
      </button>
    </form>
  );
};

export default LogEntryForm;
