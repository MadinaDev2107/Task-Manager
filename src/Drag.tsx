import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { apicall } from "./utils/apiCall";

interface Order {
  id: number;
  title: string;
  time: string;
  status: "todo" | "inprogress" | "ready";
}

function OrderBoard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { register, handleSubmit, reset } = useForm<Omit<Order, "id">>();
  const [ids, setID] = useState<number>();
  const a = localStorage.getItem("id");
  useEffect(() => {
    if (a) {
      apicall(`/orders?userId=${a}`, "GET", "")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [a]);

  const addOrder = (data: Omit<Order, "id">) => {
    apicall("/orders", "POST", {
      ...data,
      userId: a,
    })
      .then((res) => {
        setOrders((prev) => [...prev, res.data]);
        reset();
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Add error:", err));
  };

  const updateOrderStatus = (id: number, status: Order["status"]) => {
    apicall(`/orders/${id}`, "PATCH", { status })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) => (order.id === id ? { ...order, status } : order))
        );
      })
      .catch((err) => console.error("Update error:", err));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const removeOrder = (id: number) => {
    console.log(id);

    apicall(`/orders/${id}`, "DELETE", "")
      .then(() => {
        setOrders((prev) => prev.filter((order) => order.id !== id));
      })
      .catch((err) => console.error("Remove error:", err));
  };

  const handleDragStart = (id: number) => {
    setID(id);
  };

  const handleDrop = (e: React.DragEvent, status: Order["status"]) => {
    e.preventDefault();
    updateOrderStatus(ids!, status);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary mt-2"
      >
        Add task
      </button>
      <h2 className="text-center mb-4">Task Manager</h2>
      <div className="row w-100">
        {["todo", "inprogress", "ready"].map((status) => (
          <div
            key={status}
            className="col-md-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status as Order["status"])}
          >
            <div style={{ height: "400px" }} className="card w-75 mx-auto">
              <div
                className={`card-header text-center text-white bg-${
                  status === "todo"
                    ? "warning"
                    : status === "inprogress"
                    ? "info"
                    : "success"
                }`}
              >
                {status.toUpperCase()}
              </div>
              <div
                style={{ height: "400px" }}
                className="overflow-auto card-body"
              >
                {orders
                  .filter((order) => order.status === status)
                  .map((order) => (
                    <div
                      key={order.id}
                      className="p-2 border rounded mb-2 d-flex justify-content-between"
                      draggable
                      onDragStart={() => handleDragStart(order.id)}
                    >
                      <p>Task: {order.title}</p>
                      <p>Time: {order.time}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeOrder(order.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Rodal height={400} visible={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(addOrder)} className="p-3">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              {...register("title")}
              placeholder="Add task..."
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              {...register("time")}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              {...register("status")}
              className="form-control"
              defaultValue="todo"
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="ready">Ready</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Save
          </button>
        </form>
      </Rodal>
    </div>
  );
}

export default OrderBoard;
