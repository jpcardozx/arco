/**
 * useMetaTracking Hook Tests
 *
 * Testes para validar:
 * - Event ID generation e cache
 * - FBP/FBC collection
 * - Edge Function communication
 * - Dedup logic
 */

import { renderHook, act } from '@testing-library/react';
import { useMetaTracking } from '@/hooks/useMetaTracking';

// Mock fetch
global.fetch = jest.fn();

describe('useMetaTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // =========================================================================
  // Event ID Generation Tests
  // =========================================================================

  describe('Event ID Generation', () => {
    it('should generate event ID on first call', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          requestId: 'req_123',
        }),
      });

      let response;
      await act(async () => {
        response = await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(response.eventId).toBeDefined();
      expect(response.eventId).toMatch(/^evt_lead_/);
    });

    it('should cache event ID for same email within 1 hour', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, requestId: 'req_1' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, requestId: 'req_2' }),
        });

      let response1, response2;

      await act(async () => {
        response1 = await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      await act(async () => {
        response2 = await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(response1.eventId).toBe(response2.eventId);
    });

    it('should generate different event ID for different email', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, requestId: 'req_1' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, requestId: 'req_2' }),
        });

      let response1, response2;

      await act(async () => {
        response1 = await result.current.trackLead({
          email: 'test1@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      await act(async () => {
        response2 = await result.current.trackLead({
          email: 'test2@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(response1.eventId).not.toBe(response2.eventId);
    });
  });

  // =========================================================================
  // Edge Function Communication Tests
  // =========================================================================

  describe('Edge Function Communication', () => {
    it('should POST to Supabase Edge Function', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, requestId: 'req_123' }),
      });

      await act(async () => {
        await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(global.fetch).toHaveBeenCalled();
      const call = (global.fetch as jest.Mock).mock.calls[0];

      // Verificar URL contém Supabase
      expect(call[0]).toContain('supabase');
      expect(call[0]).toContain('meta-conversions-webhook');

      // Verificar headers
      expect(call[1].headers['Content-Type']).toBe('application/json');
      expect(call[1].headers['X-Event-ID']).toBeDefined();

      // Verificar body
      const body = JSON.parse(call[1].body);
      expect(body.event_name).toBe('Lead');
      expect(body.user_data.email).toBe('test@example.com');
      expect(body.event_id).toBeDefined();
    });

    it('should handle Edge Function success response', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          eventId: 'evt_lead_123',
          requestId: 'req_456',
        }),
      });

      let response;
      await act(async () => {
        response = await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(response.success).toBe(true);
      expect(response.eventId).toBeDefined();
      expect(response.requestId).toBeDefined();
      expect(response.duration).toBeDefined();
    });

    it('should handle Edge Function error response (409 Duplicate)', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({
          error: 'Duplicate event',
          isDuplicate: true,
        }),
      });

      let response;
      await act(async () => {
        response = await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(response.success).toBe(false);
      expect(response.isDuplicate).toBe(true);
    });

    it('should handle network error with graceful fallback', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      let response;
      await act(async () => {
        response = await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(response.success).toBe(false);
      expect(response.error).toContain('Network error');
    });
  });

  // =========================================================================
  // Helper Methods Tests
  // =========================================================================

  describe('Helper Methods', () => {
    it('trackLead should populate Lead event data', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, requestId: 'req_123' }),
      });

      await act(async () => {
        await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          firstName: 'João',
          lastName: 'Silva',
          city: 'São Paulo',
          state: 'SP',
          value: 150,
          source: 'landing_page',
        });
      });

      const call = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(call[1].body);

      expect(body.event_name).toBe('Lead');
      expect(body.user_data.email).toBe('test@example.com');
      expect(body.user_data.firstName).toBe('João');
      expect(body.user_data.lastName).toBe('Silva');
      expect(body.user_data.city).toBe('São Paulo');
      expect(body.user_data.state).toBe('SP');
      expect(body.custom_data.value).toBe(150);
      expect(body.custom_data.source).toBe('landing_page');
    });

    it('trackContact should populate Contact event data', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, requestId: 'req_123' }),
      });

      await act(async () => {
        await result.current.trackContact({
          email: 'test@example.com',
          phone: '5511999999999',
          message: 'Interested in CTWA',
        });
      });

      const call = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(call[1].body);

      expect(body.event_name).toBe('Contact');
      expect(body.custom_data.message).toBe('Interested in CTWA');
    });

    it('trackSchedule should populate Schedule event data', async () => {
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, requestId: 'req_123' }),
      });

      await act(async () => {
        await result.current.trackSchedule({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 200,
          serviceType: 'Manicure',
          scheduledDate: '2025-10-25T14:00:00Z',
        });
      });

      const call = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(call[1].body);

      expect(body.event_name).toBe('Schedule');
      expect(body.custom_data.serviceType).toBe('Manicure');
      expect(body.custom_data.scheduledDate).toBe('2025-10-25T14:00:00Z');
    });
  });

  // =========================================================================
  // Logging Tests
  // =========================================================================

  describe('Logging', () => {
    it('should log event tracking events', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const { result } = renderHook(() => useMetaTracking());

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, requestId: 'req_123' }),
      });

      await act(async () => {
        await result.current.trackLead({
          email: 'test@example.com',
          phone: '5511999999999',
          value: 100,
        });
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📤 [Meta Tracking] Enviando'),
        expect.any(Object)
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ [Meta Tracking] Evento rastreado'),
        expect.any(Object)
      );

      consoleSpy.mockRestore();
    });
  });
});
