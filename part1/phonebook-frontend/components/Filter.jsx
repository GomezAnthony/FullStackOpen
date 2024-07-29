/* eslint-disable react/prop-types */
function Filter({ value, onChange }) {
  return (
    <div>
      <p>
        filter shown with <input value={value} onChange={onChange} />
      </p>
    </div>
  );
}

export default Filter;
