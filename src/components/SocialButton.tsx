import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SocialButtonProps {
    name: string;
    url: string;
    icon: string;
    onPress?: () => void;
    ariaLabel?: string;
    className?: string;
}

export default function SocialButton({ 
    name, 
    url, 
    icon, 
    onPress,
    ariaLabel = `Vaata ${name}`,
    className = ''
}: SocialButtonProps) {
    const handleClick = () => {
        if (onPress) return onPress();
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <Button
            onPress={handleClick}
            variant="tertiary"
            aria-label={ariaLabel}
            className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-2 transition-all duration-300 bg-white/5 border hover:bg-white/15 border-white/10 gap-1 sm:gap-2 ${className}`}
        >
            <Icon 
                icon={icon} 
                className="w-3 h-3 sm:w-4 sm:h-4" 
                aria-hidden="true"
            />
            <span className="font-medium text-xs sm:text-sm">{name}</span>
        </Button>
    );
};
