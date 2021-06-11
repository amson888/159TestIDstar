import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Index from '../../../components/Image';
import ContactForm from './ContactForm';
import style from '../Contact.module.css';

const ContactDetail = ({contact, onCloseClick, onEditSubmit, editLoading = false}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const {firstName, lastName, age, photo} = contact;
  
  useEffect(() => {
    if (!editLoading)
      setShowEditForm(false);
  }, [editLoading]);
  
  const _onCloseClick = () => {
    setShowEditForm(false);
    onCloseClick();
  };
  
  const _onEditSubmit = (data) => {
    onEditSubmit(data);
  };
  
  const onEditClick = () => {
    setShowEditForm(prevState => !prevState);
  };
  
  return (
      <div className={style.detail}>
        <div style={{display: 'inline-block'}}>
          <Index src={photo} width={'100px'} height={'100px'} circular={true}/>
        </div>
        <p className={style.name}>{`${firstName} ${lastName}`.trim()}</p>
        <p className={style.age}>{`${age} years old`}</p>
        
        <div className={`${style['edit-form-wrapper']} ${showEditForm ? style.open : ''}`.trim()}>
          <ContactForm current={contact} onSubmit={_onEditSubmit} loading={editLoading}/>
        </div>
        
        <button type='button' className={style['modal-btn']} onClick={onEditClick}><img src="./edit.png" alt="Edit"
                                                                                 style={{width: '15px'}}/></button>
        <br/>
        
        <button type='button' className={style['modal-btn']} onClick={_onCloseClick}>Close</button>
      </div>
  );
};

ContactDetail.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    photo: PropTypes.string
  }).isRequired,
  editLoading: PropTypes.bool,
  onCloseClick: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired
};

export default ContactDetail;
