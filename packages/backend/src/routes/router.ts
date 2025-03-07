import express from 'express';
import Router from 'express-promise-router';
import { UserService } from '../services';
import { UserRow } from '../types/types';
import { corsMiddleware } from '../utils/cors';
import * as winston from 'winston';

export type RouterOptions = {
  logger: winston.Logger;
  // httpAuth?: HttpAuthService;
  // auth?: AuthService;
};

export function createRouter( options: RouterOptions): express.Router {
  const {  logger } = options;
  const userService = new UserService();

  const router = Router();
  router.use(express.json());
  router.use(corsMiddleware());

  router.get('/health', (_, response) => {
    console.log("user::");
    response.json({ status: 'ok' })
  })  

  router.get('/users', async (_req, res) => {
    try {
      const users: UserRow[] = await userService.getAllUsers()
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
  });

  router.post('/users', async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.status(201).json({ message: 'User upserted successfully' });
        logger.info(`User upserted successfully :: ${req.body.first_name} ${req.body.name}`);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    }
  );

  router.get('/users/:userId', async (req, res) => {
    res.json(await userService.getUserById(req.params.userId as string));
  });


  router.delete('/users/:userId', async (req, res) => {
    try {
      await userService.deleteUser(req.params.userId);
      res.status(204).send({ message: 'User delete successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      logger.info(`Unable to get metadata for '${req.params.userId}' with error ${err.messag}`);
    }
  });

  return router;
}