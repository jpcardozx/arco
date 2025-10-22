#!/usr/bin/env python3
"""
TESTE: Deduplicação com Database (PÓS-FIX)
"""

import os
import json
import time
import requests
from pathlib import Path

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

print("=" * 80)
print("🔧 TESTE: Deduplicação com Database (Após Fix)")
print("=" * 80)
print()

# Teste: Dois envios idênticos
event_id = f"evt_fix_test_{int(time.time())}"
payload = {
    "event_name": "Lead",
    "user_data": {
        "email": f"dedup.fix.{int(time.time())}@test.com",
        "phone": "5511999999999"
    },
    "event_id": event_id,
    "is_test": True
}

print(f"Event ID: {event_id}")
print(f"Email: {payload['user_data']['email']}")
print()

print("🔸 ENVIO 1: Primeiro evento")
r1 = requests.post(
    EDGE_FN_URL,
    json=payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    },
    timeout=10
)

print(f"   Status: {r1.status_code}")
d1 = r1.json()
print(f"   Success: {d1.get('success')}")
if d1.get('eventId'):
    print(f"   Event ID: {d1['eventId']}")
if 'metaResponse' in d1:
    print(f"   Meta Trace: {d1['metaResponse'].get('fbtrace_id', 'N/A')}")
print()

# Aguardar um pouco
time.sleep(2)

print("🔸 ENVIO 2: Mesmo evento (deve detectar duplicata)")
r2 = requests.post(
    EDGE_FN_URL,
    json=payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    },
    timeout=10
)

print(f"   Status: {r2.status_code}")
d2 = r2.json()
print(f"   Response: {json.dumps(d2, indent=2)}")
print()

# Análise
if r2.status_code == 409:
    print("✅ SUCESSO: Deduplicação funcionando!")
    print("   Segundo envio retornou 409 Conflict (duplicata detectada)")
elif d2.get('isDuplicate'):
    print("✅ SUCESSO: Deduplicação funcionando!")
    print("   isDuplicate flag está TRUE")
elif r2.status_code == 200 and d2.get('success'):
    print("❌ FALHA: Evento foi aceito como novo")
    print("   Deduplicação NÃO está funcionando")
    print()
    print("📋 DEBUG:")
    print(f"   - Response inclui isDuplicate? {d2.get('isDuplicate', 'NO')}")
    print(f"   - Response inclui success? {d2.get('success')}")
    print(f"   - Error message? {d2.get('error', 'N/A')}")
else:
    print("⚠️  RESPOSTA INESPERADA")
    print(json.dumps(d2, indent=2))

print()
print("=" * 80)
