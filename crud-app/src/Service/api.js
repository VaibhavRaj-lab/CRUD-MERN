import axios from "axios";

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = "https://crudservices.herokuapp.com/users";

export const getUsers = async (id) => {
  id = id || "";
  return await axios.get(`${usersUrl}/${id}`);
};

export const addUser = async (user) => {
  return await axios
    .post(`${usersUrl}/add`, user)
    .then((res) => [console.log(res)])
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = async (id) => {
  return await axios.delete(`${usersUrl}/${id}`);
};

export const editUser = async (id, user) => {
  console.log(user);
  return await axios.put(`${usersUrl}/${id}`, user);
};
export const sendUser = async (id, user) => {
  return await axios.put(`${usersUrl}/${id}`, user).then((res) => {
    console.log(user);
    console.log(res);
  });
};
