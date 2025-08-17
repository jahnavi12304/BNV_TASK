const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  photoUrl: { type: String },
  mobile: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  location: { type: String, required: true },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  let doc = this;
  if (doc.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'userId' },          
        { $inc: { seq: 1 } },       
        { new: true, upsert: true } 
      );
      doc.userId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);
module.exports = User;
module.exports.Counter = Counter; 