import * as jwt from 'jsonwebtoken'

export class Authenticator {
  private static EXPIRES_IN = "30min"
  public generateToken(input: AuthenticatorData): string {
    const token = jwt.sign(
      { id: input.id },
      process.env.JWT_KEY as string,
      {expiresIn: Authenticator.EXPIRES_IN}
    )
    return token
  }
  
  public verifyToken(token: string):AuthenticatorData{
    const payload = jwt.verify(
      token, 
      process.env.JWT_KEY as string
    ) as any
    return {
      id: payload.id
    }
  }
}
interface AuthenticatorData {
  id: string;
}