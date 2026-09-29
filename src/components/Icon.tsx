type IconName = 'dashboard' | 'library' | 'spark' | 'calendar' | 'analytics' | 'settings' | 'menu' | 'close' | 'logout' | 'upload' | 'arrow' | 'video' | 'check' | 'lock'

const paths: Record<IconName, string> = {
  dashboard: 'M3 3h8v8H3z M13 3h8v5h-8z M13 10h8v11h-8z M3 13h8v8H3z',
  library: 'M4 5h16v14H4z M8 3v2 M16 3v2 M4 9h16 M10 12l5 3-5 3z',
  spark: 'M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z M19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z',
  calendar: 'M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16',
  analytics: 'M4 20V4 M4 20h16 M8 16l4-5 3 2 5-7',
  settings: 'M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M18.4 5.6l-2.1 2.1 M7.7 16.3l-2.1 2.1 M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M5 5l14 14 M19 5L5 19',
  logout: 'M10 4H5v16h5 M14 8l4 4-4 4 M8 12h10',
  upload: 'M12 16V4 M7 9l5-5 5 5 M4 17v3h16v-3',
  arrow: 'M5 12h14 M14 7l5 5-5 5',
  video: 'M4 5h12v14H4z M16 9l4-3v12l-4-3z',
  check: 'M5 12l5 5 9-10',
  lock: 'M5 10h14v11H5z M8 10V7a4 4 0 0 1 8 0v3',
}

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>
}
