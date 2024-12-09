import React from "react";

const EndDayDialog = ({ sendEmail, setIsDialogOpen }) => {
  const handleConfirm = () => {
    sendEmail();
    setIsDialogOpen(false);
  };

  const handleCancel = () => setIsDialogOpen(false);

  return (
    <div className="dialog-wrapper">
      <div className="dialog">
        <h1>Da li ste sigurni da želite da završite dan?</h1>
        <div className="dialog__button-wrapper">
          <button onClick={handleConfirm} className="dialog__button">
            Potvrdi
          </button>
          <button onClick={handleCancel} className="dialog__button">
            Otkaži
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndDayDialog;
