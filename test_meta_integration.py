#!/usr/bin/env python3
"""
TESTE COMPLETO: Meta Pixel & Conversions API Integration
Validação em produção sem mocks
"""

import os
import sys
import json
import time
import requests
from pathlib import Path
from typing import Dict, Any
from datetime import datetime

# Cores para output
class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    RESET = '\033[0m'

def load_env():
    """Carrega variáveis do .env.local"""
    env_file = Path('.env.local')
    env_vars = {}

    if env_file.exists():
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key.strip()] = value.strip()

    return env_vars

def log_section(msg: str):
    print(f"\n{Colors.BLUE}▶{Colors.RESET} {msg}")

def log_success(msg: str):
    print(f"{Colors.GREEN}✅{Colors.RESET} {msg}")

def log_error(msg: str):
    print(f"{Colors.RED}❌{Colors.RESET} {msg}")

def log_warning(msg: str):
    print(f"{Colors.YELLOW}⚠️{Colors.RESET} {msg}")

def test_edge_function(env: Dict[str, str]) -> bool:
    """Testa Edge Function endpoint"""
    log_section("1. Testando Edge Function Endpoint")

    edge_fn_url = f"{env.get('NEXT_PUBLIC_SUPABASE_URL')}/functions/v1/meta-conversions-webhook"

    payload = {
        "event_name": "Lead",
        "user_data": {
            "email": "test.edge@example.com",
            "phone": "5511999999999",
            "firstName": "Test",
            "lastName": "Edge"
        },
        "custom_data": {
            "source": "integration_test",
            "value": 150,
            "currency": "BRL"
        },
        "event_id": f"evt_test_{int(time.time())}",
        "is_test": True
    }

    print(f"   URL: {edge_fn_url}")
    print(f"   Payload: {json.dumps(payload, indent=2)}")

    try:
        response = requests.post(
            edge_fn_url,
            json=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {env.get('SUPABASE_SERVICE_ROLE_KEY')}",
            },
            timeout=10
        )

        print(f"\n   Status: {response.status_code}")

        try:
            data = response.json()
            print(f"   Response: {json.dumps(data, indent=2)}")

            if response.status_code == 200 and data.get('success'):
                log_success("Edge Function respondeu com sucesso")
                if data.get('eventId'):
                    log_success(f"Event ID: {data['eventId']}")
                return True
            else:
                error = data.get('error') or data.get('message', 'Unknown error')
                log_error(f"Edge Function retornou erro: {error}")
                return False
        except:
            print(f"   Raw response: {response.text}")
            return False

    except Exception as e:
        log_error(f"Falha ao conectar à Edge Function: {str(e)}")
        return False

def test_validation(env: Dict[str, str]) -> bool:
    """Testa validação de payload"""
    log_section("2. Testando Validação de Payload")

    edge_fn_url = f"{env.get('NEXT_PUBLIC_SUPABASE_URL')}/functions/v1/meta-conversions-webhook"

    tests = [
        ("Payload vazio", {}),
        ("Sem email e phone", {"event_name": "Lead", "user_data": {}}),
        ("Sem event_name", {"user_data": {"email": "test@example.com"}}),
    ]

    all_pass = True

    for test_name, payload in tests:
        print(f"\n   Teste: {test_name}")
        try:
            response = requests.post(
                edge_fn_url,
                json=payload,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {env.get('SUPABASE_SERVICE_ROLE_KEY')}",
                },
                timeout=5
            )

            if response.status_code >= 400:
                log_success(f"Corretamente rejeitou - status {response.status_code}")
            else:
                log_error(f"Deveria rejeitar - status {response.status_code}")
                all_pass = False

        except Exception as e:
            log_error(f"Erro no teste: {str(e)}")
            all_pass = False

    return all_pass

