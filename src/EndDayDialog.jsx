import React from 'react';

const EndDayDialog = ({ sendEmail, setIsDialogOpen }) => {
  return (
    <div className="dialog-wrapper">
      <div className="dialog">
        <h1>Da li ste sigurni da želite da završite dan?</h1>
        <div className="dialog__button-wrapper">
          <button
            onClick={() => {
              sendEmail();
              setIsDialogOpen(false);
            }}
            className="dialog__button"
          >
            Potvrdi
          </button>
          <button
            onClick={() => setIsDialogOpen(false)}
            className="dialog__button"
          >
            Otkaži
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndDayDialog;
