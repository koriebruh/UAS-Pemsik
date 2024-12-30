package domain

type Article struct {
	ID          string `gorm:"PrimaryKey; Autoincrement"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
	Date        string `json:"date"`
	Author      string `json:"author"`
	Location    string `json:"location"`
	LinkImg     string `json:"link_img"`
}
