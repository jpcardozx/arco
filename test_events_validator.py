#!/usr/bin/env python3
"""
Meta Test Events Validator
Verifica se eventos chegam corretamente no Meta Events Manager

Uso:
    python3 test_events_validator.py

Você precisa:
    1. Definir TEST_EVENT_CODE no seu Meta Pixel (Settings → Test Events)
    2. Copiar aqui: TEST_EVENT_CODE = "seu_codigo_aqui"
    3. Rodar o script
    4. Ir para Events Manager → Test Events e verificar se aparecem
"""

import requests
import time
from datetime import datetime
import json

# ============================================================================
# CONFIGURAÇÃO (COPIE DO SEU PIXEL NO META BUSINESS)
# ============================================================================

PIXEL_ID = "1677581716961792"  # Seu Pixel ID
ACCESS_TOKEN = "seu_token_aqui"  # Graph API token
TEST_EVENT_CODE = "seu_test_code_aqui"  # Do Meta Events Manager → Test Events

# Seu endpoint de API local
API_ENDPOINT = "http://localhost:3000/api/meta/conversions"

# ============================================================================
# TEST SUITE
# ============================================================================

class TestEventsValidator:
    def __init__(self):
        self.results = []
        self.passed = 0
        self.failed = 0

    def log(self, status: str, message: str, details: dict = None):
        """Log estruturado"""
        timestamp = datetime.now().isoformat()
        log_entry = {
            "timestamp": timestamp,
            "status": status,
            "message": message,
            "details": details or {}
        }
        self.results.append(log_entry)

        symbol = "✅" if status == "PASS" else "❌"
        print(f"{symbol} [{timestamp}] {status}: {message}")
        if details:
            print(f"   Details: {json.dumps(details, indent=2)}")

    def test_lead_event(self):
        """Test 1: Lead Event com email"""
        print("\n" + "="*70)
        print("TEST 1: Lead Event (Email)")
        print("="*70)

        payload = {
            "event_name": "Lead",
            "event_id": f"test_lead_{int(time.time())}",
            "user_data": {
                "email": "test.validator@arco.com.br",
                "phone": "5511987654321"
            },
            "custom_data": {
                "currency": "BRL",
                "value": 150,
                "source": "test_validator"
            },
            "is_test": True  # Marca como test event
        }

        try:
            r = requests.post(API_ENDPOINT, json=payload, timeout=10)
            response_data = r.json()

            if r.status_code == 200 and response_data.get("success"):
                self.log("PASS", "Lead event enviado com sucesso", {
                    "status_code": r.status_code,
                    "event_id": response_data.get("eventId"),
                    "fbtrace_id": response_data.get("metaResponse", {}).get("fbtrace_id")
                })
                self.passed += 1
                return True
            else:
                self.log("FAIL", f"Lead event falhou com status {r.status_code}", {
                    "status_code": r.status_code,
                    "response": response_data
                })
                self.failed += 1
                return False
        except Exception as e:
            self.log("FAIL", f"Exception ao enviar Lead: {str(e)}", {
                "error": str(e)
            })
            self.failed += 1
            return False

    def test_purchase_event(self):
        """Test 2: Purchase Event"""
        print("\n" + "="*70)
        print("TEST 2: Purchase Event")
        print("="*70)

        payload = {
            "event_name": "Purchase",
            "event_id": f"test_purchase_{int(time.time())}",
            "user_data": {
                "email": "purchase.test@arco.com.br",
                "phone": "5511988776655"
            },
            "custom_data": {
                "currency": "BRL",
                "value": 500,
                "order_id": f"order_{int(time.time())}"
            },
            "is_test": True
        }

        try:
            r = requests.post(API_ENDPOINT, json=payload, timeout=10)
            response_data = r.json()

            if r.status_code == 200 and response_data.get("success"):
                self.log("PASS", "Purchase event enviado", {
                    "status_code": r.status_code,
                    "event_id": response_data.get("eventId"),
                    "value": 500
                })
                self.passed += 1
                return True
            else:
                self.log("FAIL", f"Purchase event falhou", {
                    "status_code": r.status_code,
                    "response": response_data
                })
                self.failed += 1
                return False
        except Exception as e:
            self.log("FAIL", f"Exception: {str(e)}", {"error": str(e)})
            self.failed += 1
            return False

    def test_deduplication(self):
        """Test 3: Deduplication"""
        print("\n" + "="*70)
        print("TEST 3: Deduplication (409 esperado no 2º evento)")
        print("="*70)

        event_id = f"test_dedup_{int(time.time())}"
        payload = {
            "event_name": "Lead",
            "event_id": event_id,
            "user_data": {
                "email": "dedup.test@arco.com.br"
            },
            "is_test": True
        }

        # Primeiro evento
        try:
            r1 = requests.post(API_ENDPOINT, json=payload, timeout=10)
            if r1.status_code == 200:
                self.log("PASS", "1º evento (Lead) aceito", {
                    "status_code": 200,
                    "event_id": event_id
                })
            else:
                self.log("FAIL", f"1º evento falhou com {r1.status_code}", {
                    "status_code": r1.status_code
                })
                self.failed += 1
                return False
        except Exception as e:
            self.log("FAIL", f"1º evento exception: {str(e)}", {"error": str(e)})
            self.failed += 1
            return False

        # Segundo evento (duplicado)
        time.sleep(0.5)
        try:
            r2 = requests.post(API_ENDPOINT, json=payload, timeout=10)
            if r2.status_code == 409 and r2.json().get("isDuplicate"):
                self.log("PASS", "2º evento (duplicado) bloqueado com 409", {
                    "status_code": 409,
                    "isDuplicate": True,
                    "event_id": event_id
                })
                self.passed += 1
                return True
            else:
                self.log("FAIL", f"2º evento não foi bloqueado (status: {r2.status_code})", {
                    "status_code": r2.status_code,
                    "response": r2.json()
                })
                self.failed += 1
                return False
        except Exception as e:
            self.log("FAIL", f"2º evento exception: {str(e)}", {"error": str(e)})
            self.failed += 1
            return False

    def test_validation_errors(self):
        """Test 4: Validation Errors"""
        print("\n" + "="*70)
        print("TEST 4: Validation (400 esperado)")
        print("="*70)

        invalid_payloads = [
            {
                "name": "Sem event_name",
                "payload": {
                    "event_id": "test_1",
                    "user_data": {"email": "test@test.com"}
                }
            },
            {
                "name": "Sem user_data",
                "payload": {
                    "event_name": "Lead",
                    "event_id": "test_2"
                }
            },
            {
                "name": "Sem email/phone",
                "payload": {
                    "event_name": "Lead",
                    "user_data": {"name": "João"}
                }
            }
        ]

        passed_validation = 0
        for test in invalid_payloads:
            try:
                r = requests.post(API_ENDPOINT, json=test["payload"], timeout=10)
                if r.status_code == 400:
                    self.log("PASS", f"Validação OK: {test['name']}", {
                        "status_code": 400
                    })
                    passed_validation += 1
                else:
                    self.log("FAIL", f"Esperado 400, recebido {r.status_code}: {test['name']}", {
                        "status_code": r.status_code
                    })
            except Exception as e:
                self.log("FAIL", f"Exception em {test['name']}: {str(e)}", {
                    "error": str(e)
                })

        if passed_validation == len(invalid_payloads):
            self.passed += 1
        else:
            self.failed += 1

    def run_all(self):
        """Executar todos os testes"""
        print("\n")
        print("╔" + "="*68 + "╗")
        print("║" + " "*68 + "║")
        print("║" + "META TEST EVENTS VALIDATOR".center(68) + "║")
        print("║" + " "*68 + "║")
        print("╚" + "="*68 + "╝")
        print()
        print(f"API Endpoint: {API_ENDPOINT}")
        print(f"Pixel ID: {PIXEL_ID}")
        print()

        self.test_lead_event()
        time.sleep(1)

        self.test_purchase_event()
        time.sleep(1)

        self.test_deduplication()
        time.sleep(1)

        self.test_validation_errors()

        # Relatório final
        print("\n" + "="*70)
        print("RESULTADO FINAL")
        print("="*70)
        total = self.passed + self.failed
        print(f"✅ Passou:  {self.passed}")
        print(f"❌ Falhou:  {self.failed}")
        print(f"📊 Total:   {total}")
        print()

        if self.failed == 0:
            print("🎉 TODOS OS TESTES PASSARAM!")
            print()
            print("Próximos passos:")
            print("1. Ir para Meta Business → Events Manager")
            print("2. Selecionar seu Pixel ID")
            print("3. Ir para 'Test Events'")
            print(f"4. Inserir TEST_EVENT_CODE: {TEST_EVENT_CODE}")
            print("5. Procurar pelos eventos que você acabou de dispara")
            print("6. Verificar se 'Event Match Quality' está em 6+/10")
        else:
            print("⚠️ ALGUNS TESTES FALHARAM")
            print("Revise os erros acima e execute novamente.")

        print()
        return self.failed == 0


if __name__ == "__main__":
    validator = TestEventsValidator()
    success = validator.run_all()
    exit(0 if success else 1)
