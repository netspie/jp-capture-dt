package features

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type JishoResponse struct {
	Data []JishoResponseData `json:"data"`
}

type JishoResponseData struct {
	Japanese []JishoResponseDataJapanese `json:"japanese"`
	Meanings []JishoResponseMeaning      `json:"senses"`
}

type JishoResponseDataJapanese struct {
	Word    string `json:"word"`
	Reading string `json:"reading"`
}

type JishoResponseMeaning struct {
	Meanings     []string `json:"english_definitions"`
	PartOfSpeech []string `json:"part_of_speech"`
}

func SearchJishoWord(word string) (*JishoResponse, error) {
	url := fmt.Sprintf("https://jisho.org/api/v1/search/words?keyword=%s", word)
	resp, err := http.Get(url)

	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result JishoResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}
