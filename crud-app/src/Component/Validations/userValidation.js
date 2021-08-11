import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string().max(10).required(),
});

export default userSchema;
