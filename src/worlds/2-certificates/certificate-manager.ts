/**
 * World 2: Certificate Management System
 * Handles certificate validation and management
 */

export interface Certificate {
  id: string;
  subject: string;
  issuer: string;
  validFrom: Date;
  validTo: Date;
  fingerprint: string;
  publicKey: string;
  isValid: boolean;
}

export interface CertificateVerificationResult {
  valid: boolean;
  reason?: string;
  certificate?: Certificate;
}

export class CertificateManager {
  private certificates: Map<string, Certificate> = new Map();

  registerCertificate(cert: Certificate): void {
    if (this.isExpired(cert)) {
      throw new Error(`Certificate ${cert.id} is expired`);
    }
    this.certificates.set(cert.id, cert);
  }

  verifyCertificate(certId: string): CertificateVerificationResult {
    const cert = this.certificates.get(certId);
    
    if (!cert) {
      return { valid: false, reason: 'Certificate not found' };
    }

    if (this.isExpired(cert)) {
      return { valid: false, reason: 'Certificate expired', certificate: cert };
    }

    return { valid: true, certificate: cert };
  }

  private isExpired(cert: Certificate): boolean {
    return new Date() > cert.validTo;
  }

  removeCertificate(certId: string): boolean {
    return this.certificates.delete(certId);
  }
}

export default CertificateManager;
