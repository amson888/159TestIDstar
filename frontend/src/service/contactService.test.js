import axios from "axios";
import contactService from "./contactService";

jest.mock('axios');

const contacts = [
  {
    "id": "93ad6070-c92b-11e8-b02f-cbfa15db428b",
    "firstName": "Bilbo",
    "lastName": "Baggins",
    "age": 111,
    "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
  },
  {
    "id": "b3abd640-c92b-11e8-b02f-cbfa15db428b",
    "firstName": "Luke",
    "lastName": "Skywalker",
    "age": 20,
    "photo": "N/A"
  },
  {
    "id": "b4acb640-c92b-11e8-c591-aabfa15db428b",
    "firstName": "Big Dude",
    "lastName": "Skywalker",
    "age": 22,
    "photo": "N/A"
  }
];

test('should fetch contacts', () => {
  const resp = {
    data: {
      data: contacts
    }
  };
  
  axios.get.mockResolvedValue(resp);
  
  return contactService.get().then(data => {
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://simple-contact-crud.herokuapp.com/contact');
    expect(data).toEqual(contacts);
  });
});

test('should fetch contact with given id', () => {
  const id = 'b4acb640-c92b-11e8-c591-aabfa15db428b';
  const contact = contacts.find(contact => contact.id === id);
  const resp = {
    data: {
      data: contact
    }
  };
  
  axios.get.mockResolvedValue(resp);
  
  return contactService.get(id).then(data => {
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`https://simple-contact-crud.herokuapp.com/contact/${id}`);
    expect(data).toEqual(contact);
  });
});

test('should post contact', () => {
  const newContactData = {
    'firstName': 'Small',
    'lastName': 'Dude',
    'photo': 'N/A',
    'age': 20
  };
  
  const resp = {
    data: {
      message: 'success'
    }
  };
  
  axios.post.mockResolvedValue(resp);
  
  return contactService.post(newContactData).then(data => {
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`https://simple-contact-crud.herokuapp.com/contact`, newContactData);
    expect(data).toEqual(resp.data);
  });
});

test('should put contact', () => {
  const editedData = {
    'id': '1',
    'firstName': 'Small',
    'lastName': 'Dude',
    'photo': 'N/A',
    'age': 20
  };
  
  const resp = {
    data: {
      message: 'Contact edited',
      data: editedData
    }
  };
  
  axios.put.mockResolvedValue(resp);
  
  return contactService.put(editedData).then(data => {
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(`https://simple-contact-crud.herokuapp.com/contact/${editedData.id}`, {
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      photo: editedData.photo,
      age: editedData.age
    });
    expect(data).toEqual(resp.data);
  });
});

test('should delete contact', () => {
  const id = '93ad6070-c92b-11e8-b02f-cbfa15db428b';
  
  const resp = {
    data: {}
  };
  
  axios.delete.mockResolvedValue(resp);
  
  return contactService.delete(id).then(data => {
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(`https://simple-contact-crud.herokuapp.com/contact/${id}`);
    expect(data).toEqual(resp.data);
  });
});