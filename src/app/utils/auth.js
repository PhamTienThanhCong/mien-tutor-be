import { decrypt } from "./Security";

export function getToken(req) {
    const authorization = req.headers.get("authorization");
    const token = authorization?.split(" ")[1];
    
    if (!token) {
      throw new Error("Token not provided");
    }
  
    return token;
}
  
export const validateToken = async (req) => {
    const token = await getToken(req);
    try {
      let decryptedToken = await decrypt(token);
      decryptedToken = JSON.parse(decryptedToken);
      return decryptedToken["username"];
    }
    catch (error) {
      return null;
    }
}