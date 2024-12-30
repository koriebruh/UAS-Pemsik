package helper

import (
	"github.com/gofiber/fiber/v2"
	"koriebruh/pemsikAPI/domain"
	"net/http"
)

func SuccessRes(ctx *fiber.Ctx, data interface{}) error {
	return ctx.Status(http.StatusOK).JSON(domain.WebResponse{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	})
}
