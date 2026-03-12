import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  first_name: String,
  country_name: String,

  email: {
    type: String,
    unique: true,
    required: true
  },

  mobile: {
    type: String,
    unique: true
  },

  state_name: {
    type: String,
    default: 'unknown'
  },

  city_name: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  image: {
    data: Buffer,
    contentType: String
  },

  password: {
    type: String,
    required: true
  },

  active: {
    type: Number,
    default: 1
  },

  payment_status: {
    type: String,
    default: "Pending"
  }

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

export default mongoose.models.User || mongoose.model("User", userSchema)