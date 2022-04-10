package bcrypting

import "golang.org/x/crypto/bcrypt"

func HashItem(item string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(item), 14)
	return string(bytes), err
}
