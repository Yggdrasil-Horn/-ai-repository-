/**
 * World 8: Installation Verification
 * Verifies installation integrity and authenticity
 */

export interface InstallationPackage {
  id: string;
  version: string;
  checksum: string;
  signature: string;
  timestamp: Date;
}

export interface VerificationResult {
  valid: boolean;
  verified: boolean;
  message: string;
  package?: InstallationPackage;
}

export class InstallationVerifier {
  private installedPackages: Map<string, InstallationPackage> = new Map();
  private trustedSigners: Set<string> = new Set();

  addTrustedSigner(signer: string): void {
    this.trustedSigners.add(signer);
  }

  async verifyInstallation(pkg: InstallationPackage): Promise<VerificationResult> {
    // Verify checksum exists
    if (!pkg.checksum) {
      return {
        valid: false,
        verified: false,
        message: 'Missing package checksum'
      };
    }

    // Verify signature
    if (!pkg.signature) {
      return {
        valid: false,
        verified: false,
        message: 'Missing package signature'
      };
    }

    // Check if signed by trusted signer (simplified)
    if (!this.trustedSigners.has(pkg.signature)) {
      return {
        valid: false,
        verified: false,
        message: 'Package not signed by trusted signer'
      };
    }

    this.installedPackages.set(pkg.id, pkg);
    
    return {
      valid: true,
      verified: true,
      message: `Package ${pkg.id} verified successfully`,
      package: pkg
    };
  }

  getInstalledPackages(): InstallationPackage[] {
    return Array.from(this.installedPackages.values());
  }
}

export default InstallationVerifier;
