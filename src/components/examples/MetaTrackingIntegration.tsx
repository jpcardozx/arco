/**
 * Meta Tracking Integration Examples
 *
 * Exemplos práticos de como usar o hook useMetaTracking em componentes reais.
 *
 * Estratégia do funil:
 * 1. LP: ViewContent + Pixel (automatizado)
 * 2. Simulador: SimNoShow_Completed + Lead (captura)
 * 3. CTWA: Contact (clique)
 * 4. CRM: Lead (confirmado)
 * 5. Agendamento: Schedule
 * 6. Pagamento: Purchase (tripwire)
 */

"use client";

import { useCallback, useState } from "react";
import { useMetaTracking } from "@/hooks/useMetaTracking";

// ============================================================================
// EXEMPLO 1: Lead Capturado (Simulador de Economia)
// ============================================================================

export function SimulatorLeadCapture() {
  const { trackLead } = useMetaTracking();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulationSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const salonName = formData.get("salonName") as string;

      try {
        // Rastrear lead originado do simulador
        const response = await trackLead({
          email,
          phone,
          firstName: salonName.split(" ")[0],
          lastName: salonName.split(" ").slice(1).join(" "),
          city: formData.get("city") as string,
          state: formData.get("state") as string,
          value: 150, // Valor estimado do lead
          source: "simulator", // Custom: origem do lead
        });

        setResult(response);

        // Log para debug
        console.log("📊 [Simulator] Lead capturado", {
          email,
          eventId: response.eventId,
          success: response.success,
          isDuplicate: response.isDuplicate,
          duration: response.duration,
        });

        // Mostrar sucesso
        if (response.success) {
          // Aqui você salvaria o lead no banco de dados
          alert("Lead capturado e rastreado com sucesso!");
        } else if (response.isDuplicate) {
          alert("Este lead já foi rastreado recentemente");
        } else {
          alert(`Erro ao rastrear: ${response.error}`);
        }
      } catch (error) {
        console.error("[Simulator] Erro ao capturar lead", error);
        alert("Erro ao processar simulação");
      } finally {
        setLoading(false);
      }
    },
    [trackLead]
  );

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">💰 Simulador de Economia</h2>

      <form onSubmit={handleSimulationSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome do Salão</label>
          <input
            type="text"
            name="salonName"
            placeholder="Salão de Beleza X"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="owner@salon.com"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">WhatsApp</label>
            <input
              type="tel"
              name="phone"
              placeholder="11 99999-9999"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Cidade</label>
            <input
              type="text"
              name="city"
              placeholder="São Paulo"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <input
              type="text"
              name="state"
              placeholder="SP"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded font-medium disabled:opacity-50"
        >
          {loading ? "Processando..." : "Capturar Lead"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-sm font-mono">
          <p>
            <strong>Event ID:</strong> {result.eventId}
          </p>
          <p>
            <strong>Request ID:</strong> {result.requestId}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {result.success ? "✅ Sucesso" : "❌ Erro"}
          </p>
          <p>
            <strong>Modo:</strong> {result.mode}
          </p>
          <p>
            <strong>Duplicado:</strong> {result.isDuplicate ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Duração:</strong> {result.duration}ms
          </p>
          {result.error && (
            <p>
              <strong>Erro:</strong> {result.error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXEMPLO 2: Clique para WhatsApp (CTWA)
// ============================================================================

export function CtwaContactButton() {
  const { trackContact } = useMetaTracking();
  const [loading, setLoading] = useState(false);

  const handleCtwaClick = useCallback(async () => {
    setLoading(true);

    try {
      // Rastrear evento de contato/clique WhatsApp
      const response = await trackContact({
        email: "prospect@example.com", // Seria obtido do contexto real
        phone: "11999999999",
        message: "Interesse em simulador",
      });

      console.log("📲 [CTWA] Contato rastreado", {
        eventId: response.eventId,
        success: response.success,
      });

      // Redirecionar para WhatsApp após rastreamento
      if (response.success || response.error) {
        // Mesmo se falhar o rastreamento, leva para WhatsApp
        const whatsappUrl =
          "https://wa.me/5511999999999?text=Olá, tenho interesse no simulador";
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("[CTWA] Erro ao rastrear clique", error);
      // Fallback: abrir WhatsApp mesmo assim
      const whatsappUrl =
        "https://wa.me/5511999999999?text=Olá, tenho interesse";
      window.open(whatsappUrl, "_blank");
    } finally {
      setLoading(false);
    }
  }, [trackContact]);

  return (
    <button
      onClick={handleCtwaClick}
      disabled={loading}
      className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
    >
      {loading ? "Conectando..." : "💬 Falar no WhatsApp"}
    </button>
  );
}

// ============================================================================
// EXEMPLO 3: Agendamento (CRM)
// ============================================================================

export function ScheduleConfirmation() {
  const { trackSchedule } = useMetaTracking();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScheduleConfirm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const serviceType = formData.get("serviceType") as string;
      const scheduledDate = formData.get("scheduledDate") as string;
      const servicePrice = parseFloat(
        formData.get("servicePrice") as string
      );

      try {
        // Rastrear agendamento
        const response = await trackSchedule({
          email,
          phone,
          value: servicePrice,
          serviceType,
          scheduledDate,
        });

        setResult(response);

        console.log("📅 [Schedule] Agendamento rastreado", {
          eventId: response.eventId,
          serviceType,
          success: response.success,
        });

        if (response.success) {
          alert("Agendamento confirmado e rastreado!");
        } else if (response.isDuplicate) {
          alert("Este agendamento já foi registrado");
        } else {
          alert(`Erro ao rastrear: ${response.error}`);
        }
      } catch (error) {
        console.error("[Schedule] Erro ao confirmar agendamento", error);
        alert("Erro ao processar agendamento");
      } finally {
        setLoading(false);
      }
    },
    [trackSchedule]
  );

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">📅 Confirmar Agendamento</h2>

      <form onSubmit={handleScheduleConfirm} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="cliente@email.com"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">WhatsApp</label>
          <input
            type="tel"
            name="phone"
            placeholder="11 99999-9999"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Serviço</label>
          <select
            name="serviceType"
            className="w-full px-3 py-2 border rounded"
          >
            <option>Corte de Cabelo</option>
            <option>Manicure</option>
            <option>Pedicure</option>
            <option>Massagem</option>
            <option>Tratamento Facial</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Data/Hora</label>
            <input
              type="datetime-local"
              name="scheduledDate"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Valor (R$)</label>
            <input
              type="number"
              name="servicePrice"
              placeholder="150.00"
              step="0.01"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded font-medium disabled:opacity-50"
        >
          {loading ? "Confirmando..." : "Confirmar Agendamento"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded text-sm">
          {result.success && "✅ Agendamento rastreado com sucesso"}
          {result.isDuplicate && "⚠️ Agendamento duplicado"}
          {!result.success && !result.isDuplicate && `❌ ${result.error}`}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXEMPLO 4: Dashboard de Debug
// ============================================================================

export function MetaTrackingDebug() {
  const { trackContact } = useMetaTracking();
  const [events, setEvents] = useState<any[]>([]);

  const handleTestEvent = useCallback(async () => {
    const response = await trackContact({
      email: `test_${Date.now()}@example.com`,
      phone: "5511999999999",
      message: "Test event",
    });

    setEvents((prev) => [
      {
        timestamp: new Date().toISOString(),
        ...response,
      },
      ...prev,
    ]);
  }, [trackContact]);

  return (
    <div className="p-6 bg-gray-50 border rounded-lg">
      <h3 className="font-bold mb-4">🐛 Meta Tracking Debug</h3>

      <button
        onClick={handleTestEvent}
        className="px-4 py-2 bg-purple-600 text-white rounded mb-4"
      >
        Enviar Evento de Teste
      </button>

      <div className="space-y-2 max-h-96 overflow-auto">
        {events.length === 0 ? (
          <p className="text-gray-500">Nenhum evento rastreado ainda</p>
        ) : (
          events.map((event, idx) => (
            <div key={idx} className="p-3 bg-white rounded border text-xs">
              <p>
                <strong>Timestamp:</strong> {event.timestamp}
              </p>
              <p>
                <strong>Event ID:</strong> {event.eventId}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {event.success ? "✅" : "❌"} {event.isDuplicate && "(Dup)"}
              </p>
              <p>
                <strong>Duration:</strong> {event.duration}ms
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
