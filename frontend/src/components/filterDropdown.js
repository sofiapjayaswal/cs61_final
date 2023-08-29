import React, {useState} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faAngleDown, faAngleUp, faCheck); // add font awesome icons to library

function Dropdown({ddList, title, resetThenSet}) { // referenced code at https://blog.logrocket.com/customize-reusable-react-dropdown-menu-component/
  const [isDdOpen, setisDdOpen] = useState(false)
  const [headerTitle, setheaderTitle] = useState(title);
  
  const selectItem = (item) => {
    const { title, id, key } = item;
    setisDdOpen(false)
    setheaderTitle(title)
    resetThenSet(id, key)
  }
  
  return (
    <div className="dd-wrapper">
      <button
        type="button"
        className="dd-header"
        onClick={() => setisDdOpen(prevState => !prevState)}
      >
        <div className="dd-header-title">{headerTitle}</div>
        {isDdOpen
          ? <FontAwesomeIcon icon="angle-up" size="2x" />
          : <FontAwesomeIcon icon="angle-down" size="2x" />}
      </button>
      {isDdOpen && (
        <div
          role="list"
          className="dd-list"
        >
          {ddList.map((item) => (
            <button
              type="button"
              className="dd-list-item"
              key={item.id}
              onClick={() => selectItem(item)}
            >
              {item.title}
              {' '}
              {item.selected && <FontAwesomeIcon icon="check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
