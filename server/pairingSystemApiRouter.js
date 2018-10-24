const router = require('express').Router();
const controller = require('./pairigSystemApiController');

  router.route('/student')
  .post(controller.createStudent)
  .get(controller.retrieveAllStudents)
  .delete(controller.deleteStudent)
  .put(controller.updateStudent)
  

  router.route('/pairing')
  .get(controller.createTable)
  .post(controller.saveTable)
  
  router.route('/history')
  .get(controller.retrieveAllTables)
  
module.exports = router;
