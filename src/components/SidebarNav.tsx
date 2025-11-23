type SidebarNavProps = {
    items: readonly string[]
    active: string
    onNavigate: (id: string) => void
    isVisible?: boolean
}

export default function SidebarNav({ items, active, onNavigate, isVisible = true }: SidebarNavProps) {
    return (
        <nav className={`sidebar ${isVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
            {items.map(item => (
                <button
                    key={item}
                    type="button"
                    aria-current={item === active ? 'true' : undefined}
                    className={`sidebar-item${item === active ? ' active' : ''}`}
                    onClick={() => onNavigate(item)}
                >
                    <span className="arrow">→</span>
                    <span className="text-sm">{item}</span>
                </button>
            ))}
        </nav>
    )
}
