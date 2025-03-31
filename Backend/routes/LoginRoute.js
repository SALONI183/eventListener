const express = require('express');
const cors = require('cors');
const {login} = require('../controllers/LoginController');

const router = express.Router();

router.use(cors());
router.post('/login', login);


module.exports = router;