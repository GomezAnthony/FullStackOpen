/* eslint-disable react/prop-types */
function Button({ label, onClick, id }) {
  return (
    <div>
      <button onClick={() => onClick(id)}>{label}</button>
    </div>
  );
}

export default Button;
