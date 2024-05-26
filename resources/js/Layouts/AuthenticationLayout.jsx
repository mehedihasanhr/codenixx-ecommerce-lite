export default function AuthenticationLayout({ children }) {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-[450px] bg-white p-10 shadow rounded-xl">
                {children}
            </div>
        </div>
    );
}
