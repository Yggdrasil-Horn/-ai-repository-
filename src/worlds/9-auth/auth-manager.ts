/**
 * World 9: Authentication & Authorization
 * Manages user identity and access control
 */

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface AuthenticationResult {
  authenticated: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface AuthorizationResult {
  authorized: boolean;
  reason?: string;
}

export class AuthenticationManager {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, string> = new Map(); // token -> userId

  registerUser(user: User): void {
    this.users.set(user.id, user);
  }

  async authenticate(userId: string, password: string): Promise<AuthenticationResult> {
    const user = this.users.get(userId);
    
    if (!user) {
      return {
        authenticated: false,
        error: 'User not found'
      };
    }

    if (!user.isActive) {
      return {
        authenticated: false,
        error: 'User account is inactive'
      };
    }

    // Placeholder - in production would verify password hash
    const token = this.generateToken();
    this.sessions.set(token, userId);

    return {
      authenticated: true,
      user,
      token
    };
  }

  authorize(token: string, requiredPermission: string): AuthorizationResult {
    const userId = this.sessions.get(token);
    if (!userId) {
      return { authorized: false, reason: 'Invalid or expired token' };
    }

    const user = this.users.get(userId);
    if (!user) {
      return { authorized: false, reason: 'User not found' };
    }

    if (!user.permissions.includes(requiredPermission)) {
      return { authorized: false, reason: 'User lacks required permission' };
    }

    return { authorized: true };
  }

  private generateToken(): string {
    return Buffer.from(Math.random().toString()).toString('base64').substring(0, 32);
  }
}

export default AuthenticationManager;
