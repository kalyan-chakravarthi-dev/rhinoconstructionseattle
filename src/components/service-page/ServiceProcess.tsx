import type { ProcessStep } from '@/data/services';

interface ServiceProcessProps {
  steps: ProcessStep[];
}

const ServiceProcess = ({ steps }: ServiceProcessProps) => {
  return (
    <section className="mb-12" aria-labelledby="process-heading">
      <h2 id="process-heading" className="text-2xl font-bold text-foreground mb-6">
        Our Process
      </h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div 
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"
          aria-hidden="true"
        />
        
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.step} className="relative pl-12">
              {/* Step number */}
              <div 
                className="absolute left-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm"
                aria-hidden="true"
              >
                {step.step}
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-2">
                  Step {step.step}: {step.title}
                </h3>
                <ul className="space-y-1">
                  {step.items.map((item, index) => (
                    <li 
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5 text-xs" aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
