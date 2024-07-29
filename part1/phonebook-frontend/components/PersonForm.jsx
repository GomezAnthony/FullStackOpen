/* eslint-disable react/prop-types */
function PersonForm({
  onSubmit,
  nameVal,
  numberVal,
  onChangeName,
  onChangeNumber,
}) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameVal} onChange={onChangeName} />
        </div>
        <div>
          phone: <input value={numberVal} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
