import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface iSelect {
    placeholder?: string;
    items: { value: string; label: string }[];
    value: string;
    onChange?: (value: string) => void;
    className?: string;
}

export const Select = ({ placeholder, items, value, onChange, className }: iSelect) => {
    return (
        <ShadcnSelect value={value} onValueChange={onChange}>
            <SelectTrigger size="sm" className={cn('w-full font-semibold rounded-sm border-2', className)}>
                <SelectValue placeholder={placeholder ?? 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadcnSelect>
    );
};
