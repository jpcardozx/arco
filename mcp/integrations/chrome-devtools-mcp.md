# 🔧 Chrome DevTools MCP Integration - ARCO

## 📋 Overview

This integration connects ARCO with Chrome DevTools MCP server, enabling automated browser testing, performance monitoring, and quality assurance directly from AI assistants.

## 🚀 Quick Start

### 1. Install Chrome DevTools MCP

```bash
npm install -g chrome-devtools-mcp@latest
```

### 2. Configure Your MCP Client

Add both servers to your MCP client configuration (e.g., Claude Desktop, Cursor, VS Code Copilot):

#### **MCP Client Configuration (mcp_settings.json or equivalent)**

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--headless=false",
        "--isolated=false"
      ]
    },
    "arco-chrome-devtools": {
      "command": "node",
      "args": [
        "/home/jpcardozx/projetos/arco/mcp/servers/chrome-devtools-mcp-integration.js"
      ]
    }
  }
}
```

### 3. Build the Integration Server

```bash
cd /home/jpcardozx/projetos/arco/mcp
npx tsc servers/chrome-devtools-mcp-integration.ts --outDir servers/
```

### 4. Test the Integration

Ask your AI assistant:
```
Check the performance of http://localhost:3000 using ARCO Chrome DevTools
```

## 🎯 Available Tools

### 1. **arco_analyze_performance**
Comprehensive performance analysis of ARCO pages.

**Example:**
```
Analyze the performance of the ARCO homepage on mobile devices
```

**What it does:**
- Records performance trace
- Measures Core Web Vitals (LCP, FID, CLS)
- Analyzes JavaScript execution
- Provides optimization recommendations

---

### 2. **arco_visual_regression**
Visual regression testing for ARCO components.

**Example:**
```
Run visual regression test on the PremiumHeroSection component
```

**What it does:**
- Takes screenshots of components
- Compares with baseline images
- Reports visual differences
- Identifies unintended changes

---

### 3. **arco_lighthouse_audit**
Comprehensive Lighthouse audit for ARCO pages.

**Example:**
```
Run a Lighthouse audit on the ARCO homepage focusing on performance and accessibility
```

**What it does:**
- Performance score and metrics
- Accessibility compliance check
- SEO best practices
- PWA capabilities assessment

---

### 4. **arco_test_user_flow**
End-to-end user flow testing.

**Example:**
```
Test the contact form submission flow on ARCO
```

**What it does:**
- Automates user interactions
- Validates form submissions
- Checks navigation flows
- Captures screenshots at each step

---

### 5. **arco_analyze_network**
Network request analysis and optimization.

**Example:**
```
Analyze network requests on the ARCO homepage
```

**What it does:**
- Identifies slow requests
- Detects large payloads
- Analyzes third-party scripts
- Suggests optimization opportunities

---

### 6. **arco_analyze_bundle**
JavaScript bundle size analysis.

**Example:**
```
Analyze bundle sizes on ARCO and suggest code splitting opportunities
```

**What it does:**
- Measures bundle sizes
- Identifies unused code
- Suggests code splitting
- Analyzes third-party libraries

---

### 7. **arco_accessibility_scan**
Comprehensive accessibility testing.

**Example:**
```
Run an accessibility scan on the ARCO homepage for WCAG AA compliance
```

**What it does:**
- Checks color contrast
- Validates ARIA labels
- Tests keyboard navigation
- Checks screen reader compatibility

---

### 8. **arco_monitor_console_errors**
Real-time console error monitoring.

**Example:**
```
Monitor console errors on ARCO for 60 seconds
```

**What it does:**
- Detects JavaScript errors
- Catches network failures
- Reports console warnings
- Identifies uncaught exceptions

## 🎨 Use Cases

### **Development**
```
"Check if the new PremiumHeroSection causes any console errors"
"Analyze the performance impact of the latest changes"
```

### **QA & Testing**
```
"Run visual regression tests on all major components"
"Test the complete checkout flow and validate each step"
```

### **Performance Optimization**
```
"Analyze bundle sizes and suggest code splitting opportunities"
"Identify slow network requests on the homepage"
```

### **Accessibility**
```
"Run a comprehensive accessibility scan for WCAG AAA compliance"
"Check keyboard navigation on the contact form"
```

## ⚙️ Configuration Options

### Chrome DevTools MCP Options

```json
{
  "args": [
    "chrome-devtools-mcp@latest",
    "--headless=false",           // Show browser window
    "--isolated=true",            // Use temporary profile
    "--channel=stable",           // Chrome channel (stable/beta/canary)
    "--viewport=1920x1080",       // Initial viewport size
    "--logFile=./chrome-debug.log" // Debug log file
  ]
}
```

### ARCO Integration Options

The ARCO integration inherits Chrome DevTools MCP configuration and adds ARCO-specific context.

## 🔗 Integration with ARCO Workflow

### **CI/CD Pipeline**
```yaml
# .github/workflows/performance-check.yml
- name: Performance Analysis
  run: |
    npm install -g chrome-devtools-mcp@latest
    # Run ARCO performance tests
