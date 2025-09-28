// components/ui/CustomToasterProvider.tsx
import { Toaster, ToastBar, toast } from 'react-hot-toast';

const CustomToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex flex-wrap justify-center">
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button
                  className='bg-gray-500 text-white rounded-md h-8 w-8 flex items-center justify-center hover:bg-gray-800'
                  onClick={() => toast.dismiss(t.id)}
                >
                  &times;
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default CustomToasterProvider;