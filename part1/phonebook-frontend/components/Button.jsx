/* eslint-disable react/prop-types */
function Button({ label, onClick }) {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
}

export default Button;
