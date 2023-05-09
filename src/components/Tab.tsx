
type TabProps = {
  tabs: string[];
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export function Tab({ tabs, activeTab, onTabChange }: TabProps) {
  return (
    <nav className="nav border-b">
      {tabs.map((tab, i) => (
        <button key={i} className={`nav__link ${activeTab === i ? 'nav__link--wide' : ''}`} onClick={() => onTabChange(i)}>
          {tab}
        </button>)
      )}
    </nav>
  )
}