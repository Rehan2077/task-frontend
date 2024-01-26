import { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../main";

const TodoItem = ({
  title,
  description,
  dueDate,
  isCompleted,
  toggleHandler,
  deleteHandler,
  setRefresh,
  id,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    handleClose();
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/task/${id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setUpdatedTitle("");
      setUpdatedDescription("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <>
      <div className={`todo ${isCompleted && "completed"}`}>
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
          <p className="dueDate">Due: {dueDate}</p>
        </div>
        <div>
          <input
            onChange={() => toggleHandler(id)}
            type="checkbox"
            checked={isCompleted}
          />
          <div className="todoBtn">
            <button onClick={handleOpen} className="deleteBtn">
              ✏️
            </button>
            <button onClick={() => deleteHandler(id)} className="deleteBtn">
              ❌
            </button>
          </div>
        </div>
        <Modal
          isOpen={open}
          onClose={handleClose}
          title={updatedTitle}
          description={updatedDescription}
          setUpdatedTitle={setUpdatedTitle}
          setUpdatedDescription={setUpdatedDescription}
          updateHandler={updateHandler}
        ></Modal>
      </div>
    </>
  );
};

export default TodoItem;
