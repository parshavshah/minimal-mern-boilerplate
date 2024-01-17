export default function Auth(props) {
  console.log(props);
  const { children } = props;
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="public/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {children}

          <p className="mt-10 text-center text-sm text-gray-500">
            Made with ❤️ By Parshav Shah
          </p>
        </div>
      </div>
    </>
  );
}
