export const Modal = (props) => {
  const {
    showModal,
    closeModal,
    handleEditClick,
    handleSaveClick,
    handleInputChange,
    isEditing,
    modalContent,
  } = props;

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {isEditing ? (
              <textarea
                value={modalContent}
                onChange={handleInputChange}
                rows={5}
                cols={30}
              />
            ) : (
              <p>{modalContent}</p>
            )}
            {isEditing ? (
              <button onClick={handleSaveClick}>保存</button>
            ) : (
              <button onClick={handleEditClick}>編集</button>
            )}
            <button onClick={closeModal}>閉じる</button>
          </div>
        </div>
      )}
    </>
  );
};
