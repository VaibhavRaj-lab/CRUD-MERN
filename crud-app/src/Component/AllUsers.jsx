import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { getUsers, deleteUser , sendUser} from '../Service/api';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_O5U2b5Vs56pPZoBSO9dOz");
const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }
    const sendData = async(id,user)=>{
       if(user){
           alert("email send")
       }
        emailjs.send('service_d2y0ih5','template_q75xq0n', user, 'user_O5U2b5Vs56pPZoBSO9dOz')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    }
    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Hobbie</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow className={classes.row} key={user.id}>
                        <TableCell>{user._id}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.hobbie}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${user._id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                            <Button color="secondary" variant="contained" onClick={() => deleteUserData(user._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                            <Button  variant="contained" onClick={() => sendData(user._id, user)}>Send</Button> {/* change it to user.id to use JSON Server */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default AllUsers;