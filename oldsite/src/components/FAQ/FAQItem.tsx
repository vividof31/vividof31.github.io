import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  const formattedAnswer = answer.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < answer.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full flex justify-between items-center p-4 bg-blue-50 dark:bg-gray-700 transition-all duration-200 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-lg shadow-sm`}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-left text-gray-900 dark:text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-blue-100 dark:border-gray-600 shadow-sm">
          <div className="text-gray-700 dark:text-gray-200">
            {formattedAnswer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQItem