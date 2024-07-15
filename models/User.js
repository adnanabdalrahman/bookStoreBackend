import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcryptjs';


const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'firstname is required']
  },
  lastname: {
    type: String,
    required: [true, 'lastname is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'password is required']
  },
  roles: ["Admin", "User", "customer"]
});


// Pre-save hook to hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};





export default model('User', UserSchema);
