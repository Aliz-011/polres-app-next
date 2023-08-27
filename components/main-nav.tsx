import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      path: '/',
      label: 'Home',
      active: pathname === '/',
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          href={route.path}
          key={route.path}
          className={cn(
            'text-sm font-normal transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default MainNav;
