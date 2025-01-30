import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const routes = [
    {
        href: "/main/dashboard/sent-requests",
        label: "Sent Requests",
    },
    {
        href: "/main/dashboard/received-requests",
        label: "Received Requests",
    },
    {
        href: "/main/dashboard/analytics",
        label: "Analytics",
    }

];

function DashboardNavbar() {
    const pathName = usePathname();
    const activeRoute = routes.find(route => {
        const routeSegments = route.href.split('/').filter(Boolean);
        const pathSegments = pathName.split('/').filter(Boolean);
        return routeSegments.every((seg, i) => pathSegments[i] === seg);
      }) || routes[0];
  return (
    <nav className="flex justify-between">
        {   
            routes.map((route) => (
                <Link key={route.label} href={route.href} className={`font-extrabold ${activeRoute==route? 'underline decoration-primary decoration-2 underline-offset-8 text-primary' : 'hover:text-primary'}`}>{route.label}</Link>
            ))
        }
    </nav>
  )
}

export default DashboardNavbar