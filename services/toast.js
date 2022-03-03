import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const defaultPosition = toast.POSITION.TOP_RIGHT;

export const showToast = (type = 'success', msg, autoClose = 2000, className = 'primaryColor', position = defaultPosition) => {
    const params = {
        autoClose: autoClose === null ? 2000 : autoClose,
        className: className === null ? type === 'success' ? 'primaryColor' : 'dangerColor' : className,
        position,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    };
    if (type === 'success') {
        toast.success(msg, params);
    } else if (type === 'error') {
        toast.error(msg, params);
    }
};
