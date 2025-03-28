import express , { Request, Response } from "express";
import Router from "express-promise-router";
import { UserService } from "../services";
import { StudentRow, UserRoleRow, UserRow } from "../types/types";
import { corsMiddleware } from "../utils/cors";
import * as winston from "winston";
import bodyParser from "body-parser";
import { authMiddleware, generateToken } from "../ahuth/authMiddleware";
import { StudentService } from "../services/StudentService";
import { mailOptions, sendMail } from "../notifications/sendmail";

export type RouterOptions = {
  logger: winston.Logger;
  // httpAuth?: HttpAuthService;
  // auth?: AuthService;
};

export function createRouter(options: RouterOptions): express.Router {
  const { logger } = options;
  const userService = new UserService();
  const studentService = new StudentService();

  const router = Router();
  router.use(express.json());
  router.use(corsMiddleware());
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.get("/health", (_, res) => {
    res.json({ status: "ok" });
  });

  router.get("/", (_, res) => {
    res.json({ message: "Bienvenu à VDE !" });
  });

  /**
   * Route d'inscription des utilisateurs en base
   */
  router.post("/user", authMiddleware(['admin']), async (req: Request, res: Response): Promise<any>  => {
    try {
      const password = await userService.createUser(req.body);
      const options = { ...mailOptions,  to: req.body.email, html: `<p>Veuillez trouver votre mot de passe ci-après : ${password}</p>` };
      await sendMail(options);
      res.status(201).json({ message: "Utilisateur créé avec succès" });
      logger.info(`Utilisateur créé avec succès :: ${req.body.first_name} ${req.body.last_name}`
      );
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // Route de connexion
  router.post("/login", async (req: any, res: any) => {
    const { email, password } = req.body;
    const user = await userService.getUserRoleById(email, password);
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const token = await generateToken(user);
    res.json({ message: "Connexion réussie", token });
  });

  // Route protégée pour les utilisateurs
  router.get('/users', authMiddleware(['user', 'admin']), async (_req, res) => {
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

  router.delete("/user", authMiddleware(['admin']), async (req, res) => {
    try {
      await userService.deleteUser(req.query.userId as string);
      res.status(204).send({ message: "Student delete successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      logger.info(`Unable to get metadata for '${req.query.userId}' with error ${err.messag}`);
    }
  });

  // Route protégée : accès seulement si l'utilisateur est authentifié
  router.get("/profile", (req: any, res: any) => {
    res.json({
      message: "Bienvenue sur votre profil",
      user: req.user,
    });
  });

  router.get("/students", authMiddleware(['user', 'admin']), async (_req, res) => {
    try {
      const students: StudentRow[] = await studentService.getAllStudents();
      res.json(students);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des étudiants" });
    }
  });

  router.post("/student", authMiddleware(['admin']), async (req, res) => {
    try {
      await studentService.createStudent(req.body);
      res.status(201).json({ message: "Student upserted successfully" });
      logger.info(`Student upserted successfully :: ${req.query.first_name} ${req.query.name}`);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get("/student", authMiddleware(['user', 'admin']), async (req, res) => {
    res.json(await studentService.getStudentById(req.query.stCode as string));
  });

  router.delete("/student", async (req, res) => {
    try {
      await studentService.deleteStudent(req.query.stCode as string);
      res.status(204).send({ message: "Student delete successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      logger.info(`Unable to get metadata for '${req.query.stCode}' with error ${err.messag}`);
    }
  });

  return router;
}