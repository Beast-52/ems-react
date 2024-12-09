import React from "react";
import { useForm } from "react-hook-form";
import { addTask } from "../../redux/slices/taskSlice";
import { useDispatch } from "react-redux";

const CreateTask = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

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

    dispatch(addTask({ userId: userId.userId, newTask: task }));
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
      title: "Assign To",
      type: "number",
      placeholder: "Employee User Id",
      nameInput: "userId",
    },
    {
      id: 4,
      title: "Category",
      type: "text",
      placeholder: "design, development, etc...",
      nameInput: "category",
    },
  ];

  return (
    <div className="bg-zinc-800 p-5 md:px-10 py-10 mx-10 rounded-xl">
      <form
        className="flex flex-col md:flex-row gap-10 items-stretch h-full"
        onSubmit={handleSubmit(submit)}
      >
        {/* Input Fields */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          {arr.map(({ title, type, placeholder, id, nameInput }) => (
            <div className="flex flex-col gap-2 text-white" key={id}>
              <label className="text-lg md:text-xl font-semibold">
                {title}
              </label>
              <input
                required
                {...register(nameInput)}
                type={type}
                placeholder={placeholder}
                className="bg-transparent px-4 py-3 text-base md:text-lg font-medium placeholder:text-zinc-400 w-full outline-none border-[3px] border-zinc-400 rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Description and Submit Button */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <div className="flex flex-col gap-2 text-white h-full">
            <label className="text-lg md:text-xl font-semibold">
              Description
            </label>
            <textarea
              {...register("taskDescription")}
              className="bg-transparent px-4 py-3 text-base md:text-lg font-medium placeholder:text-zinc-400 w-full h-32 md:h-48 outline-none border-[3px] border-zinc-400 rounded-xl resize-none"
            ></textarea>
          </div>
          <button className="liquid-fill-btn py-3 md:py-4 rounded-xl font-semibold text-base md:text-xl text-zinc-100 w-full relative group">
            <span>Submit</span>
            <span className="liquid-fill"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
