import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import { UserService } from '../services';
import { UserRow } from '../types/types';
import cors from 'cors';

export function createRouter(): express.Router {

  const userService = new UserService();

  const router = Router();
  router.use(express.json());

  router.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001' ],
    methods: ['GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));

  router.get('/health', (_, response) => {
    response.json({ status: 'ok' })
  })

  router.get('/users', async (_req, res) => {
    try {
      const users: UserRow[] = await userService.getUsers()
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
  });

  router.post('/users', async (req: Request, res: Response) => {
    try {
        await userService.createUser(req.body);
        res.status(201).json({ message: 'User upserted successfully' });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    }
  );

  router.get('/users/:id', async (req: Request, res: Response) => {
    res.json(await userService.getUserById(req.params.id as string));
  });


  router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
      await userService.deleteUser(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
