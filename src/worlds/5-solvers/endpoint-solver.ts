/**
 * World 5: Endpoint Solver
 * Solves and routes endpoints across the system
 */

export type EndpointHandler = (params: Record<string, unknown>) => Promise<unknown>;

export interface EndpointDefinition {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  handler: EndpointHandler;
  requiresAuth?: boolean;
  requiresCertificate?: boolean;
}

export interface EndpointResolution {
  found: boolean;
  handler?: EndpointHandler;
  params?: Record<string, unknown>;
  error?: string;
}

export class EndpointSolver {
  private endpoints: Map<string, EndpointDefinition> = new Map();

  registerEndpoint(def: EndpointDefinition): void {
    const key = `${def.method} ${def.path}`;
    this.endpoints.set(key, def);
  }

  async resolveEndpoint(path: string, method: string, params: Record<string, unknown>): Promise<EndpointResolution> {
    const key = `${method} ${path}`;
    const endpoint = this.endpoints.get(key);

    if (!endpoint) {
      return {
        found: false,
        error: `No endpoint found for ${method} ${path}`
      };
    }

    try {
      const result = await endpoint.handler(params);
      return {
        found: true,
        handler: endpoint.handler,
        params
      };
    } catch (error) {
      return {
        found: true,
        error: `Error resolving endpoint: ${error}`
      };
    }
  }

  listEndpoints(): EndpointDefinition[] {
    return Array.from(this.endpoints.values());
  }
}

export default EndpointSolver;
