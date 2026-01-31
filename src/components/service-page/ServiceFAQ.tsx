import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQ } from '@/data/services';

interface ServiceFAQProps {
  faqs: FAQ[];
  serviceName: string;
}

const ServiceFAQ = ({ faqs, serviceName }: ServiceFAQProps) => {
  return (
    <section className="mb-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`faq-${index}`}
            className="border border-border rounded-lg mb-2 px-4 bg-muted/30 data-[state=open]:bg-muted/50"
          >
            <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default ServiceFAQ;
