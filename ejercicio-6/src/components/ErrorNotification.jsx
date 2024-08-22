const ErrorNotification = ({ messageError }) => {
  if (messageError === null) {
    return null;
  }
  return (
    <>
      <div className="error">{messageError}</div>
    </>
  );
};
export default ErrorNotification;
