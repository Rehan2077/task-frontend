import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, SERVER_URL } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const toggleHandler = async (id) => {
    try {
      const { data } = await axios.patch(`${SERVER_URL}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${SERVER_URL}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${SERVER_URL}/task/new`,
        {
          title,
          description,
          dueDate,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      setDueDate("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/task/mytasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        // toast.error(e.response.data.message);
      });
  }, [refresh]);

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, []);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="date"
              placeholder="Due Date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.completed}
            toggleHandler={toggleHandler}
            deleteHandler={deleteHandler}
            setRefresh={setRefresh}
            dueDate={formatDate(i.dueDate)}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

function formatDate(dateString) {
  const date = new Date(dateString);
  
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return 'st';
      case 2:  return 'nd';
      case 3:  return 'rd';
      default: return 'th';
    }
  }

  const ordinalSuffix = getOrdinalSuffix(day);
  const formattedDate = `${day}${ordinalSuffix} ${month} ${year}`;

  return formattedDate;
}

export default Home;
