#!/bin/bash
# ===================================================================
# SCRIPT DE RECUPERAÇÃO EMERGENCIAL DO TERMINAL
# Execute este script para restaurar terminal quebrado
# ===================================================================

echo "🔧 INICIANDO RECUPERAÇÃO DO TERMINAL..."
echo ""

# 1. Reset do terminal state
echo "→ Resetando estado do terminal..."
reset 2>/dev/null || stty sane 2>/dev/null

# 2. Backup do .bashrc atual
if [ -f ~/.bashrc ]; then
    BACKUP="$HOME/.bashrc.backup.$(date +%Y%m%d_%H%M%S)"
    cp ~/.bashrc "$BACKUP"
    echo "✓ Backup criado: $BACKUP"
else
    echo "! ~/.bashrc não encontrado"
fi

# 3. Restaurar .bashrc do /etc/skel (corrigido)
echo "→ Restaurando .bashrc padrão corrigido..."

cat > ~/.bashrc << 'BASHRC_EOF'
# ~/.bashrc: executed by bash(1) for non-login shells.

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Alias definitions
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
BASHRC_EOF

echo "✓ ~/.bashrc restaurado com correções"

# 4. Validar syntax do novo .bashrc
echo "→ Validando syntax do .bashrc..."
if bash -n ~/.bashrc 2>/dev/null; then
    echo "✓ Syntax OK"
else
    echo "⚠ ERRO DE SYNTAX DETECTADO!"
    bash -n ~/.bashrc
    exit 1
fi

# 5. Reload do .bashrc
echo "→ Recarregando configurações..."
source ~/.bashrc

echo ""
echo "✅ RECUPERAÇÃO COMPLETA!"
echo ""
echo "Caso ainda veja problemas:"
echo "  1. Feche e reabra o terminal"
echo "  2. Se persistir, use Ctrl+Alt+F3 para TTY"
echo "  3. Execute: bash --login"
echo ""
