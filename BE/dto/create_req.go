package dto

type CreateArticleReq struct {
	Title       string `json:"title" validate:"required,min=3,max=255"`
	Description string `json:"description"`
	Content     string `json:"content" validate:"required,min=3,max=255"`
	Date        string `json:"date"`
	Author      string `json:"author"`
	Location    string `json:"location"`
	LinkImg     string `json:"link_img"`
}
