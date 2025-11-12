import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface iSelect {
    placeholder?: string;
    items: { value: string; label: string }[];
    value: string;
    onChange?: (value: string) => void;
}

export const Select = ({ placeholder, items, value, onChange }: iSelect) => {
    return (
        <ShadcnSelect value={value} onValueChange={onChange}>
            <SelectTrigger size="sm" className="w-full font-bold">
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
