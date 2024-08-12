const Notification = ({ messageRight }) => {
  if (messageRight === null) {
    return null;
  }

  return (
    <>
      <div className="right">{messageRight}</div>
    </>
  );
};
export default Notification;
