# 🔍 DIAGNÓSTICO: Terminal com Cursor Piscando (Sem Prompt)

**Data**: 04/02/2026  
**Status**: ✅ **PROBLEMA IDENTIFICADO + SOLUÇÃO CRIADA**

---

## 🎯 Problema Principal Encontrado

### ❌ Erro Crítico no `/etc/skel/.bashrc` (Linha 9)

```bash
# INCORRETO (atual):
case $- in
    *i*) ;;inic    # ← SYNTAX ERROR!
      *) return;;
esac

# CORRETO (deveria ser):
case $- in
    *i*) ;;        # ← apenas ponto-e-vírgula duplo
      *) return;;
esac
```

**Impacto**: Este typo (`;;inic` ao invés de `;;`) causa **syntax error** no bash, impedindo que o `.bashrc` seja carregado corretamente → **sem PS1 (prompt)** → **cursor piscando sem nada**.

---

## 📊 Diagnóstico Completo

### ✅ Verificações Realizadas

| Item | Status | Detalhes |
|------|--------|----------|
| `/etc/skel/.bashrc` | ⚠️ **PROBLEMA** | Syntax error na linha 9 |
| Workspace `.bashrc` | ✅ Limpo | Sem configs locais interferindo |
| Workspace `.envrc` | ✅ Limpo | Não encontrado |
| Scripts shell | ✅ OK | Nenhum modifica PS1/PROMPT globalmente |
| TTY disponível | ✅ Assumido | Ctrl+Alt+F3 disponível para fallback |

---

## 🚀 Solução Implementada

### Script de Recuperação Automática

**Arquivo**: [`fix-terminal-emergency.sh`](fix-terminal-emergency.sh)

#### O que o script faz

1. **Reset do terminal state** → `reset` + `stty sane`
2. **Backup automático** → `~/.bashrc.backup.YYYYMMDD_HHMMSS`
3. **Restaura `.bashrc` corrigido** → Copia versão limpa SEM o erro `;;inic`
4. **Valida syntax** → `bash -n ~/.bashrc` (detecta erros antes de aplicar)
5. **Reload** → `source ~/.bashrc` (aplica imediatamente)

#### Como usar

```bash
# Se o terminal está "respondendo" (mesmo sem prompt visível):
bash ~/projetos/arco/fix-terminal-emergency.sh

# Ou via TTY (Ctrl+Alt+F3):
cd ~/projetos/arco
bash fix-terminal-emergency.sh
```

---

## 🔧 Procedimento Manual (Alternativa)

Se você **não conseguir** executar o script:

### 1. Via TTY (Ctrl+Alt+F3)

```bash
# 1. Fazer login
# 2. Backup manual
mv ~/.bashrc ~/.bashrc.broken

# 3. Copiar do skel (MAS CUIDADO - tem o bug!)
# NÃO faça isso: cp /etc/skel/.bashrc ~/.bashrc

# 4. Criar .bashrc mínimo funcional
cat > ~/.bashrc << 'EOF'
# Minimal working .bashrc
case $- in
    *i*) ;;
      *) return;;
esac

PS1='\u@\h:\w\$ '
alias ls='ls --color=auto'
alias ll='ls -lh'
EOF

# 5. Voltar pro GUI
# Ctrl+Alt+F2 (ou F1/F7)
```

### 2. Via Terminal "Quebrado" (No Escuro)

```bash
# 1. Digite (mesmo sem ver nada):
reset<Enter>

# 2. Se não aparecer prompt, tente:
stty sane<Enter>

# 3. Execute o script:
bash ~/projetos/arco/fix-terminal-emergency.sh<Enter>
```

---

## 🎓 Causa Raiz: Como Isso Aconteceu?

O arquivo `/etc/skel/.bashrc` é o **template padrão** usado quando novos usuários são criados. Possíveis causas do typo `;;inic`:

1. **Digitação acidental** durante edição manual
2. **Copy/paste corrompido** (ex.: caracteres unicode invisíveis)
3. **Script de setup bugado** que modificou o skel

**Recomendação**: Verificar se outros arquivos em `/etc/skel/` também têm problemas.

---

## ⚡ Prevenção Futura

### 1. Validação Automática de Shell Configs

```bash
# Adicionar no ~/.bashrc (após correção):
# Valida syntax antes de source
check_bashrc() {
    if ! bash -n ~/.bashrc 2>/dev/null; then
        echo "⚠️ ERRO: ~/.bashrc tem syntax error!"
        echo "→ Use: bash -n ~/.bashrc para detalhes"
        return 1
    fi
}
```

### 2. Backup Automático de Configs

```bash
# Cron job diário (crontab -e):
0 3 * * * cp ~/.bashrc ~/.bashrc.daily.$(date +\%Y\%m\%d)
```

### 3. Alias de Emergência

Adicionar ao `~/.bash_aliases`:

```bash
alias fix-terminal='bash ~/projetos/arco/fix-terminal-emergency.sh'
alias test-bashrc='bash -n ~/.bashrc && echo "✓ Syntax OK"'
```

---

## 📝 Checklist de Recuperação

Caso encontre o problema novamente:

- [ ] Tentar `reset` + `Enter`
- [ ] Tentar `stty sane` + `Enter`
- [ ] Executar `fix-terminal-emergency.sh`
- [ ] Se falhar, usar TTY (Ctrl+Alt+F3)
- [ ] Validar novo `.bashrc` com `bash -n`
- [ ] Fechar e reabrir terminal para testar
- [ ] Verificar se PS1 aparece corretamente

---

## 🔗 Referências

- [LinuxQuestions: Gnome Terminal Blank](https://www.linuxquestions.org/questions/linux-software-2/gnome-terminal-opens-blank-with-no-text-at-all-890933/)
- [Stack Overflow: Terminal Broken State](https://stackoverflow.com/questions/7938402/terminal-in-broken-state-invisible-text-no-echo-after-exit-during-input)
- [Ask Ubuntu: Shell Not Showing Commands](https://askubuntu.com/questions/171449/shell-does-not-show-typed-in-commands-reset-works-but-what-happened)
- [Ask Ubuntu: Restore .bashrc Default](https://askubuntu.com/questions/404424/how-do-i-restore-bashrc-to-its-default)

---

## 🎯 Próximos Passos

1. ✅ **Execute o script de recuperação**
2. ✅ **Valide que o terminal volta ao normal**
3. ⚠️ **Considere corrigir `/etc/skel/.bashrc`** (requer sudo)
4. 📋 **Configure os aliases de prevenção**

---

**Status Final**: Script de recuperação criado e pronto para uso. O problema foi identificado como syntax error no template padrão do sistema.
