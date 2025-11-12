interface iFormWrapper extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export const FormWrapper = ({ children, ...formProps }: iFormWrapper) => {
    return (
        <form className="bg-[#f9fafb] space-y-4 rounded-md p-4" {...formProps}>
            {children}
        </form>
    );
};
