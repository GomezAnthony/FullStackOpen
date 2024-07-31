/* eslint-disable react/prop-types */
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  let className = '';
  if (type === 'success') {
    className = 'success';
  } else if (type === 'error') {
    className = 'error';
  }

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
