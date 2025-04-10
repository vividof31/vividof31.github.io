import React from 'react';
import FAQItem from './FAQItem';

interface FAQListProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  openIndex: number | null;
  onToggle: (index: number) => void;
}

const FAQList: React.FC<FAQListProps> = ({ faqs, openIndex, onToggle }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => onToggle(index)}
        />
      ))}
    </div>
  );
};

export default FAQList;
