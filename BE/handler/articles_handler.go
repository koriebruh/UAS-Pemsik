package handler

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"koriebruh/pemsikAPI/domain"
	"koriebruh/pemsikAPI/dto"
	"koriebruh/pemsikAPI/helper"
)

type ArticleHandler interface {
	Create(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
	GetAll(ctx *fiber.Ctx) error
}

type ArticleHandlerImpl struct {
	db *gorm.DB
	*validator.Validate
}

func NewArticleHandler(db *gorm.DB, validate *validator.Validate) *ArticleHandlerImpl {
	return &ArticleHandlerImpl{db: db, Validate: validate}
}

func (h ArticleHandlerImpl) Create(ctx *fiber.Ctx) error {
	var req dto.CreateArticleReq
	if err := ctx.BodyParser(&req); err != nil {
		return helper.ErrBadRequest(ctx, err)
	}
	//VALIDASI REQUEST
	if err := h.Validate.Struct(req); err != nil {
		return helper.ErrBadRequest(ctx, err)
	}

	//MAPING DATA
	data := domain.Article{
		Title:       req.Title,
		Description: req.Description,
		Content:     req.Content,
		Date:        req.Date,
		Author:      req.Author,
		Location:    req.Location,
		LinkImg:     req.LinkImg,
	}

	if err := h.db.Create(&data).Error; err != nil {
		return helper.ErrBadRequest(ctx, err)
	}

	return helper.SuccessRes(ctx, map[string]interface{}{
		"message": "success create new Article",
	})

}

func (h ArticleHandlerImpl) Update(ctx *fiber.Ctx) error {
	params := ctx.Params("id")

	var req dto.UpdateArticleReq
	if err := ctx.BodyParser(&req); err != nil {
		fmt.Println("eror sni")
		return helper.ErrBadRequest(ctx, err)
	}
	//VALIDASI REQUEST
	if err := h.Validate.Struct(req); err != nil {
		return helper.ErrBadRequest(ctx, err)
	}

	//MAPING DATA
	data := domain.Article{
		Title:       req.Title,
		Description: req.Description,
		Content:     req.Content,
		Date:        req.Date,
		Author:      req.Author,
		Location:    req.Location,
		LinkImg:     req.LinkImg,
	}

	if err := h.db.Model(&domain.Article{}).Where("id = ?", params).Updates(data).Error; err != nil {
		return helper.ErrBadRequest(ctx, err)
	}

	return helper.SuccessRes(ctx, map[string]interface{}{
		"message": "success update new Article",
	})

}

func (h ArticleHandlerImpl) Delete(ctx *fiber.Ctx) error {
	params := ctx.Params("id")

	if err := h.db.Where("id = ?", params).Delete(&domain.Article{}).Error; err != nil {
		return helper.ErrBadRequest(ctx, err)
	}

	response := fmt.Sprintf("success delete where id %s", params)
	return helper.SuccessRes(ctx, map[string]interface{}{
		"message": response,
	})
}

func (h ArticleHandlerImpl) GetAll(ctx *fiber.Ctx) error {
	var list []domain.Article
	if err := h.db.Find(&list).Error; err != nil {
		return helper.ErrBadRequest(ctx, err)
	}
	return helper.SuccessRes(ctx, list)
}
