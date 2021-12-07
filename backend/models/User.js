const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    google: {
      type: Boolean,
      default: false
    }
  }
)

UserSchema.methods.toJSON = function() {
  const { password, __v, ...user} = this.toObject();
  return user;
}

module.exports = model("User", UserSchema);