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

// NOTE: NextAuth.js
// we will be using NextAuth.js to add authentication to this application. NextAuth.js make sign-in, sign-out and managing session much easier. 
// we can manually implement this features, the process can be time consuming. NextAuth.js simplifies the process.

// 1. we install the NextAuth.js to our application and then add the generated key into the Auth)_SECRET variable. the key is used to encrypt cookies, ensuring the security of user session. 

// adding the pages option
// auth.config.ts: this needs to be in the root of application, it needs to export an authConfig object, the is object will contain the configuration options for NextAuth.js 

// the authorized callback is used to verify if the request is authorized to access a page. it is called before a request is completed, and it receive an object with the auth and request properties. the auth property contain the user session, and the request contain the incoming request (url);

// the providers options is an array where you list different login options. for now it is empty to satisfy NextAuth config. 