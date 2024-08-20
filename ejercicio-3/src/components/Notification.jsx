const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <>
      <div className="right">{message}</div>
    </>
  );
};
export default Notification;
