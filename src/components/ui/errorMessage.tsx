export const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;

    return <p className="text-sm select-none text-red-600">{message}</p>;
};
