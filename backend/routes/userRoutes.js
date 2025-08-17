const express = require('express');
const { getUsers, searchUsers, getUser, addUser, editUser, deleteUser, exportCSV } = require('../controllers/userController');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage });

const router = express.Router();
router.get('/', getUsers);
router.get('/search', searchUsers);
router.get('/export', exportCSV);
router.get('/:id', getUser);
router.post('/', upload.single('photo'), addUser); 
router.put('/:id', upload.single('photo'), editUser);
router.delete('/:id', deleteUser);

module.exports = router;