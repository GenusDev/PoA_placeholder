import React from 'react';

export const button1 = (identity1, openSelections) => (
  <div
    className={identity1}
    onClick={openSelections}>
    <img className="submit-icon-1" src="https://s3.amazonaws.com/genie-placeholder/submit-butt.png"/>
  </div>
);

export const button2 = (identity2, selectRole, handleSubmit) => (
  <div className={identity2}>
    <div className="role-options">
      <div className="r-o-div">
        <input
          className="r-o-1"
          name="role-option"
          type="radio"
          value="investor"
          onClick={selectRole}
          />
        <label htmlFor="r-o-1">investor?</label>
      </div>
      <div className="r-o-div">
        <input
          className="r-o-2"
          name="role-option"
          type="radio"
          value="developer"
          onClick={selectRole}
          />
        <label htmlFor="r-o-2">developer?</label>
      </div>
      <div className="r-o-div">
        <input
          className="r-o-3"
          name="role-option"
          type="radio"
          value="other"
          onClick={selectRole}
          />
        <label htmlFor="r-o-3">just curious?</label>
      </div>
    </div>
    <img
      className="submit-icon-2"
      src="https://s3.amazonaws.com/genie-placeholder/submit-butt.png"
      onClick={handleSubmit}/>
  </div>
);
