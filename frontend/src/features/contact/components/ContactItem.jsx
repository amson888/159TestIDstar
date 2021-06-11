import React from 'react';
import PropTypes from 'prop-types';
import Index from "../../../components/Image";
import style from "../Contact.module.css";

const imageSize = '60px';
const actionSize = '30px';

const ContactItem = ({contact, onClick = undefined, onDeleteClick = undefined}) => {
  const {id, firstName, lastName, age, photo} = contact;
  
  const _onContactItemClick = () => {
    if (onClick)
      onClick(id);
  };
  
  const _onDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteClick(id);
  }
  
  return (
      <div className={style['contact-item']} onClick={_onContactItemClick}>
        <Index src={photo} alt={`${firstName} ${lastName}`} width={imageSize} height={imageSize} circular={true}/>
        <div className={style['info']} style={{width: `calc(100% - ${imageSize} - ${actionSize})`}}>
          <p className={style.name}>{`${firstName} ${lastName}`}</p>
          <p className={style.age}>{age} years old</p>
        </div>
        <div className={style.action} style={{width: actionSize}}>
          <button className={style.delete} type='button' onClick={_onDeleteClick}>&times;</button>
        </div>
      </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    photo: PropTypes.string
  }),
  onClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default ContactItem;
