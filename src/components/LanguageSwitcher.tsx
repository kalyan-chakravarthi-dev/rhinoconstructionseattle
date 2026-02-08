import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact';
  className?: string;
}

const LanguageSwitcher = ({ variant = 'default', className }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={variant === 'compact' ? 'sm' : 'default'}
          className={cn(
            "flex items-center gap-2 hover:bg-muted/50",
            variant === 'compact' && "px-2",
            className
          )}
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className={cn("text-xl", variant === 'compact' ? 'hidden sm:inline' : '')}>
            {currentLang.flag} {variant === 'default' && <span className="text-sm">{currentLang.label}</span>}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              i18n.language === lang.code && "bg-muted"
            )}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
