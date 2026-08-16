/**
 * World 3: DOM Purification & Sanitization
 * Cleans and sanitizes content from malicious code
 */

export interface SanitizationOptions {
  allowedTags?: string[];
  allowedAttributes?: string[];
  stripScripts?: boolean;
  stripStyles?: boolean;
}

export interface SanitizationResult {
  clean: string;
  removed: string[];
  isSafe: boolean;
}

export class DOMPurifier {
  private defaultOptions: SanitizationOptions = {
    allowedTags: ['p', 'div', 'span', 'h1', 'h2', 'h3', 'ul', 'li', 'a'],
    allowedAttributes: ['href', 'title', 'class'],
    stripScripts: true,
    stripStyles: true
  };

  sanitize(content: string, options?: SanitizationOptions): SanitizationResult {
    const config = { ...this.defaultOptions, ...options };
    const removed: string[] = [];
    let clean = content;

    // Remove script tags
    if (config.stripScripts) {
      const scriptRegex = /<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi;
      clean = clean.replace(scriptRegex, (match) => {
        removed.push(match);
        return '';
      });
    }

    // Remove style tags
    if (config.stripStyles) {
      const styleRegex = /<style\\b[^<]*(?:(?!<\\/style>)<[^<]*)*<\\/style>/gi;
      clean = clean.replace(styleRegex, (match) => {
        removed.push(match);
        return '';
      });
    }

    // Remove event handlers
    const eventRegex = /on\\w+\\s*=\\s*[\"'][^\"']*[\"']/gi;
    clean = clean.replace(eventRegex, (match) => {
      removed.push(match);
      return '';
    });

    return {
      clean,
      removed,
      isSafe: removed.length === 0
    };
  }
}

export default DOMPurifier;
