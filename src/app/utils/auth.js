export function getToken(req) {
    const authorization = req.headers.get("authorization");
    const token = authorization?.split(" ")[1];
    
    if (!token) {
      throw new Error("Token not provided");
    }
  
    return token;
}
  