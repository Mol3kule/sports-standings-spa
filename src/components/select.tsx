import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface iSelect {
    placeholder?: string;
    items: { value: string; label: string }[];
    value: string;
    onChange?: (value: string) => void;
    className?: string;
    selectContentClassName?: string;
    itemClassName?: string;
}

export const Select = ({
    placeholder,
    items,
    value,
    onChange,
    className,
    selectContentClassName,
    itemClassName,
}: iSelect) => {
    return (
        <ShadcnSelect value={value} onValueChange={onChange}>
            <SelectTrigger size="sm" className={cn('w-full font-semibold rounded-sm border-2', className)}>
                <SelectValue placeholder={placeholder ?? 'Select an option'} />
            </SelectTrigger>
            <SelectContent className={selectContentClassName}>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value} className={itemClassName}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadcnSelect>
    );
};