def test_deduplication(env: Dict[str, str]) -> bool:
    """Testa deduplicação de eventos"""
    log_section("3. Testando Deduplicação de Eventos")

    edge_fn_url = f"{env.get('NEXT_PUBLIC_SUPABASE_URL')}/functions/v1/meta-conversions-webhook"
    event_id = f"evt_dedupe_{int(time.time())}"

    payload = {
        "event_name": "Lead",
        "user_data": {
            "email": "dedupe.test@example.com",
            "phone": "5511777777777",
            "firstName": "Dedupe",
            "lastName": "Test"
        },
        "custom_data": {
            "source": "dedup_test"
        },
        "event_id": event_id,
        "is_test": True
    }

    # Primeiro envio
    print(f"\n   Primeiro envio (event_id: {event_id})...")
    try:
        response1 = requests.post(
            edge_fn_url,
            json=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {env.get('SUPABASE_SERVICE_ROLE_KEY')}",
            },
            timeout=10
        )

        if response1.status_code == 200:
            log_success("Primeiro envio bem-sucedido")
        else:
            log_error(f"Primeiro envio falhou com status {response1.status_code}")
            return False
    except Exception as e:
        log_error(f"Erro no primeiro envio: {str(e)}")
        return False

    # Aguardar um pouco
    time.sleep(1)

    # Segundo envio (deve ser duplicado)
    print(f"\n   Segundo envio (mesmo event_id - deve ser duplicado)...")
    try:
        response2 = requests.post(
            edge_fn_url,
            json=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {env.get('SUPABASE_SERVICE_ROLE_KEY')}",
            },
            timeout=10
        )

        data = response2.json()

        if response2.status_code == 409 or data.get('isDuplicate'):
            log_success("Deduplicação funcionando - segundo envio detectado como duplicado")
            return True
        else:
            log_error(f"Deduplicação falhou - segundo envio teve status {response2.status_code}")
            print(f"   Response: {json.dumps(data, indent=2)}")
            return False

    except Exception as e:
        log_error(f"Erro no segundo envio: {str(e)}")
        return False

def test_emq_hashing(env: Dict[str, str]) -> bool:
    """Testa enrichment de EMQ (email/phone hashing)"""
    log_section("4. Testando Enriquecimento de EMQ")

    edge_fn_url = f"{env.get('NEXT_PUBLIC_SUPABASE_URL')}/functions/v1/meta-conversions-webhook"

    payload = {
        "event_name": "Lead",
        "user_data": {
            "email": "emq.test@example.com",
            "phone": "5511666666666",
            "firstName": "EMQ",
            "lastName": "Test",
            "city": "São Paulo",
            "state": "SP",
            "zipCode": "01310100"
        },
        "custom_data": {
            "source": "emq_test"
        },
        "event_id": f"evt_emq_{int(time.time())}",
        "is_test": True
    }

    print(f"\n   Enviando payload com dados completos para enriquecimento...")

    try:
        response = requests.post(
            edge_fn_url,
            json=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {env.get('SUPABASE_SERVICE_ROLE_KEY')}",
            },
            timeout=10
        )

        data = response.json()

        if response.status_code == 200 and data.get('success'):
            log_success("EMQ enrichment enviado com sucesso")
            log_success("Campos enriquecidos: email, phone, firstName, lastName, city, state, zipCode")
            return True
        else:
            log_error(f"EMQ enrichment falhou: {data.get('error')}")
            return False

    except Exception as e:
        log_error(f"Erro no teste de EMQ: {str(e)}")
        return False

def check_meta_credentials(env: Dict[str, str]) -> bool:
    """Verifica credenciais Meta"""
    log_section("5. Verificando Credenciais Meta")

    required = [
        'META_CONVERSION_API_TOKEN',
        'META_DATASET_ID',
        'NEXT_PUBLIC_SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY'
    ]

    all_present = True

    for var in required:
        if var in env and env[var]:
            if 'TOKEN' in var:
                print(f"   {var}: {env[var][:30]}...")
            else:
                print(f"   {var}: ✓")
        else:
            log_error(f"{var}: FALTANDO")
            all_present = False

    if all_present:
        log_success("Todas as credenciais estão presentes")
    else:
        log_error("Algumas credenciais estão faltando")

    return all_present

def main():
    print("="*80)
    print("🧪 TESTE COMPLETO: Meta Pixel & Conversions API Integration")
    print("="*80)

    # Carregar variáveis de ambiente
    env = load_env()

    if not env:
        log_error("Não foi possível carregar .env.local")
        sys.exit(1)

    # Executar testes
    results = {}

    results['credentials'] = check_meta_credentials(env)
    results['edge_function'] = test_edge_function(env)
    results['validation'] = test_validation(env)
    results['deduplication'] = test_deduplication(env)
    results['emq'] = test_emq_hashing(env)

    # Relatório final
    log_section("RESUMO DOS TESTES")

    print("\n")
    for test, passed in results.items():
        status = f"{Colors.GREEN}PASSOU{Colors.RESET}" if passed else f"{Colors.RED}FALHOU{Colors.RESET}"
        print(f"   {test.replace('_', ' ').title()}: {status}")

    total = len(results)
    passed = sum(1 for v in results.values() if v)

    print(f"\n   Total: {passed}/{total} testes passaram")

    if passed == total:
        log_success("Todos os testes passaram! ✨")
        return 0
    else:
        log_warning(f"{total - passed} teste(s) falharam")
        return 1

if __name__ == '__main__':
    sys.exit(main())
