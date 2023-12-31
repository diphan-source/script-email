
const { Router } = require('express');
const { sendEmail } = require('../controller/email.controller');

const router = Router();

router.post('/email', sendEmail);

module.exports = router;
