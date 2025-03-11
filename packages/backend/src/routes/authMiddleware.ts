import { NextFunction } from 'express';
import * as jwt from "jose";
import { config } from '../config';
import { IRequestUser, IUserData } from '../types/types';


interface JwtPayload {
  exp: any;
  email: string;
  role: string;
  password: string;
}

/**
 * // Middleware pour vérifier le JWT
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
// export const authMiddleware2 = async(req: any, res: any, next: NextFunction) => {
//   const token = req.headers.authorization?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ message: 'Token manquant ou invalide' });
//   }
//   try {
//     const roles: string[] = ["user", "admin"];
    
//     const secret = jwt.base64url.decode(config.jwtSecret);
//     const { payload } = await jwt.jwtVerify(token, secret) as any;
//     if (!roles.includes(payload.role)) 
//       return res.status(403).json({ message: "Accès interdit" });
//     console.log('payload.role::', payload.role)
//     req.user = { 
//       ...payload, exp: new Date(payload.exp! * 1000).toISOString() 
//     };
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Token invalide ou expiré' });
//   }
// };

export const authMiddleware = (roles: string[]) => {
  return async (req: any, res: any, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Accès non autorisé" });
    try {
      const secret = jwt.base64url.decode(config.jwtSecret);
      const { payload } = (await jwt.jwtVerify(token, secret)) as any;
      if (!roles.includes(payload.role))
        return res.status(403).json({ message: "Accès interdit" });

      req.user = { 
        ...payload, exp: new Date(payload.exp! * 1000).toISOString() 
      };
      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalide ou expiré" });
    }
  };
};

/**
 * Fonction pour générer un token JWT avec les paramètres ci-après:
 * @param user
 * @param alg : Algorithme de signature
 * @param jwtSecret : Signature
 * @param jwtExpiresIn : Durée de validité
 * @returns
 */
export const generateToken = async (user: {
  email: string;
  password: string;
  role: string;
}) => {
  const jwtKey = jwt.base64url.decode(config.jwtSecret);
  return await new jwt.SignJWT({ email: user.email, password: user.password, role: user.role, })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(config.jwtExpiresIn)
    .sign(jwtKey);
};