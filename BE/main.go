package main

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"koriebruh/pemsikAPI/conf"
	"koriebruh/pemsikAPI/handler"
	"log"
)

func main() {

	var DB = conf.InitDB()
	var validate = validator.New()

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
		AllowCredentials: false,
	}))

	articleHandler := handler.NewArticleHandler(DB, validate)
	articles := app.Group("/api/articles")

	articles.Get("/", articleHandler.GetAll)
	articles.Post("/", articleHandler.Create)
	articles.Put("/:id", articleHandler.Update)
	articles.Delete("/:id", articleHandler.Delete)

	if err := app.Listen(":3000"); err != nil {
		log.Fatalf("server terminated")
	}
}
