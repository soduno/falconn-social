"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const router = usePathname();
  const menuItems = [
    {
      title: 'Feed',
      icon: 'explore',
      url: '/'
    },
    {
      title: 'Discussions',
      icon: 'forum',
      url: '/discussions'
    },
    {
      title: 'Connections',
      icon: 'group',
      url: '/connections'
    },
    {
      title: 'Messages',
      icon: 'mail',
      url: '/messages'
    },
    {
      title: 'Settings',
      icon: 'settings',
      url: '/settings'
    }
  ]



  return (
    <div>
      <ul className="text-sm">
        {menuItems.map((item) => (
          <li key={item.url}>
            <Link
              className={`flex rounded-2xl my-1 hover:bg-black hover:font-bold hover:text-white py-3 px-8 ${(item.url == router) ? 'bg-black text-white font-bold ' : ''}`}
              href={item.url}>
              <div className="flex gap-3 items-center">
                <i className="text-lg material-symbols-rounded">{item.icon}</i>
                {item.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}