import React, {useState} from 'react';
import List from "../List";
import Badge from "../Badge"

import closeSvg from '../../assets/img/close.svg'

import './AddListButton.scss';

const AddListButton = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }

    const color = colors.filter(c => c.id === selectedColor)[0].name;
    onAdd({
      "id": Math.random(),
      "name": inputValue,
      color
    });
    onClose();
  };

  return (
      <div className="add-list">
        <List
            onClick={() => setVisiblePopup(!visiblePopup)}
            items={[
              {
                className: "list__add-button",
                icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1V11" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 6H11" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                name: 'Добавить список'
              }
            ]}
        />
        {visiblePopup && <div className="add-list__popup">
          <img onClick={onClose} className="add-list__popup-close-btn" src={closeSvg}
               alt="Close button"/>
          <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="field"
              type="text"
              placeholder="Название списка"/>
          <div className="add-list__popup-colors">
            {colors.map(color => (
                <Badge
                    onClick={() => selectColor(color.id)}
                    key={color.id}
                    color={color.name}
                    className={selectedColor === color.id && 'active'}
                />
            ))}
          </div>
          <button onClick={addList} className="button">Добавить</button>
        </div>}
      </div>
  );
};

export default AddListButton;