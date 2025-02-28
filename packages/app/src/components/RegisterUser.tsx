import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { VdeApiClient } from '../api';
import { useEffect, useState } from 'react';
import { VdeData } from '../api/types';


/**
 * 
 * @returns 
 */
export default function RegisterUser() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');


  // const apiService = new VdeApiClient('http://localhost:7007');
  
  // const handleSubmit = async () => {

  //   await apiService.pushUser({
  //       name,
  //       email
  //   });
  //   setName('');
  //   setEmail('');
  // };


    const [user, setUser] = useState<VdeData[]>([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:7007/api/users');
      const data = await response.json();
      setUser(data);
    };
  
    const handleCreateUser = async () => {
      await fetch('http://localhost:7007/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      setNewUser({ name: '', email: '' });
      fetchUsers();
    };
  
    const handleDeleteUser = async (id: number) => {
      await fetch(`http://localhost:7007/api/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    };

    
  return (
    <div style={{ fontFamily:'sans-serif', textAlign: 'center'}}>

      <Typography  variant="h5">REGISTER USER</Typography>
      <form>
        <TextField
          style={{ width: "200px", margin: "5px"}}
          type="text"
          label="name"
          variant="outlined"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="email"
          variant="outlined"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <br />
        <Button 
            variant="contained" 
            color="primary"
            type="submit"
            onClick={handleCreateUser}
            >
          Create User
        </Button>
      </form>
      <ul>
        {user.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button onClick={() => handleDeleteUser(user.id!)}>Delete</button>
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};


