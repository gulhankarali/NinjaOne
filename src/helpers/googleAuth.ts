import { HashAlgorithms } from '@otplib/core';
import { authenticator } from 'otplib';

export interface TOTPConfig {
  step?: number;
  window?: number;
  digits?: number;
  algorithm?: HashAlgorithms;
}

export class TOTPHelper {
  private readonly secret: string;
  private readonly config: Required<TOTPConfig>;

  constructor(secret?: string, config: TOTPConfig = {}) {
    this.secret = secret || authenticator.generateSecret();
    this.config = {
      step: config.step || 30,
      window: config.window || 1,
      digits: config.digits || 6,
      algorithm: config.algorithm || HashAlgorithms.SHA1,
    };

    authenticator.options = {
      step: this.config.step,
      window: this.config.window,
      digits: this.config.digits,
      algorithm: this.config.algorithm,
    };
  }

  public getCurrentToken(): string {
    return authenticator.generate(this.secret);
  }

  public verifyToken(token: string): boolean {
    try {
      return authenticator.verify({ token, secret: this.secret });
    } catch {
      return false;
    }
  }

  public getSecret(): string {
    return this.secret;
  }

  public getProvisioningUri(accountName: string, issuer: string): string {
    return authenticator.keyuri(accountName, issuer, this.secret);
  }

  public getTimeRemaining(): number {
    const epoch = Math.floor(Date.now() / 1000);
    return this.config.step - (epoch % this.config.step);
  }

  public async waitForNextToken(buffer: number = 2): Promise<void> {
    const timeRemaining = this.getTimeRemaining();
    await new Promise((resolve) =>
      setTimeout(resolve, (timeRemaining - buffer) * 1000)
    );
  }

  public static async createWithFreshToken(secret?: string, config?: TOTPConfig): Promise<TOTPHelper> {
    const totp = new TOTPHelper(secret, config);
    await totp.waitForNextToken();
    return totp;
}

  public static setupNew2FA(accountName: string, issuer: string) {
    const totp = new TOTPHelper();
    return {
      secret: totp.getSecret(),
      currentToken: totp.getCurrentToken(),
      provisioningUri: totp.getProvisioningUri(accountName, issuer),
      timeRemaining: totp.getTimeRemaining(),
    };
  }
}
