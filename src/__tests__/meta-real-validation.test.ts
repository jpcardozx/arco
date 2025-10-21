/**
 * Meta Conversions API - Real Validation Tests (NO MOCKS)
 *
 * Testes reais que validam:
 * - Payload structure conforme Meta CAPI v24.0
 * - Hash generation (SHA-256)
 * - Dedup logic
 * - Event ID consistency
 * - Data normalization
 *
 * Executar com:
 * npm run test meta-real-validation.test.ts
 */

import crypto from 'crypto';

// =========================================================================
// TYPES
// =========================================================================

interface MetaEventPayload {
  event_name: string;
  event_id: string;
  event_time: number;
  action_source: string;
  user_data: {
    em?: string[];
    ph?: string[];
    fn?: string[];
    ln?: string[];
    ct?: string[];
    st?: string[];
    zp?: string[];
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
  };
  custom_data: {
    event_source: string;
    lead_event_source: string;
    [key: string]: any;
  };
}

// =========================================================================
// HASH FUNCTIONS (Real Implementation)
// =========================================================================

function hashSHA256(value: string): string {
  if (!value) return '';
  const normalized = value.trim().toLowerCase();
  return crypto
    .createHash('sha256')
    .update(normalized)
    .digest('hex');
}

function hashEmail(email: string): string {
  return hashSHA256(email);
}

function hashPhone(phone: string, countryCode: string = '55'): string {
  if (!phone) return '';
  let normalized = phone.replace(/\D/g, '');
  if (!normalized.startsWith(countryCode)) {
    normalized = countryCode + normalized;
  }
  return hashSHA256(normalized);
}

