import React from 'react';

export const button1 = (identity1, openSelections) => (
  <div className={identity1} onClick={openSelections}>
    <img className="submit-icon-1"
      src="https://s3.amazonaws.com/genie-placeholder/submit-butt.png" />
  </div>
);

export const button2 = (identity2, selectRole, handleSubmit) => (
  <div className={identity2}>
    <div className="role-options">
      <label>
        <input className="role-option"
          name="role-option"
          type="radio"
          value="investor"
          onClick={selectRole} />
        investor?
      </label>
      <label>
        <input className="role-option"
          name="role-option"
          type="radio"
          value="developer"
          onClick={selectRole} />
        developer?
      </label>
      <label>
        <input className="role-option"
          name="role-option"
          type="radio"
          value="other"
          onClick={selectRole} />
        just curious?
      </label>
    </div>
    <img className="submit-icon-2"
      src="https://s3.amazonaws.com/genie-placeholder/submit-butt.png"
      onClick={handleSubmit} />
  </div>
);
