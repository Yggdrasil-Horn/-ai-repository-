# Nordic Framework - 9 Worlds of Security

A comprehensive TypeScript/Node.js framework for building secure, validated, and cross-device compatible applications. Nordic implements 9 interconnected security and functionality domains (the "9 Worlds").

## 🌍 The 9 Worlds

### World 1: Validation Engine
Core validation system that ensures data integrity across all operations.
- **Location**: `src/worlds/1-validation/`
- **Features**: Rules-based validation, async validation chains, error reporting
- **Key Class**: `Validator`

### World 2: Certificate Management
Handles certificate validation, registration, and lifecycle management.
- **Location**: `src/worlds/2-certificates/`
- **Features**: Certificate verification, expiration checking, fingerprint validation
- **Key Class**: `CertificateManager`

### World 3: DOM Purification & Sanitization
Cleans and sanitizes content to prevent injection attacks and malicious code.
- **Location**: `src/worlds/3-sanitization/`
- **Features**: Script removal, style stripping, event handler cleanup
- **Key Class**: `DOMPurifier`

### World 4: Debugger & Introspection
Provides comprehensive debugging capabilities and system state inspection.
- **Location**: `src/worlds/4-debugger/`
- **Features**: Log collection, context tracking, system introspection
- **Key Class**: `NordicDebugger`

### World 5: Endpoint Solver
Routes and resolves HTTP endpoints with smart parameter matching.
- **Location**: `src/worlds/5-solvers/`
- **Features**: Endpoint registration, path resolution, method matching
- **Key Class**: `EndpointSolver`

### World 6: Cross-Device Compatibility
Ensures functionality works seamlessly across all device types.
- **Location**: `src/worlds/6-devices/`
- **Features**: Device profiling, capability detection, compatibility checking
- **Key Class**: `DeviceCompatibilityManager`

### World 7: Data Protection
Encrypts and securely stores sensitive data with integrity verification.
- **Location**: `src/worlds/7-protection/`
- **Features**: Data encryption, secure storage, hash verification
- **Key Class**: `DataProtector`

### World 8: Installation Verification
Verifies installation packages are authentic and uncorrupted.
- **Location**: `src/worlds/8-installation/`
- **Features**: Checksum verification, signature validation, package integrity
- **Key Class**: `InstallationVerifier`

### World 9: Authentication & Authorization
Manages user identity, access control, and permission verification.
- **Location**: `src/worlds/9-auth/`
- **Features**: User authentication, role-based access, permission checking
- **Key Class**: `AuthenticationManager`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm run test

# Start development with watch mode
npm run dev
```

## 📖 Usage Examples

### Basic Validation (World 1)
```typescript
import { Validator } from 'nordic';

const validator = new Validator();
validator.addRule({
  name: 'emailFormat',
  validate: async (data) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data as string),
  errorMessage: 'Invalid email format'
});

const result = await validator.validate('user@example.com');
console.log(result.valid); // true
```

### Certificate Management (World 2)
```typescript
import { CertificateManager } from 'nordic';

const certMgr = new CertificateManager();
certMgr.registerCertificate({
  id: 'cert-1',
  subject: 'CN=example.com',
  issuer: 'CN=CA',
  validFrom: new Date('2024-01-01'),
  validTo: new Date('2026-01-01'),
  fingerprint: 'abc123',
  publicKey: 'key123',
  isValid: true
});

const verification = certMgr.verifyCertificate('cert-1');
console.log(verification.valid); // true
```

### DOM Sanitization (World 3)
```typescript
import { DOMPurifier } from 'nordic';

const purifier = new DOMPurifier();
const result = purifier.sanitize('<p>Hello</p><script>alert("xss")</script>');
console.log(result.clean);   // '<p>Hello</p>'
console.log(result.isSafe);  // true
```

### Debugging (World 4)
```typescript
import { NordicDebugger } from 'nordic';

const debugger = new NordicDebugger();
debugger.log('info', 'Application started');
debugger.log('error', 'An error occurred', { code: 'ERR_001' });

const logs = debugger.getLogs('error');
console.log(logs); // Array of error logs
```

## 🏗️ Project Structure

```
nordic/
├── src/
│   ├── worlds/
│   │   ├── 1-validation/
│   │   ├── 2-certificates/
│   │   ├── 3-sanitization/
│   │   ├── 4-debugger/
│   │   ├── 5-solvers/
│   │   ├── 6-devices/
│   │   ├── 7-protection/
│   │   ├── 8-installation/
│   │   └── 9-auth/
│   ├── core/
│   └── index.ts
├── tests/
├── docs/
├── package.json
├── tsconfig.json
└── jest.config.js
```

## 🧪 Testing

Run the full test suite:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🔍 Development

### Build TypeScript
```bash
npm run build
```

### Run Linting
```bash
npm run lint
npm run lint:fix
```

### Type Checking
```bash
npm run type-check
```

## 📋 Task Progression

### Tasks 1-4 (Core Implementation)

**Task 1**: Validation Framework ✓
- Core validator engine
- Pluggable rules system
- Async validation support

**Task 2**: Certificate Verification ✓
- Certificate registration
- Expiration checking
- Fingerprint validation

**Task 3**: Content Sanitization ✓
- Script and style removal
- Event handler stripping
- Safe content detection

**Task 4**: Debugger & Endpoints ✓
- Logging system
- Context tracking
- Endpoint routing

## 🛡️ Security Features

- **Data Encryption**: World 7 provides AES-256-GCM encryption
- **Certificate Validation**: World 2 ensures authentic communications
- **Input Sanitization**: World 3 prevents injection attacks
- **Installation Verification**: World 8 validates package integrity
- **Authentication**: World 9 manages secure access

## 🔧 Configuration Files

- `tsconfig.json` - TypeScript compiler options
- `jest.config.js` - Test configuration
- `.eslintrc.json` - Linting rules
- `.vscode/launch.json` - VS Code debugger config

## 📝 Documentation

See the `/docs` folder for detailed documentation on each world.

## 🤝 Contributing

Tasks are organized by world. Each world can be developed independently:
- World 1-9: Core implementation (✓ Complete)
- Extended features: Integration modules
- Tools: CLI and utilities

## 📄 License

MIT

## 👤 Author

Yggdrasil-Horn

---

**Nordic**: Building secure, validated, and universally compatible systems across all 9 worlds.

