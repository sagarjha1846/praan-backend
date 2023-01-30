import { model, Schema } from "mongoose";
interface UserDetails {
  name: String | any
  email: String | any
  password: String | any
}

var validateEmail = function (email: String | any) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return re.test(email)
};

const userDetails = new Schema<UserDetails>({
  name: {
    type: String,
    required: [true, "Please provide an Name!"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,

  },
})

export const userData = model<UserDetails>("userData", userDetails)

