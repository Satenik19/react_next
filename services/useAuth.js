const useAuth = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('access_token');
    }

    return null;
};

export default useAuth;
