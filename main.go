package main

import (
	"embed"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte
var app *App

func main() {

	// Create an instance of the app structure
	dev := false
	if os.Getenv("JP_DT_DEV") == "1" {
		dev = true
	}

	app = NewApp(dev)

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "wails-events",
		Width:            320,
		Height:           480,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		Frameless:        !dev,
		AlwaysOnTop:      !dev,
		StartHidden:      false,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
