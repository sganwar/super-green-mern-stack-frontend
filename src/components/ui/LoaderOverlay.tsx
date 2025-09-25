// overlay loader with full page covering
import React, {useEffect} from 'react';

interface LoaderOverlayProps {
    message?: string;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({message}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <div
                className="w-16 h-16 border-4 border-nature-primary border-solid rounded-full animate-spin border-t-transparent"
                style={{ borderColor: 'rgba(46, 125, 50, 0.2)', borderTopColor: '#2E7D32' }}
            ></div>
            <p className="mt-4 text-gray-700 text-center">{message}</p> 
            </div>
        </div>
    );
};

export default LoaderOverlay;