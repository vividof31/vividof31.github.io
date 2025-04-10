import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  // Format answer to handle newline characters correctly in HTML
  const formattedAnswer = answer.split('\n').map((line, index, arr) => (
    <React.Fragment key={index}>
      {line}
      {index < arr.length - 1 && <br />} {/* Add <br> except for the last line */}
    </React.Fragment>
  ));

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"> {/* Changed styling slightly */}
      <button
        onClick={onClick}
        className={`w-full flex justify-between items-center p-4 text-left transition-colors duration-200 ${isOpen ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 dark:text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        )}
      </button>
      {/* Use framer-motion for smooth expand/collapse? Optional enhancement */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px]' : 'max-h-0' // Adjust max-h as needed
        }`}
      >
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {/* Apply prose styles for better readability if needed */}
          <div className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none">
            {formattedAnswer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
