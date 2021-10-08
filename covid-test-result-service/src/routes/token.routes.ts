import express from "express";
import TokenController from '../controllers/token.controller';
const router = express.Router();
const tokenController = new TokenController();

router.get( "/getToken", tokenController.getToken );

export default router;