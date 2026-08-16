import CertificateManager from '../src/worlds/2-certificates';
import { Certificate } from '../src/worlds/2-certificates';

describe('CertificateManager - World 2', () => {
  let manager: CertificateManager;
  let testCert: Certificate;

  beforeEach(() => {
    manager = new CertificateManager();
    testCert = {
      id: 'test-cert-1',
      subject: 'CN=example.com',
      issuer: 'CN=CA',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2026-01-01'),
      fingerprint: 'abc123',
      publicKey: 'key123',
      isValid: true
    };
  });

  test('should register a valid certificate', () => {
    expect(() => manager.registerCertificate(testCert)).not.toThrow();
  });

  test('should verify a registered certificate', () => {
    manager.registerCertificate(testCert);
    const result = manager.verifyCertificate('test-cert-1');

    expect(result.valid).toBe(true);
    expect(result.certificate).toEqual(testCert);
  });

  test('should fail to verify non-existent certificate', () => {
    const result = manager.verifyCertificate('non-existent');
    expect(result.valid).toBe(false);
  });
});
