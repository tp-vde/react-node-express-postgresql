import { NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { TextEncoder } from 'util';


/**
 * // Middleware pour vérifier le JWT
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const authMiddleware = async(req: any, res: any, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token manquant ou invalide' });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    req.user = payload;
    
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};


export default authMiddleware;