```

### **Pre-commit Hooks**
```bash
# Check for console errors before commit
npx chrome-devtools-mcp --headless=true
```

### **Automated Testing**
```bash
# Run visual regression suite
npm run test:visual-regression
```

## 📊 Performance Benchmarks

### **Expected Metrics for ARCO**

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Lighthouse Performance | >90 | TBD | ⏳ |
| First Contentful Paint | <1.8s | TBD | ⏳ |
| Largest Contentful Paint | <2.5s | TBD | ⏳ |
| Total Blocking Time | <200ms | TBD | ⏳ |
| Cumulative Layout Shift | <0.1 | TBD | ⏳ |
| Time to Interactive | <3.8s | TBD | ⏳ |

## 🐛 Troubleshooting

### **Issue: Chrome not starting**
```bash
# Solution: Use explicit executable path
"args": ["chrome-devtools-mcp@latest", "--executablePath=/usr/bin/google-chrome"]
```

### **Issue: Permission errors**
```bash
# Solution: Run with proper permissions or use isolated mode
"args": ["chrome-devtools-mcp@latest", "--isolated=true"]
```

### **Issue: MCP server not responding**
```bash
# Solution: Enable debug logging
"args": ["chrome-devtools-mcp@latest", "--logFile=./debug.log"]
# Then check the log file
```

### **Issue: Timeout errors**
```bash
# Solution: Increase timeout in configuration
export DEBUG=* # Enable verbose logging
```

## 📚 Additional Resources

- [Chrome DevTools MCP Documentation](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Puppeteer Documentation](https://pptr.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

## 🤝 Contributing

To add new ARCO-specific tools:

1. Add tool definition in `setupToolHandlers()`
2. Implement handler method
3. Document in this README
4. Add tests in `/mcp/testing/`

## 📝 Examples

### **Example 1: Complete Performance Audit**
```
Run a complete performance audit on ARCO:
1. Analyze performance on mobile and desktop
2. Run Lighthouse audit
3. Analyze network requests
4. Check bundle sizes
5. Monitor for console errors

Provide a comprehensive report with actionable recommendations.
```

### **Example 2: Pre-deployment Check**
```
Before deploying ARCO, run these checks:
1. Visual regression on all components
2. Accessibility scan (WCAG AA)
3. Performance analysis
4. Test critical user flows (contact form, navigation)

Report any issues found.
```

### **Example 3: Debug Production Issue**
```
Users are reporting slow page loads on the homepage:
1. Monitor console errors for 2 minutes
2. Analyze network requests
3. Check for JavaScript errors
4. Analyze bundle sizes
5. Provide root cause analysis
```

## 🎯 Roadmap

- [ ] Add screenshot comparison tool
- [ ] Integrate with ARCO analytics
- [ ] Add custom performance budgets
- [ ] Implement automated regression testing
- [ ] Add mobile device emulation presets
- [ ] Create visual test suite for all components
- [ ] Add performance monitoring dashboard
- [ ] Integrate with Sentry for error tracking

---

**Status:** ✅ Ready to Use  
**Last Updated:** 01/10/2025  
**Version:** 1.0.0
