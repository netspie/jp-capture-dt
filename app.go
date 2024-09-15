package main

import (
	"context"
	"encoding/json"
	"fmt"
	"jp-capture-dt/features"
	"os"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a App) domReady(ctx context.Context) {
}

func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

func (a *App) shutdown(ctx context.Context) {
}

func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Quit() {
	os.Exit(0)
}

func (a *App) ReadFile(fp string) string {
	bytes, _ := os.ReadFile(fp)
	os.WriteFile(fp, []byte{}, 0644)
	return string(bytes)
}

func (a *App) SearchJishoWord(word string) *features.JishoResponse {
	r, _ := features.SearchJishoWord(word)

	jsonData, _ := json.Marshal(r)
	os.WriteFile("search.txt", jsonData, 0644)

	return r
}
