import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getContacts, putContact, postContact, deleteContact } from "./contactSlice";
import ContactItem from "./components/ContactItem";
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';
import ErrorBox from '../../components/ErrorBox';
import Modal from '../../components/Modal';
import style from "./Contact.module.css";

const Contact = () => {
  const dispatch = useDispatch();
  const contactState = useSelector(state => state.contact);
  
  const [selectedContact, setSelectedContact] = useState(undefined);
  const [detailModal, setDetailModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(undefined);
  
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  
  useEffect(() => {
    if (!contactState.loading.put)
      setDetailModal(false);
  }, [contactState.loading.put]);
  
  useEffect(() => {
    if (!contactState.loading.post)
      setPostModal(false);
  }, [contactState.loading.post]);
  
  useEffect(() => {
    if (!contactState.loading.delete)
      setDeleteModal(false);
  }, [contactState.loading.delete]);
  
  const onDetailClick = (id) => {
    if (!detailModal)
      setSelectedContact(contactState.currentList.find(contact => contact.id === id));
    
    setDetailModal(prevState => !prevState);
  };
  
  const contactItems = () => {
    return contactState.currentList.map(contact => <ContactItem key={contact.id} contact={contact}
                                                                onClick={onDetailClick}
                                                                onDeleteClick={onDeleteClick}/>);
  };
  
  // editing contact
  const onEditSubmit = (data) => {
    dispatch(putContact({contact: data}));
  };
  
  const onDetailCloseModalClick = () => {
    setDetailModal(false);
  };
  
  // posting contact
  const onPostSubmit = (data) => {
    dispatch(postContact({contact: data}));
  };
  
  const onPostOpenModalClick = () => {
    setPostModal(prevState => !prevState);
  };
  
  const onPostCloseModalClick = () => {
    setPostModal(false);
  };
  
  // deleting contact
  const onDeleteClick = (id) => {
    console.log(id);
    setToBeDeleted(id);
    setDeleteModal(prevState => !prevState);
  };
  
  const onCancelDeleteClick = () => {
    setToBeDeleted(undefined);
    setDeleteModal(false);
  };
  
  const onDoDeleteClick = () => {
    if (toBeDeleted)
      dispatch(deleteContact({id: toBeDeleted}));
  };
  
  return (
      <>
        <div className={style.contact}>
          <div className={style.inner}>
            <h1 className={style.title}>Contact List</h1>
            
            <br/>
            
            {contactState.loading.get && <p>Getting Contacts...</p>}
            
            {!contactState.loading.get && contactItems()}
            
            {!contactState.loading.get && !contactState.currentList.length &&
            <p>Currently there are no contacts available.</p>}
            
            <br/>
          </div>
          {!contactState.loading.get &&
          <button type='button' className={style['add-button']} onClick={onPostOpenModalClick}>+ Add New Contact
          </button>
          }
        </div>
        
        <Modal open={detailModal}>
          <>
            {selectedContact &&
            <ContactDetail contact={selectedContact} onCloseClick={onDetailCloseModalClick} onEditSubmit={onEditSubmit}
                           editLoading={contactState.loading.put}/>
            }
            
            {selectedContact == null && <p>Invalid contact chosen.</p>}
          </>
        </Modal>
        
        <Modal open={postModal}>
          <ContactForm onSubmit={onPostSubmit} loading={contactState.loading.post}/>
          <div style={{textAlign: 'center'}}>
            <button type='button' className={style['modal-btn']} onClick={onPostCloseModalClick}>Close</button>
          </div>
        </Modal>
        
        <Modal open={deleteModal}>
          <p className={style['delete-confirmation']}>Delete this contact?</p>
          <div style={{textAlign: 'center'}}>
            <button type='button' className={style['modal-btn']} onClick={onCancelDeleteClick}>No</button>
            <button type='button' className={`${style['modal-btn']} ${style['green']}`} onClick={onDoDeleteClick}>Yes
            </button>
          </div>
        </Modal>
        
        {contactState.lastErrorMessage &&
        <ErrorBox message={contactState.lastErrorMessage} style={{maxWidth: '500px', marginTop: '30px'}}/>
        }
      </>
  );
};

export default Contact;
