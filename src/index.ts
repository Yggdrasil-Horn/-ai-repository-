/**
 * Nordic - Secure Knowledge Framework
 * 9 Worlds of Security, Validation, and Protection
 */

import Validator from './worlds/1-validation';
import CertificateManager from './worlds/2-certificates';
import DOMPurifier from './worlds/3-sanitization';
import NordicDebugger from './worlds/4-debugger';
import EndpointSolver from './worlds/5-solvers';
import DeviceCompatibilityManager from './worlds/6-devices';
import DataProtector from './worlds/7-protection';
import InstallationVerifier from './worlds/8-installation';
import AuthenticationManager from './worlds/9-auth';

export const Nordic = {
  Validator,
  CertificateManager,
  DOMPurifier,
  Debugger: NordicDebugger,
  EndpointSolver,
  DeviceManager: DeviceCompatibilityManager,
  DataProtector,
  InstallationVerifier,
  AuthenticationManager
};

export * from './worlds/1-validation';
export * from './worlds/2-certificates';
export * from './worlds/3-sanitization';
export * from './worlds/4-debugger';
export * from './worlds/5-solvers';
export * from './worlds/6-devices';
export * from './worlds/7-protection';
export * from './worlds/8-installation';
export * from './worlds/9-auth';

export default Nordic;
