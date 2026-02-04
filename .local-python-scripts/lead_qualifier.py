#!/usr/bin/env python3
"""
ARCO - Lead Qualifier Script
Phase 3: Backend Integration

Qualifies lead based on provided data:
- Email validation (MX records, catch-all detection)
- Domain authority check
- Company size estimation
- Industry classification
- Lead score calculation (0-100)

Usage:
    python scripts/lead_qualifier.py '{"email": "...", "domain": "...", "name": "...", "phone": "..."}'
"""

import sys
import json
import re
import dns.resolver
from typing import Dict
from datetime import datetime

class LeadQualifier:
    def __init__(self, data: Dict):
        self.email = data.get('email', '').lower().strip()
        self.domain = data.get('domain', '').lower().strip()
        self.name = data.get('name', '').strip()
        self.phone = data.get('phone', '')
        
        self.results = {
            "timestamp": datetime.now().isoformat(),
            "leadScore": 0,
            "emailQuality": {},
            "domainAuthority": 0,
            "companySize": "unknown",
            "industry": "unknown",
            "qualificationLevel": "low",
            "flags": [],
        }
    
    def qualify(self) -> Dict:
        """Main qualification method"""
        try:
            # 1. Validate email quality
            self._validate_email_quality()
            
            # 2. Get domain authority (mock)
            self._get_domain_authority()
            
            # 3. Estimate company size (mock)
            self._estimate_company_size()
            
            # 4. Classify industry (mock)
            self._classify_industry()
            
            # 5. Calculate lead score
            self._calculate_lead_score()
            
            # 6. Determine qualification level
            self._determine_qualification_level()
            
        except Exception as e:
            self.results["error"] = str(e)
        
        return self.results
    
    def _validate_email_quality(self):
        """Validate email format and domain"""
        quality = {
            "isValid": False,
            "hasMxRecords": False,
            "isCatchAll": False,
            "isFreeEmail": False,
            "isDisposable": False,
        }
        
        # Validate format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        quality["isValid"] = bool(re.match(email_pattern, self.email))
        
        if not quality["isValid"]:
            self.results["emailQuality"] = quality
            return
        
        # Extract email domain
        email_domain = self.email.split('@')[1]
        
        # Check if free email
        free_email_domains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'mail.com', 'aol.com', 'protonmail.com'
        ]
        quality["isFreeEmail"] = email_domain in free_email_domains
        
        # Check MX records
        try:
            mx_records = dns.resolver.resolve(email_domain, 'MX')
            quality["hasMxRecords"] = len(list(mx_records)) > 0
        except:
            quality["hasMxRecords"] = False
        
        # TODO Phase 3: Check catch-all (requires SMTP connection)
        # For now, mock
        quality["isCatchAll"] = False
        
        # TODO Phase 3: Check disposable email list
        quality["isDisposable"] = False
        
        self.results["emailQuality"] = quality
    
    def _get_domain_authority(self):
        """Get domain authority score (mock)"""
        # TODO Phase 3: Integrate with Moz API or Ahrefs API
        # For now, mock based on domain characteristics
        
        score = 0
        
        # TLD scoring
        if self.domain.endswith('.com'):
            score += 20
        elif self.domain.endswith('.com.br'):
            score += 15
        elif self.domain.endswith('.org') or self.domain.endswith('.net'):
            score += 10
        
        # Domain length (shorter is usually better)
        if len(self.domain.split('.')[0]) < 8:
            score += 15
        elif len(self.domain.split('.')[0]) < 15:
            score += 10
        
        # Add random variation (0-25) to simulate real DA
        import random
        score += random.randint(0, 25)
        
        self.results["domainAuthority"] = min(score, 100)
    
    def _estimate_company_size(self):
        """Estimate company size (mock)"""
        # TODO Phase 3: Use LinkedIn API or similar
        # For now, simple heuristics
        
        size = "unknown"
        
        # If free email, likely small or individual
        if self.results["emailQuality"].get("isFreeEmail"):
            size = "small"
        else:
            # Corporate email suggests at least small/medium
            if self.results["domainAuthority"] > 50:
                size = "large"
            elif self.results["domainAuthority"] > 30:
                size = "medium"
            else:
                size = "small"
        
        self.results["companySize"] = size
    
    def _classify_industry(self):
        """Classify industry based on domain content (mock)"""
        # TODO Phase 3: Use ML classification or domain content analysis
        
        # Simple keyword matching
        keywords_map = {
            "tech": ["tech", "software", "app", "dev", "digital", "code"],
            "ecommerce": ["shop", "store", "buy", "sell", "market"],
            "finance": ["bank", "finance", "invest", "credit", "loan"],
            "health": ["health", "medical", "clinic", "hospital", "pharma"],
            "education": ["school", "university", "course", "education", "academy"],
            "services": ["service", "consult", "agency", "studio"],
        }
        
        domain_lower = self.domain.lower()
        
        for industry, keywords in keywords_map.items():
            if any(keyword in domain_lower for keyword in keywords):
                self.results["industry"] = industry
                return
        
        self.results["industry"] = "other"
    
    def _calculate_lead_score(self):
        """Calculate lead score (0-100)"""
        score = 0
        
        # Email quality (0-30 points)
        if self.results["emailQuality"].get("isValid"):
            score += 10
        if self.results["emailQuality"].get("hasMxRecords"):
            score += 10
        if not self.results["emailQuality"].get("isFreeEmail"):
            score += 10
        
        # Domain authority (0-40 points)
        score += min(self.results["domainAuthority"], 40)
        
        # Phone provided (0-10 points)
        if self.phone and len(self.phone) > 8:
            score += 10
        
        # Full name provided (0-10 points)
        if len(self.name.split()) >= 2:
            score += 10
        else:
            score += 5
        
        # Company size bonus (0-10 points)
        size_bonus = {
            "large": 10,
            "medium": 7,
            "small": 4,
            "unknown": 0,
        }
        score += size_bonus.get(self.results["companySize"], 0)
        
        self.results["leadScore"] = min(score, 100)
    
    def _determine_qualification_level(self):
        """Determine qualification level based on score"""
        score = self.results["leadScore"]
        
        if score >= 80:
            level = "high"
            self.results["flags"].append("Priority lead - immediate follow-up")
        elif score >= 60:
            level = "medium"
            self.results["flags"].append("Qualified lead - follow-up within 24h")
        elif score >= 40:
            level = "low"
            self.results["flags"].append("Needs nurturing")
        else:
            level = "very_low"
            self.results["flags"].append("Low quality - consider automated nurture")
        
        self.results["qualificationLevel"] = level


def main():
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "Usage: python lead_qualifier.py '{\"email\": \"...\", \"domain\": \"...\", ...}'"
        }))
        sys.exit(1)
    
    try:
        data = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        print(json.dumps({
            "error": "Invalid JSON input"
        }))
        sys.exit(1)
    
    qualifier = LeadQualifier(data)
    results = qualifier.qualify()
    
    # Output JSON
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
