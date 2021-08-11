import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { addUser } from '../Service/api';
import userSchema from './Validations/userValidation';
import { useHistory } from 'react-router-dom';
// import e from 'express';

const initialValue = {
    name: '',
    phone: '',
    email: '',
    hobbie: ''
    

}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    
    const [isError, setIsError] = useState(false)
    const { name, phone, email, hobbie} = user;
    const classes = useStyles();
    let history = useHistory();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
        console.log(user)
    }
   
    
    const addUserDetails = async() => {
         
            
            const valid = await userSchema.isValid(user)
            
            if(valid){
                setIsError(true)
            await addUser(user);
            history.push('./');
            }
            else{
            setIsError(true)
            alert("please enter valid field")
            }
        
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
               

            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            
                       </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Hobbies</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='hobbie' value={hobbie} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddUser;