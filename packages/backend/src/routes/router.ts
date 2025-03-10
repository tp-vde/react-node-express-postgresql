import express from "express";
import Router from "express-promise-router";
import { UserService } from "../services";
import { UserRow } from "../types/types";
import { corsMiddleware } from "../utils/cors";
import * as winston from "winston";
import bodyParser from "body-parser";
import authMiddleware from "./authMiddleware";
import { SignJWT } from "jose";
import { config } from "../config";

export type RouterOptions = {
  logger: winston.Logger;
  // httpAuth?: HttpAuthService;
  // auth?: AuthService;
};

export function createRouter(options: RouterOptions): express.Router {
  const { logger } = options;
  const userService = new UserService();

  const router = Router();
  router.use(express.json());
  router.use(corsMiddleware());
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.get("/health", (_, response) => {
    response.json({ status: "ok" });
  });

  /**
   * Fonction pour générer un token JWT
   * @param user
   * @param alg : Algorithme de signature
   * @param jwtSecret : Signature
   * @param jwtExpiresIn : Durée de validité
   * @returns
   */
  const generateToken = async (user: {
    id: number;
    email: string;
    password: string;
  }) => {
    return await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(config.jwtExpiresIn)
      .sign(new TextEncoder().encode(config.jwtSecret));
  };

  // Simuler une base de données (Ex : utilisateur fictif)
  const users = [
    { id: 1, email: "user@example.com", password: "password123" },
    { id: 2, email: "user2@example.com", password: "password123" },
    { id: 3, email: "user3@example.com", password: "password123" }];

  /**
   * Route d'inscription
   */
  router.post("/register", (req: any, res: any) => {
    const { email, password } = req.body;

    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const newUser = { id: 12345, email, password };
    users.push(newUser);
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  });

  // Route de connexion
  router.post("/login", async (req: any, res: any) => {
    const { email, password } = req.body;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const token = await generateToken(user);
    res.json({ message: "Connexion réussie", token });
  });

  // Route protégée : accès seulement si l'utilisateur est authentifié
  router.get("/profile", authMiddleware, (req: any, res: any) => {
    res.json({
      message: "Bienvenue sur votre profil",
      user: { ...req.user, exp: new Date(1741532005 * 1000).toISOString() },
    });
  });

  router.get("/users",  async (_req, res) => {
    try {
      const users: UserRow[] = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
  });

  router.post("/users", async (req, res) => {
    try {
      await userService.createUser(req.body);
      res.status(201).json({ message: "User upserted successfully" });
      logger.info(
        `User upserted successfully :: ${req.query.first_name} ${req.query.name}`
      );
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get("/usersById", async (req, res) => {
    res.json(await userService.getUserById(req.query.userId as string));
  });

  router.delete("/users", async (req, res) => {
    try {
      await userService.deleteUser(req.query.userId as string);
      res.status(204).send({ message: "User delete successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      logger.info(
        `Unable to get metadata for '${req.query.userId}' with error ${err.messag}`
      );
    }
  });

  return router;
}
