import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from './useAuth';

export function RouteGuard({ children }) {
    const router = useRouter();
    const isAuthenticated = useAuth();

    useEffect(() => {
        authCheck(router.asPath);
    }, []);

    function authCheck(url) {
        const publicPaths = ['/login', '/register'];
        const path = url.split('?')[0];

        if (isAuthenticated && publicPaths.includes(path)) {
            router.push({
                pathname: '/home',
            });
        }
    }

    return (children);
}
