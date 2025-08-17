const User = require('../models/User');
const { Counter } = require('../models/User');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = { page: parseInt(page), limit: parseInt(limit), sort: { userId: 1 } };
    const result = await User.paginate({}, options);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    let { q, page = 1, limit = 10 } = req.query;
    let query = {};
    if (q) {
      q = q.trim();
      const parts = q.split(/\s+/).filter(part => part.length > 0);
      if (parts.length > 0) {
        query.$and = parts.map(part => ({
          $or: [
            { firstName: { $regex: part, $options: 'i' } },
            { lastName: { $regex: part, $options: 'i' } }
          ]
        }));
      }
    }
    const options = { page: parseInt(page), limit: parseInt(limit), sort: { userId: 1 } };
    const result = await User.paginate(query, options);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const userData = req.body;
    if (req.file) userData.photoUrl = req.file.path;
    const user = new User(userData);
    await user.save();
    console.log('Saved user with userId:', user.userId);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const userData = req.body;
    if (req.file) userData.photoUrl = req.file.path;
    const user = await User.findByIdAndUpdate(req.params.id, userData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log('Updated user with userId:', user.userId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    const deletedUserId = user.userId;

    
    await User.updateMany(
      { userId: { $gt: deletedUserId } },
      { $inc: { userId: -1 } }
    );

    
    const maxUser = await User.findOne().sort({ userId: -1 }).select('userId');
    const newSeq = maxUser ? maxUser.userId : 0;
    await Counter.findByIdAndUpdate(
      { _id: 'userId' },
      { seq: newSeq },
      { upsert: true }
    );
    console.log(`Counter updated to seq: ${newSeq} after deleting userId: ${deletedUserId}`);

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const exportCSV = async (req, res) => {
  try {
    const users = await User.find({}).sort({ userId: 1 });
    const fields = ['userId', 'firstName', 'lastName', 'email', 'gender', 'photoUrl', 'mobile', 'status', 'location'];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers, searchUsers, getUser, addUser, editUser, deleteUser, exportCSV };