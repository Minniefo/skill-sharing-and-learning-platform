import React, { useEffect, useState } from 'react';
import { Question } from '../contexts/QuestionsContext';
import { PlusIcon, TrashIcon } from 'lucide-react';

interface QuestionFormProps {
  initialQuestion?: Question;
  onSubmit: (question: Question) => void;
  isLoading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  initialQuestion,
  onSubmit,
  isLoading
}) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);

  useEffect(() => {
    if (initialQuestion) {
      setQuestionText(initialQuestion.questionText);
      setOptions([...initialQuestion.options]);
      setCorrectOptionIndex(initialQuestion.correctOptionIndex);
    }
  }, [initialQuestion]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (index === correctOptionIndex) {
      setCorrectOptionIndex(0);
    } else if (index < correctOptionIndex) {
      setCorrectOptionIndex(correctOptionIndex - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredOptions = options.filter(option => option.trim() !== '');
    if (filteredOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }
    if (questionText.trim() === '') {
      alert('Please provide a question');
      return;
    }
    onSubmit({
      ...(initialQuestion?.id ? { id: initialQuestion.id } : {}),
      questionText,
      options: filteredOptions,
      correctOptionIndex: correctOptionIndex >= filteredOptions.length ? 0 : correctOptionIndex
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <div>
        <label
          htmlFor="questionText"
          className="block text-sm font-semibold text-gray-800 mb-2"
        >
          Question
        </label>
        <textarea
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Enter your question here"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Options
        </label>
        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="radio"
                name="correctOption"
                checked={correctOptionIndex === index}
                onChange={() => setCorrectOptionIndex(index)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="text-red-500 hover:text-red-700"
                disabled={options.length <= 2}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Option
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialQuestion ? 'Update Question' : 'Create Question'}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;