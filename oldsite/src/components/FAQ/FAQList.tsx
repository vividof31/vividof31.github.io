import React from 'react'
import FAQItem from './FAQItem'

interface FAQListProps {
  faqs: Array<{
    question: string
    answer: string
  }>
  openIndex: number | null
  onToggle: (index: number) => void
}

const FAQList = ({ faqs, openIndex, onToggle }: FAQListProps) => {
  // console.log('FAQs received by FAQList:', faqs); // Removed console log
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
  )
}

export default FAQList
