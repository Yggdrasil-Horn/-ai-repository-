import DOMPurifier from '../src/worlds/3-sanitization';

describe('DOMPurifier - World 3', () => {
  let purifier: DOMPurifier;

  beforeEach(() => {
    purifier = new DOMPurifier();
  });

  test('should remove script tags', () => {
    const dirty = '<p>Hello</p><script>alert("xss")</script>';
    const result = purifier.sanitize(dirty);

    expect(result.clean).not.toContain('<script>');
    expect(result.removed.length).toBeGreaterThan(0);
  });

  test('should remove event handlers', () => {
    const dirty = '<button onclick="alert(1)">Click</button>';
    const result = purifier.sanitize(dirty);

    expect(result.clean).not.toContain('onclick');
  });

  test('should mark clean content as safe', () => {
    const clean = '<p>Safe content</p>';
    const result = purifier.sanitize(clean);

    expect(result.isSafe).toBe(true);
    expect(result.removed.length).toBe(0);
  });
});
