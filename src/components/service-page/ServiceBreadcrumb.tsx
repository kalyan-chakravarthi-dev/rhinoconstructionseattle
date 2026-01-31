import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface ServiceBreadcrumbProps {
  serviceName: string;
}

const ServiceBreadcrumb = ({ serviceName }: ServiceBreadcrumbProps) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-muted/50 border-b border-border"
    >
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link 
              to={ROUTES.HOME}
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </li>
          <li>
            <Link 
              to={ROUTES.SERVICES}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </li>
          <li>
            <span className="text-foreground font-medium" aria-current="page">
              {serviceName}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default ServiceBreadcrumb;
