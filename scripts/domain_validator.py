#!/usr/bin/env python3
"""
ARCO - Domain Validator Script
Phase 3: Backend Integration

Validates domain and returns comprehensive analysis:
- DNS records (A, MX, TXT)
- WHOIS data
- SSL certificate validation
- Historical data check
- Domain availability in database
- Suggestions if unavailable

Usage:
    python scripts/domain_validator.py <domain>
    python scripts/domain_validator.py example.com
"""

import sys
import json
import dns.resolver
import whois
import requests
import ssl
import socket
from datetime import datetime, timedelta
from typing import Dict, List, Optional

class DomainValidator:
    def __init__(self, domain: str):
        self.domain = domain.lower().strip()
        self.results = {
            "domain": self.domain,
            "timestamp": datetime.now().isoformat(),
            "isValid": False,
            "isAvailable": False,
            "dnsRecords": {},
            "whoisData": None,
            "sslValid": False,
            "suggestions": [],
            "errors": [],
        }
    
    def validate(self) -> Dict:
        """Main validation method"""
        try:
            # 1. Validate format
            if not self._validate_format():
                return self.results
            
            # 2. Check DNS records
            self._check_dns()
            
            # 3. Get WHOIS data
            self._get_whois()
            
            # 4. Check SSL certificate
            self._check_ssl()
            
            # 5. Check availability in database (mock for now)
            self._check_database_availability()
            
            # 6. Generate suggestions if unavailable
            if not self.results["isAvailable"]:
                self._generate_suggestions()
            
            self.results["isValid"] = True
            
        except Exception as e:
            self.results["errors"].append(str(e))
        
        return self.results
    
    def _validate_format(self) -> bool:
        """Validate domain format using regex"""
        import re
        
        pattern = r'^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]?\.[a-z]{2,}$'
        is_valid = bool(re.match(pattern, self.domain))
        
        if not is_valid:
            self.results["errors"].append("Invalid domain format")
        
        return is_valid
    
    def _check_dns(self):
        """Check DNS records (A, MX, TXT)"""
        try:
            # A records
            a_records = []
            try:
                answers = dns.resolver.resolve(self.domain, 'A')
                a_records = [str(rdata) for rdata in answers]
            except:
                pass
            
            # MX records
            mx_records = []
            try:
                answers = dns.resolver.resolve(self.domain, 'MX')
                mx_records = [str(rdata.exchange) for rdata in answers]
            except:
                pass
            
            # TXT records
            txt_records = []
            try:
                answers = dns.resolver.resolve(self.domain, 'TXT')
                txt_records = [str(rdata) for rdata in answers]
            except:
                pass
            
            self.results["dnsRecords"] = {
                "a": a_records,
                "mx": mx_records,
                "txt": txt_records,
                "hasRecords": len(a_records) > 0,
            }
        except Exception as e:
            self.results["errors"].append(f"DNS check failed: {str(e)}")
    
    def _get_whois(self):
        """Get WHOIS data"""
        try:
            w = whois.whois(self.domain)
            
            self.results["whoisData"] = {
                "registrar": w.registrar if hasattr(w, 'registrar') else None,
                "creationDate": str(w.creation_date[0]) if isinstance(w.creation_date, list) else str(w.creation_date) if w.creation_date else None,
                "expirationDate": str(w.expiration_date[0]) if isinstance(w.expiration_date, list) else str(w.expiration_date) if w.expiration_date else None,
                "nameServers": w.name_servers if hasattr(w, 'name_servers') else [],
                "status": w.status if hasattr(w, 'status') else None,
            }
        except Exception as e:
            self.results["errors"].append(f"WHOIS lookup failed: {str(e)}")
    
    def _check_ssl(self):
        """Check SSL certificate validity"""
        try:
            context = ssl.create_default_context()
            with socket.create_connection((self.domain, 443), timeout=5) as sock:
                with context.wrap_socket(sock, server_hostname=self.domain) as ssock:
                    cert = ssock.getpeercert()
                    
                    # Check if certificate is valid
                    not_after = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                    is_valid = not_after > datetime.now()
                    
                    self.results["sslValid"] = is_valid
                    self.results["sslExpiry"] = not_after.isoformat()
        except Exception as e:
            self.results["sslValid"] = False
            self.results["errors"].append(f"SSL check failed: {str(e)}")
    
    def _check_database_availability(self):
        """Check if domain already exists in database"""
        # TODO Phase 3: Query database
        # For now, mock: domains with "test" are unavailable
        
        if "test" in self.domain:
            self.results["isAvailable"] = False
            self.results["unavailableReason"] = "Domain already in analysis"
        else:
            self.results["isAvailable"] = True
    
    def _generate_suggestions(self):
        """Generate alternative domain suggestions"""
        base = self.domain.split('.')[0]
        tld = '.'.join(self.domain.split('.')[1:])
        
        suggestions = [
            f"new-{base}.{tld}",
            f"{base}-oficial.{tld}",
            f"{base}-site.{tld}",
            f"my{base}.{tld}",
            f"{base}.com.br" if not tld.endswith('.br') else f"{base}.com",
        ]
        
        self.results["suggestions"] = suggestions[:3]


def main():
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "Usage: python domain_validator.py <domain>"
        }))
        sys.exit(1)
    
    domain = sys.argv[1]
    validator = DomainValidator(domain)
    results = validator.validate()
    
    # Output JSON
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
