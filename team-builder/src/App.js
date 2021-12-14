import React, { useState, useEffect } from "react";
import './App.css';
import MemberForm from './Form'
import Member from './Member';
import axios from 'axios';

const initialFormValues = {
  
  username: '',
  email: '',
  
  role: '',
}

function App() {
const [members, setMembers] = useState([]);
const [formValues, setFormValues] = useState(initialFormValues);
const [error, setError] = useState('');

const updateForm = (Name, Value) => {
  setFormValues({ ...formValues, [Name]: Value });
}
const submitForm = () => {
  const newMember = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    role: formValues.role
  }
  
  if (!newMember.name || !newMember.email || !newMember.role) {
    setError("All fields are required");
  } else {
  axios.post('', newMember)
  .then(res => {
    const membersFromServer = res.data;
    setMembers([ membersFromServer, ...members]);
    setFormValues(initialFormValues);
  }).catch(err => console.error(err))
  .finally(() => setError(''))
}
}
useEffect(() => {
  axios.get('').then(res => setMembers(res.data))
}, [])


  return (
    <div className="App">
       <header className="App-header">
       Team Members!
       </header>
       <div>
       <MemberForm
               values={formValues}
               update={updateForm}
               submit={submitForm}
       />
       </div>
       {/* {
         members.map(member => {
           return (
             <Member key={member.id} details={member} />
           )
         })
       } */}
     </div>
  );
}

export default App;
