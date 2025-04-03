import express from 'express';

const usersRouter = express.Router();


usersRouter.use('/', (req, res) => {
  return res.status(200).json({
    message: 'Users route'
  });
});




export default usersRouter;
