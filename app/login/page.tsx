import AcmeLogo from '../ui/acme-logo';
import LoginForm from '../ui/login-form';

const LoginPage = () => {
  return (
    <main className=" flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;

// NOTE:
// Container '<main>':
// flex: apply flexbox layout
// items-center: aligns items vertically to center
// justify-center: center items horizontally 
// md:h-screen: set the height to full screen on medium devices and larger

// Inner Container '<div>':
// relative: position the element relative to its normal position
// mx-auto: Center the element horizontally with automatic margins
// flex: applies Flexbox layout.
// w-full: Set the width to 100%.
// max-w-[400px]: set a maximum width of 400px.
// flex-col: stack the children vertically
// space-y-2.5: Adds vertical spacing of 2.5 units between the children
// p-4: adds padding of 1rem (16px) on all sides
// md:-mt-32: apply a negative top margin of 8rem 128 px on medium devices and larger


// Logo Container "<div>";
// flex: applies flexbox layout.
// h-20: set 8rems 

// NextAuth.js
// NextAuth.js abstract away much of the complexity involved in managing sessions, sign-in and sign-out, and other aspect of authentication. while you can manually implement these features, the process can be time-consuming and error-prone. NextAuth.js simplifies the process, providing a unified solutions for auth in Next.js application.

// setting up NextAuth.js
//1. install the library
// 2. then add the generated key to AUTH_SECRET variable 
// 3. create auth.config.ts file at the root of your project that exports an authConfig object.this object will contain the configuration options for NextAuth.js for now it will only contain the page option.
