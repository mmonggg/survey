import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const User = () => {
  const { handleSubmit, register } = useForm();
  const [questions, setQuestions] = useState([]);

  const onSubmit = (data) => {
    console.log("설문조사 응답:", data);
    // 여기에서 데이터를 서버에 전송하거나 다른 로직을 수행할 수 있습니다.
  };

  useEffect(() => {
    // 서버에서 질문 데이터를 가져와야 합니다.
    // 이 예시에서는 더미 데이터를 사용합니다.

    const dummy = [
      {
        id: 1,
        type: "radio",
        text: "가장 선호하는 계절은 무엇인가요?",
        options: ["봄", "여름", "가을", "겨울"],
      },
      {
        id: 2,
        type: "checkbox",
        text: "어떤 색상을 좋아하시나요?",
        options: ["빨강", "파랑", "초록"],
      },
      { id: 3, type: "text", text: "어떤 음식을 가장 좋아하시나요?" },
    ];

    setQuestions(dummy);
  }, []);

  return (
    <div className="User">
      <h1>설문조사</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((question) => (
          <div key={question.id}>
            <label>{question.text}</label>
            {question.type === "radio" && (
              <>
                {question.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      {...register(`question${question.id}`, {
                        required: true,
                      })}
                      value={option}
                    />
                    {option}
                  </label>
                ))}
              </>
            )}
            {question.type === "checkbox" && (
              <>
                {question.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      {...register(`question${question.id}`, {
                        required: true,
                      })}
                      value={option}
                    />
                    {option}
                  </label>
                ))}
              </>
            )}
            {question.type === "text" && (
              <textarea
                {...register(`question${question.id}`, { required: true })}
              />
            )}
          </div>
        ))}

        {/* 전송 버튼 */}
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default User;
