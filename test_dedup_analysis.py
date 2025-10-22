#!/usr/bin/env python3
"""
DIAGNÓSTICO DETALHADO: Deduplicação em Edge Function

O problema: Deduplicação em-memory só funciona DENTRO da mesma instância da Edge Function.
Entre requisições diferentes (hot starts), a memória é "limpa".

Este teste valida se é esse o caso.
"""

import os
import json
import time
import requests
from pathlib import Path
from typing import Dict, Any

# Load env
env_file = Path('.env.local')
env_vars = {}

if env_file.exists():
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                env_vars[key.strip()] = value.strip()

EDGE_FN_URL = f"{env_vars.get('NEXT_PUBLIC_SUPABASE_URL')}/functions/v1/meta-conversions-webhook"
SERVICE_ROLE_KEY = env_vars.get('SUPABASE_SERVICE_ROLE_KEY')

print("="*80)
print("📊 DIAGNÓSTICO: Deduplicação em Edge Function")
print("="*80)
print()

# Teste 1: Duas requisições com pequeno intervalo (deve estar na mesma instância)
print("TESTE 1: Requisições rapidamente (0.1s intervalo)")
print("-" * 80)

event_id = f"evt_diag1_{int(time.time())}"
payload = {
    "event_name": "Lead",
    "user_data": {
        "email": f"diag1_{int(time.time())}@test.com",
        "phone": "5511999999999"
    },
    "event_id": event_id,
    "is_test": True
}

print(f"Event ID: {event_id}")
print(f"Primeiro envio...")

r1 = requests.post(
    EDGE_FN_URL,
    json=payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    },
    timeout=10
)

print(f"  Status: {r1.status_code}")
d1 = r1.json()
print(f"  Success: {d1.get('success')}")
print(f"  Request ID: {d1.get('requestId')}")

time.sleep(0.1)

print(f"\nSegundo envio (0.1s depois - MESMA INSTÂNCIA)...")

r2 = requests.post(
    EDGE_FN_URL,
    json=payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    },
    timeout=10
)

print(f"  Status: {r2.status_code}")
d2 = r2.json()
print(f"  Success: {d2.get('success')}")
print(f"  Is Duplicate: {d2.get('isDuplicate')}")
print(f"  Request ID: {d2.get('requestId')}")

if r2.status_code == 409 or d2.get('isDuplicate'):
    print(f"\n✅ Deduplicação FUNCIONOU na mesma instância")
    test1_pass = True
else:
    print(f"\n❌ Deduplicação FALHOU - evento não foi detectado como duplicado")
    test1_pass = False

print()

# Teste 2: Requisições com intervalo maior (pode ser outra instância)
print("\nTESTE 2: Requisições com intervalo maior (5s)")
print("-" * 80)

event_id2 = f"evt_diag2_{int(time.time())}"
payload2 = {
    "event_name": "Lead",
    "user_data": {
        "email": f"diag2_{int(time.time())}@test.com",
        "phone": "5511888888888"
    },
    "event_id": event_id2,
    "is_test": True
}

print(f"Event ID: {event_id2}")
print(f"Primeiro envio...")

r3 = requests.post(
    EDGE_FN_URL,
    json=payload2,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    },
    timeout=10
)

print(f"  Status: {r3.status_code}")
d3 = r3.json()
print(f"  Success: {d3.get('success')}")
print(f"  Request ID: {d3.get('requestId')}")

print(f"\nAguardando 5 segundos...")
time.sleep(5)

print(f"\nSegundo envio (5s depois - OUTRA INSTÂNCIA)...")

r4 = requests.post(
    EDGE_FN_URL,
    json=payload2,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    },
    timeout=10
)

print(f"  Status: {r4.status_code}")
d4 = r4.json()
print(f"  Success: {d4.get('success')}")
print(f"  Is Duplicate: {d4.get('isDuplicate')}")
print(f"  Request ID: {d4.get('requestId')}")

if r4.status_code == 409 or d4.get('isDuplicate'):
    print(f"\n✅ Deduplicação FUNCIONOU entre instâncias (INESPERADO)")
    test2_pass = True
else:
    print(f"\n⚠️  Deduplicação NÃO funcionou entre instâncias (ESPERADO)")
    print(f"   Isso significa: em-memory dedup é LOCAL por instância")
    test2_pass = False

print()
print("="*80)
print("DIAGNÓSTICO")
print("="*80)

if test1_pass and not test2_pass:
    print("""
✅ DIAGNÓSTICO CONFIRMADO:

Deduplicação em-memory funciona APENAS dentro da mesma instância da Edge Function.

Razão: Serverless Edge Functions usam fresh instances para cada requisição
ou reutilizam a mesma instância por um curto tempo (warm start).

PROBLEMA CRÍTICO:
- Quando a instância "morre" (cold start), a memória é perdida
- Não há garantia de que requisições A e B vão para a mesma instância
- Portanto, deduplicação global NÃO FUNCIONA com apenas em-memory

SOLUÇÃO NECESSÁRIA:
- Usar Supabase Redis para deduplicação persistente
- OU usar database (supabase.tables) para tracking
- OU implementar request deduping no backend (API route)
""")
else:
    print("Resultado inesperado - verificar logs")

print()
