import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
