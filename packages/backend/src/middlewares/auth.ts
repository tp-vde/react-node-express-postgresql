import { NextFunction } from 'express';
import { base64url, decodeJwt, decodeProtectedHeader, jwtVerify, SignJWT } from 'jose';
import { config } from '../config';
// import { IRequestUser, IUserData } from '../types/types';

const SECONDS_IN_MS = 1000;
const ALLOWED_PLUGIN_ID_PATTERN = /^[a-z0-9_-]+$/i;

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


export const authMiddleware = (roles: string[]) => {
  return async (req: any, res: any, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Accès non autorisé" });
    try {
      const secret = base64url.decode(config.jwtSecret);
      const { payload } = (await jwtVerify(token, secret)) as any;
      if (!roles.includes(String(payload.role).toLocaleLowerCase()))
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
export const generateAccessToken = async (user: {
  email: string;
  password: string;
  role: string;
}) => {
  const jwtKey = base64url.decode(config.jwtSecret);
  const iat = Math.floor(Date.now() / SECONDS_IN_MS);
  const exp = config.jwtExpiresIn;
  return await new SignJWT({ email: user.email, password: user.password, role: user.role, })
    .setProtectedHeader({ alg: "HS256",  typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .sign(jwtKey);
};


export const verifyToken = async (
    token: string,
  ): Promise<{ subject: string; limitedUserToken?: string } | undefined> => {
    try {
      const { typ } = decodeProtectedHeader(token);
      if (typ !== "JWT") {
        return undefined;
      }
    } catch {
      return undefined;
    }

    const pluginId = String(decodeJwt(token).sub);
    if (!pluginId) {
      // throw new AuthenticationError('Invalid plugin token: missing subject');
    }
    if (!ALLOWED_PLUGIN_ID_PATTERN.test(pluginId)) {
      // throw new AuthenticationError(
      //   'Invalid plugin token: forbidden subject format',
      // );
    }
    const jwtKey: Uint8Array = base64url.decode(config.jwtSecret);
    const { payload } = await jwtVerify<{ jwt: string; key?: string }>( token, jwtKey)
    .catch(e => {
      throw new Error(`Failed plugin token verification : ${e}`);
    });

    return { subject: `appli:${payload.exp}`};
  }



    /**
   * Valide la force d'un mot de passe
   */
    const validatePasswordStrength = (password: string): boolean =>{
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    }


    // const  register = async (req: Request, res: Response) =>{
    //   try {
    //     const { password } = req.body;
  
    //     // Validation du mot de passe
    //     if (!validatePasswordStrength(password)) {
    //       return res.status(400).json({
    //         message:
    //           'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
    //       });
    //     }

    //    }