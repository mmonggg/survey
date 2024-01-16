import React, { useState } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';

function Manager() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('radio');
  const [options, setOptions] = useState([]);
  const [isRequired, setIsRequired] = useState(false);
  const [textInput, setTextInput] = useState('');

  // 서버에 질문 목록 저장하는 함수
  const saveQuestionsToServer = async () => {
    try {
      // 서버 주소를 실제 주소로 대체해야 합니다.
      const response = await axios.post('http://example.com/saveQuestions', questions);

      if (response.status === 200) {
        console.log('질문 목록이 성공적으로 저장되었습니다.');
      } else {
        console.error('질문 목록 저장 실패');
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류 발생', error);
    }
  };

  const addQuestion = () => {
    if (questionText.trim() === '') return;

    const newQuestion = {
      text: questionText,
      type: questionType,
      options: questionType === 'text' ? null : options,
      required: isRequired,
      textInput: questionType === 'text' ? textInput : null,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setQuestionType('radio');
    setOptions([]);
    setIsRequired(false);
    setTextInput('');
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const changeQuestionOrder = (fromIndex, toIndex) => {
    const updatedQuestions = [...questions];
    const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedQuestion);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="Manager">
      <h1>설문조사 관리자</h1>
      <Form>
        <FormGroup controlId="questionText">
          <FormLabel>질문 텍스트</FormLabel>
          <FormControl
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="questionType">
          <FormLabel>질문 유형</FormLabel>
          <FormControl
            as="select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="radio">라디오 박스</option>
            <option value="checkbox">체크 박스</option>
            <option value="text">주관식</option>
          </FormControl>
        </FormGroup>
        {questionType !== 'text' && (
          <FormGroup controlId="options">
            <FormLabel>선택 항목</FormLabel>
            {options.map((option, index) => (
              <div key={index}>
                <FormControl
                  type={questionType === 'checkbox' ? 'checkbox' : 'radio'}
                  checked={option.checked || false}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index].checked = e.target.checked;
                    setOptions(updatedOptions);
                  }}
                />
                <FormControl
                  type="text"
                  value={option.text}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index].text = e.target.value;
                    setOptions(updatedOptions);
                  }}
                />
                <Button
                  variant="danger"
                  onClick={() => {
                    const updatedOptions = [...options];
                    updatedOptions.splice(index, 1);
                    setOptions(updatedOptions);
                  }}
                >
                  삭제
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setOptions([...options, { text: '', checked: false }])}
            >
              항목 추가
            </Button>
          </FormGroup>
        )}
        <FormGroup controlId="isRequired">
          <FormControl
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
          {' '}필수 여부
        </FormGroup>
        <Button onClick={addQuestion}>질문 추가</Button>
        <Button onClick={saveQuestionsToServer}>질문 목록 저장</Button>
      </Form>

      <h2>질문 목록</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {question.text}
            {' - '}
            {question.options && (
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <FormControl
                      type={question.type}
                      checked={option.checked || false}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optionIndex].checked = e.target.checked;
                        setQuestions(
                          questions.map((q, i) =>
                            i === index ? { ...q, options: updatedOptions } : q
                          )
                        );
                      }}
                    />
                    <FormControl
                      type="text"
                      value={option.text}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optionIndex].text = e.target.value;
                        setQuestions(
                          questions.map((q, i) =>
                            i === index ? { ...q, options: updatedOptions } : q
                          )
                        );
                      }}
                    />
                    <Button
                      variant="danger"
                      onClick={() => {
                        const updatedOptions = [...question.options];
                        updatedOptions.splice(optionIndex, 1);
                        setQuestions(
                          questions.map((q, i) =>
                            i === index ? { ...q, options: updatedOptions } : q
                          )
                        );
                      }}
                    >
                      삭제
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {question.type === 'text' && (
              <div>
                <FormLabel>주관식 텍스트</FormLabel>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={question.textInput || ''}
                  onChange={(e) => {
                    setQuestions(
                      questions.map((q, i) => (i === index ? { ...q, textInput: e.target.value } : q))
                    );
                  }}
                />
              </div>
            )}
            <Button onClick={() => deleteQuestion(index)}>삭제</Button>
            {' '}
            <Button
              onClick={() => changeQuestionOrder(index, index - 1)}
              disabled={index === 0}
            >
              위로
            </Button>
            {' '}
            <Button
              onClick={() => changeQuestionOrder(index, index + 1)}
              disabled={index === questions.length - 1}
            >
              아래로
            </Button>
            {' '}
            {question.required && '(필수)'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Manager;