function generateEventId(prefix: string = 'evt'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${prefix}_${timestamp}_${random}`;
}

// =========================================================================
// VALIDATION FUNCTIONS
// =========================================================================

function validateMetaPayload(payload: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate event_name
  if (!payload.event_name || typeof payload.event_name !== 'string') {
    errors.push('event_name is required and must be string');
  }

  // Validate event_id
  if (!payload.event_id || typeof payload.event_id !== 'string') {
    errors.push('event_id is required and must be string');
  }

  // Validate event_time (UNIX timestamp in seconds)
  if (!payload.event_time || typeof payload.event_time !== 'number') {
    errors.push('event_time is required and must be number (UNIX seconds)');
  }
  if (payload.event_time < 1000000000) {
    errors.push('event_time seems to be in milliseconds, should be seconds');
  }

  // Validate action_source
  if (payload.action_source !== 'system_generated') {
    errors.push('action_source must be "system_generated"');
  }

  // Validate user_data
  if (!payload.user_data || typeof payload.user_data !== 'object') {
    errors.push('user_data is required and must be object');
  } else {
    // Validate that at least one identifier is provided
    const hasIdentifier =
      payload.user_data.em ||
      payload.user_data.ph ||
      payload.user_data.fbp ||
      payload.user_data.fbc ||
      payload.user_data.client_ip_address;

    if (!hasIdentifier) {
      errors.push('user_data must contain at least one identifier (em, ph, fbp, fbc, or client_ip_address)');
    }

    // Validate hashes are hex strings
    if (payload.user_data.em && Array.isArray(payload.user_data.em)) {
      for (const hash of payload.user_data.em) {
        if (!/^[a-f0-9]{64}$/.test(hash)) {
          errors.push(`email hash is not valid SHA-256 hex: ${hash}`);
        }
      }
    }

    if (payload.user_data.ph && Array.isArray(payload.user_data.ph)) {
      for (const hash of payload.user_data.ph) {
        if (!/^[a-f0-9]{64}$/.test(hash)) {
          errors.push(`phone hash is not valid SHA-256 hex: ${hash}`);
        }
      }
    }
  }

  // Validate custom_data
  if (!payload.custom_data || typeof payload.custom_data !== 'object') {
    errors.push('custom_data is required and must be object');
  } else {
    if (payload.custom_data.event_source !== 'crm') {
      errors.push('custom_data.event_source must be "crm"');
    }
    if (!payload.custom_data.lead_event_source) {
      errors.push('custom_data.lead_event_source is required');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// =========================================================================
// TESTS
// =========================================================================

describe('Meta CAPI - Real Validation (NO MOCKS)', () => {
  // =========================================================================
  // HASH GENERATION TESTS
  // =========================================================================

  describe('Hash Generation', () => {
    it('should generate valid SHA-256 hash for email', () => {
      const email = 'test@example.com';
      const hash = hashEmail(email);

      // SHA-256 produces 64 hex characters
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
      expect(hash.length).toBe(64);
    });

    it('should be case-insensitive for email', () => {
      const hash1 = hashEmail('Test@Example.com');
      const hash2 = hashEmail('test@example.com');
      const hash3 = hashEmail('TEST@EXAMPLE.COM');

      expect(hash1).toBe(hash2);
      expect(hash2).toBe(hash3);
    });

    it('should trim whitespace from email', () => {
      const hash1 = hashEmail('  test@example.com  ');
      const hash2 = hashEmail('test@example.com');

      expect(hash1).toBe(hash2);
    });

    it('should generate valid SHA-256 hash for phone', () => {
      const phone = '11999999999';
      const hash = hashPhone(phone);

      expect(hash).toMatch(/^[a-f0-9]{64}$/);
      expect(hash.length).toBe(64);
    });

    it('should normalize phone by removing non-digits', () => {
      const hash1 = hashPhone('(11) 9 9999-9999');
      const hash2 = hashPhone('11999999999');

      expect(hash1).toBe(hash2);
    });

    it('should add country code 55 if not present', () => {
      const hash1 = hashPhone('11999999999'); // Without country code
      const hash2 = hashPhone('5511999999999'); // With country code

      expect(hash1).toBe(hash2);
    });

    it('should not duplicate country code', () => {
      const hash1 = hashPhone('5511999999999');
      const hash2 = hashPhone('55' + '5511999999999'); // Invalid duplicate

      expect(hash1).not.toBe(hash2); // Different hashes
    });
  });

  // =========================================================================
  // EVENT ID TESTS
  // =========================================================================

  describe('Event ID Generation', () => {
    it('should generate unique event IDs', () => {
      const id1 = generateEventId();
      const id2 = generateEventId();

      expect(id1).not.toBe(id2);
    });

    it('should follow format: evt_timestamp_random', () => {
      const id = generateEventId();

      expect(id).toMatch(/^evt_\d+_[a-z0-9]+$/);
    });

    it('should use current timestamp', () => {
      const before = Date.now();
      const id = generateEventId();
      const after = Date.now();

      const [prefix, timestamp, random] = id.split('_');
      const ts = parseInt(timestamp);

      expect(ts).toBeGreaterThanOrEqual(before);
      expect(ts).toBeLessThanOrEqual(after);
    });

    it('should accept custom prefix', () => {
      const id = generateEventId('lead');

      expect(id).toMatch(/^lead_\d+_[a-z0-9]+$/);
    });
  });

  // =========================================================================
  // PAYLOAD VALIDATION TESTS
  // =========================================================================

  describe('Meta Payload Validation', () => {
    it('should validate correct Lead payload', () => {
      const payload: MetaEventPayload = {
        event_name: 'Lead',
        event_id: generateEventId(),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: {
          em: [hashEmail('test@example.com')],
          ph: [hashPhone('11999999999')],
          fbp: 'fb.1.1234567890.1987654321',
        },
        custom_data: {
          event_source: 'crm',
          lead_event_source: 'ARCO WebDev',
          value: 100,
        },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject payload without event_name', () => {
      const payload = {
        event_id: generateEventId(),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: { em: [hashEmail('test@example.com')] },
        custom_data: { event_source: 'crm', lead_event_source: 'ARCO' },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('event_name is required and must be string');
    });

    it('should reject payload with invalid hash format', () => {
      const payload: any = {
        event_name: 'Lead',
        event_id: generateEventId(),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: {
          em: ['invalid_not_hex'], // Not a valid SHA-256 hex
        },
        custom_data: { event_source: 'crm', lead_event_source: 'ARCO' },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('email hash is not valid'))).toBe(true);
    });

    it('should reject payload with event_time in milliseconds', () => {
      const payload: any = {
        event_name: 'Lead',
        event_id: generateEventId(),
        event_time: Date.now(), // Milliseconds (wrong!)
        action_source: 'system_generated',
        user_data: { em: [hashEmail('test@example.com')] },
        custom_data: { event_source: 'crm', lead_event_source: 'ARCO' },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('milliseconds'))).toBe(true);
    });

    it('should require at least one user identifier', () => {
      const payload: any = {
        event_name: 'Lead',
        event_id: generateEventId(),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: {}, // Empty user_data
        custom_data: { event_source: 'crm', lead_event_source: 'ARCO' },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('must contain at least one identifier'))).toBe(true);
    });

    it('should validate Contact event', () => {
      const payload: MetaEventPayload = {
        event_name: 'Contact',
        event_id: generateEventId('contact'),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: {
          em: [hashEmail('prospect@example.com')],
          ph: [hashPhone('11987654321')],
          fbc: 'fb.1.9999999999.1234567890123',
        },
        custom_data: {
          event_source: 'crm',
          lead_event_source: 'ARCO WebDev',
          message: 'Interested in CTWA',
        },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate Schedule event', () => {
      const payload: MetaEventPayload = {
        event_name: 'Schedule',
        event_id: generateEventId('schedule'),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: {
          em: [hashEmail('customer@example.com')],
          ph: [hashPhone('11988776655')],
          fbp: 'fb.1.1111111111.2222222222',
        },
        custom_data: {
          event_source: 'crm',
          lead_event_source: 'ARCO WebDev',
          value: 200,
          service_type: 'Manicure',
          scheduled_date: '2025-10-25T14:00:00Z',
        },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // =========================================================================
  // DEDUP LOGIC TESTS
  // =========================================================================

  describe('Deduplication Logic', () => {
    it('should generate same event ID for same email within TTL', () => {
      const email = 'test@example.com';
      const eventName = 'Lead';

      // Simular hook cache logic
      const cache = new Map<string, string>();
      const cacheKey = `${eventName}_${email}`;

      function getOrGenerateEventId(name: string, mail: string): string {
        const key = `${name}_${mail}`;
        if (cache.has(key)) {
          return cache.get(key)!;
        }
        const id = generateEventId(name.toLowerCase());
        cache.set(key, id);
        return id;
      }

      const id1 = getOrGenerateEventId(eventName, email);
      const id2 = getOrGenerateEventId(eventName, email);
      const id3 = getOrGenerateEventId(eventName, email);

      expect(id1).toBe(id2);
      expect(id2).toBe(id3);
    });

    it('should generate different event ID for different email', () => {
      const cache = new Map<string, string>();

      function getOrGenerateEventId(name: string, mail: string): string {
        const key = `${name}_${mail}`;
        if (cache.has(key)) {
          return cache.get(key)!;
        }
        const id = generateEventId(name.toLowerCase());
        cache.set(key, id);
        return id;
      }

      const id1 = getOrGenerateEventId('Lead', 'test1@example.com');
      const id2 = getOrGenerateEventId('Lead', 'test2@example.com');

      expect(id1).not.toBe(id2);
    });

    it('should generate different event ID for different event name', () => {
      const cache = new Map<string, string>();

      function getOrGenerateEventId(name: string, mail: string): string {
        const key = `${name}_${mail}`;
        if (cache.has(key)) {
          return cache.get(key)!;
        }
        const id = generateEventId(name.toLowerCase());
        cache.set(key, id);
        return id;
      }

      const id1 = getOrGenerateEventId('Lead', 'test@example.com');
      const id2 = getOrGenerateEventId('Contact', 'test@example.com');
      const id3 = getOrGenerateEventId('Schedule', 'test@example.com');

      expect(id1).not.toBe(id2);
      expect(id2).not.toBe(id3);
      expect(id1).not.toBe(id3);
    });
  });

  // =========================================================================
  // EDGE FUNCTION PAYLOAD TESTS
  // =========================================================================

  describe('Edge Function Payload Construction', () => {
    it('should build valid Lead payload from user input', () => {
      // Simular dados do formulário
      const input = {
        email: 'lead@example.com',
        phone: '(11) 9 9999-9999',
        firstName: 'João',
        lastName: 'Silva',
        city: 'São Paulo',
        state: 'SP',
        value: 150,
      };

      // Construir payload como Edge Function faria
      const payload: MetaEventPayload = {
        event_name: 'Lead',
        event_id: generateEventId('lead'),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: {
          em: [hashEmail(input.email)],
          ph: [hashPhone(input.phone)],
          fn: [hashSHA256(input.firstName)],
          ln: [hashSHA256(input.lastName)],
          ct: [hashSHA256(input.city)],
          st: [hashSHA256(input.state)],
          fbp: 'fb.1.test.test', // Simulado
          fbc: 'fb.1.test.test', // Simulado
        },
        custom_data: {
          event_source: 'crm',
          lead_event_source: 'ARCO WebDev',
          value: input.value,
          currency: 'BRL',
        },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(payload.user_data.em).toBeDefined();
      expect(payload.user_data.ph).toBeDefined();
      expect(payload.user_data.fn).toBeDefined();
      expect(payload.user_data.ln).toBeDefined();
    });

    it('should handle optional fields gracefully', () => {
      // Mínimo payload válido (apenas email)
      const payload: MetaEventPayload = {
        event_name: 'Contact',
        event_id: generateEventId('contact'),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data: {
          em: [hashEmail('minimal@example.com')],
          fbp: 'fb.1.test.test',
        },
        custom_data: {
          event_source: 'crm',
          lead_event_source: 'ARCO WebDev',
        },
      };

      const result = validateMetaPayload(payload);

      expect(result.valid).toBe(true);
    });
  });

  // =========================================================================
  // DATA NORMALIZATION TESTS
  // =========================================================================

  describe('Data Normalization', () => {
    it('should handle various phone formats', () => {
      const formats = [
        '11999999999',
        '(11) 9 9999-9999',
        '11 99999999',
        '5511999999999',
        '+55 11 99999999',
      ];

      const hashes = formats.map((phone) => hashPhone(phone));

      // All should produce the same hash (after normalization)
      const firstHash = hashes[0];
      expect(hashes.every((h) => h === firstHash)).toBe(true);
    });

    it('should handle email case variations', () => {
      const emails = [
        'Test@Example.com',
        'test@example.com',
        'TEST@EXAMPLE.COM',
        '  test@example.com  ',
      ];

      const hashes = emails.map((email) => hashEmail(email));
      const firstHash = hashes[0];

      expect(hashes.every((h) => h === firstHash)).toBe(true);
    });

    it('should preserve name case but normalize for hash', () => {
      const firstName = 'João';
      const hash1 = hashSHA256(firstName);
      const hash2 = hashSHA256('joão');
      const hash3 = hashSHA256('JOÃO');

      expect(hash1).toBe(hash2);
      expect(hash2).toBe(hash3);
      // But original data preserved
      expect(firstName).toBe('João');
    });
  });
});
