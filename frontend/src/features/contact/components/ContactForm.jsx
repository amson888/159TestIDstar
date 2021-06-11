import React, { useEffect } from 'react';

import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import style from "../Contact.module.css";

const ContactForm = ({current, loading = false, onSubmit}) => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const label = current ? 'Confirm Edit' : 'Confirm Add';
  
  useEffect(() => {
    reset(current);
  
  }, [current, reset])
  
  const onFormSubmit = (data) => {
    onSubmit(data);
  };
  
  return (
      <form className={style.form} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={style['form-group']}>
          <label>Photo URL</label>
          <input type="text"
                 defaultValue={current ? current.photo : 'N/A'} {...register('photo', {required: true})} />
          {errors.photo?.type === 'required' && "Please provide the photo url!"}
        </div>
        
        <div className={style['form-group']}>
          <label>First Name</label>
          <input type="text"
                 defaultValue={current ? current.firstName : ''} {...register('firstName', {required: true})} />
          {errors.firstName?.type === 'required' && "Please provide the first name!"}
        </div>
        
        <div className={style['form-group']}>
          <label>Last Name</label>
          <input type="text"
                 defaultValue={current ? current.lastName : ''} {...register('lastName', {required: true})} />
          {errors.lastName?.type === 'required' && "Please provide the last name!"}
        </div>
        
        <div className={style['form-group']}>
          <label>Age (in years)</label>
          <input type="text" defaultValue={current ? current.age : ''} {...register('age', {required: true})} />
          {errors.age?.type === 'required' && "Please provide the age!"}
        </div>
        
        <div style={{textAlign: 'center'}}>
          <button type='submit' className={style.submit} disabled={loading}>{label}</button>
        </div>
      </form>
  );
};

ContactForm.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    photo: PropTypes.string
  }),
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
