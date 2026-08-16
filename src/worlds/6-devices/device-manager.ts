/**
 * World 6: Cross-Device Compatibility
 * Ensures functionality across all device types and platforms
 */

export type DeviceType = 'web' | 'mobile' | 'desktop' | 'tablet' | 'iot' | 'embedded';

export interface DeviceProfile {
  id: string;
  type: DeviceType;
  platform: string;
  capabilities: string[];
  osVersion: string;
}

export interface DeviceCompatibilityResult {
  compatible: boolean;
  warnings: string[];
  recommendations: string[];
}

export class DeviceCompatibilityManager {
  private supportedDevices: Set<DeviceType> = new Set(['web', 'mobile', 'desktop', 'tablet', 'iot']);
  private profiles: Map<string, DeviceProfile> = new Map();

  registerDevice(profile: DeviceProfile): void {
    this.profiles.set(profile.id, profile);
  }

  checkCompatibility(deviceId: string): DeviceCompatibilityResult {
    const device = this.profiles.get(deviceId);
    
    if (!device) {
      return {
        compatible: false,
        warnings: ['Device not found in registry'],
        recommendations: ['Register device before compatibility check']
      };
    }

    const warnings: string[] = [];
    const recommendations: string[] = [];

    if (!this.supportedDevices.has(device.type)) {
      recommendations.push(`Device type '${device.type}' is not officially supported`);
    }

    return {
      compatible: warnings.length === 0,
      warnings,
      recommendations
    };
  }

  getSupportedDevices(): DeviceType[] {
    return Array.from(this.supportedDevices);
  }
}

export default DeviceCompatibilityManager;
