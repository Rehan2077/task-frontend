const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  setUpdatedTitle,
  setUpdatedDescription,
  updateHandler,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "white",
          margin: "auto",
          padding: "1%",
          border: "1px solid rgb(51,51,51)",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
      >
        <div className="login">
          <section>
            <form onSubmit={updateHandler}>
              <input
              style={{fontSize:"1.2rem", padding:"1.4rem 0.7rem"}}
                type="text"
                placeholder="Updated title"
                required
                value={title}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input
              style={{fontSize:"1.2rem", padding:"1.4rem 0.7rem"}}
                type="text"
                placeholder="Updated description"
                required
                value={description}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />

              <button type="submit">Update Task</button>
            </form>
          </section>
        </div>
        <button
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
          onClick={onClose}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default Modal;
