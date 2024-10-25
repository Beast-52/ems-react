import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addTask } from "../../redux/slices/taskSlice";
import { useDispatch } from "react-redux";

const CreateTask = () => {
  const { register, handleSubmit, setError,reset } = useForm();
  const dispatch = useDispatch();
  // Assuming userId is already part of the form data
  const submit = (data) => {
    const userId = { userId: Number(data.userId) };
    delete data.userId;
    const task = {
      ...data,
      active: true,
      completed: false,
      failed: false,
      newTask: true,
    };

    // Dispatch the addTask action with the new task object and userId
    dispatch(addTask({ userId : userId.userId, newTask: task }));

    // Optionally reset the form after submission
    reset();
  };
  const arr = [
    {
      id: 1,
      title: "Task Title",
      type: "text",
      placeholder: "Make a UI Design",
      nameInput: "taskTitle",
    },
    {
      id: 2,
      title: "Date",
      type: "date",
      placeholder: "dd/mm/yyyy",
      nameInput: "taskDate",
    },
    {
      id: 3,
      title: "Asign To",
      type: "number",
      placeholder: "Employee User Id",
      nameInput: "userId",
    },
    {
      id: 4,
      title: "Category",
      type: "text",
      placeholder: "design,development,etc...",
      nameInput: "category",
    },
  ];
  return (
    <div className="bg-zinc-800 px-5 py-10 mx-10 rounded-xl h-[50vh] ">
      <form
        className="flex justify-between gap-x-10 items-center   h-full"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex gap-5 flex-col w-1/2">
          {arr.map(({ title, type, placeholder, id, nameInput }) => (
            <div className="flex gap-2 flex-col text-white w-full" key={id}>
              <h1 className="text-xl font-semibold">{title}</h1>
              <input
                required
                {...register(nameInput)}
                type={type}
                placeholder={placeholder}
                className="bg-transparent px-5 py-3 text-xl font-medium placeholder:text-zinc-400 w-full outline-none border-zinc-400 border-[3px] rounded-xl"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-5 flex-col w-2/3 h-full items-end">
          <div className="flex gap-2 flex-col text-white h-full w-3/4">
            <h1 className="text-xl font-semibold">Description</h1>
            <textarea
              {...register("taskDescription")}
              className="bg-transparent h-full px-5 py-3 text-xl font-medium placeholder:text-zinc-400 w-full outline-none border-zinc-400 border-[3px] rounded-xl"
            ></textarea>
          </div>
          <button className="bg-emerald-500  py-4 rounded-xl w-3/4 font-semibold text-2xl text-zinc-100 hover:bg-emerald-400">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
