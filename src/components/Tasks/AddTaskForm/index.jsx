import React, {useState} from 'react';
import axios from 'axios';

import addSvg from "../../../assets/img/add.svg";

const AddTaskForm = ({list, onAddTask}) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      "listId": list.id,
      "text": inputValue,
      "completed": false
    };
    setIsSending(true);
    axios.post('http://localhost:3001/tasks', obj)
        .then(({data}) => {
          onAddTask(list.id, data);
          toggleFormVisible();
        })
        .catch(() => {
          alert('Ошибка при добавлении задачи');
        })
        .finally(() => {
          setIsSending(false);
        });
  };

  return (
      <div className="tasks__form">
        {!visibleForm ? (
            <div onClick={toggleFormVisible} className="tasks__form-new">
              <img src={addSvg} alt="Add Icon"/>
              <span>Новая задача</span>
            </div>
        ) : (
            <div className="tasks__form-block">
              <input
                  className="field"
                  type="text"
                  placeholder="Текст задачи"
                  onChange={e => setInputValue(e.target.value)}
              />
              <button disabled={isSending} onClick={addTask} className="button">{isSending ? 'Добавление' : 'Добавить задачу'}</button>
              <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
            </div>
        )}

      </div>
  );
};

export default AddTaskForm;