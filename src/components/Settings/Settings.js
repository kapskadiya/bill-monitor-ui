function Settings() {
  const handleDelete = () => {};
  return (
    <div className="content-body">
      <div className="container">
        <div className="d-flex justify-content-between mb-3 mt-3">
          <p>Change the language</p>
          <select
            aria-label="Language Dropdown"
            name="lang"
            defaultValue="english"
            id="lang">
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <p>Delete your account</p>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete()}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
