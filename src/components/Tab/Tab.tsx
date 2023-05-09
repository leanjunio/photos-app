
type TabProps = {
  tabs: string[];
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export function Tab({ tabs, activeTab, onTabChange }: TabProps) {
  return (
    <div className="nav border-b">
      {tabs.map((tab, i) => (
        <button className={`link ${activeTab === i ? 'wide' : ''}`} onClick={() => onTabChange(i)}>
          {tab}
        </button>)
      )}
    </div>
  )
}