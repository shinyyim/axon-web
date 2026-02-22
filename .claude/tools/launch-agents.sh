#!/bin/bash
# DUNE.X — Launch All Agents in tmux split panes
# Usage: bash .claude/tools/launch-agents.sh

PROJECT_DIR="/Users/shinyim/Documents/2026/Sci-arc/SP.2026/02.Brand_shoe_new"
SESSION="dunex"

# Kill existing session if running
tmux kill-session -t $SESSION 2>/dev/null

# Create new session with first agent (Brand Strategy)
tmux new-session -d -s $SESSION -c "$PROJECT_DIR"
tmux send-keys -t $SESSION "claude --worktree brand-strategy" Enter

# Split right — Commercial Film
tmux split-window -t $SESSION -h -c "$PROJECT_DIR"
tmux send-keys -t $SESSION "claude --worktree commercial-film" Enter

# Split bottom-left — Spatial Design
tmux select-pane -t $SESSION:0.0
tmux split-window -t $SESSION -v -c "$PROJECT_DIR"
tmux send-keys -t $SESSION "claude --worktree spatial-design" Enter

# Split bottom-right — Web Platform
tmux select-pane -t $SESSION:0.2
tmux split-window -t $SESSION -v -c "$PROJECT_DIR"
tmux send-keys -t $SESSION "claude --worktree web-platform" Enter

# Attach to session
tmux attach -t $SESSION
