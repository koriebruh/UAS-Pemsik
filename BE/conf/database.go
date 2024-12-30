package conf

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log/slog"
)

func InitDB() *gorm.DB {
	dsn := "root:korie123@tcp(127.0.0.1:3306)/pemiskuas?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	slog.Info("connection establish")
	return db
}
