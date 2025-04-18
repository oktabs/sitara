import Link from "next/link";

const TabLogin = () => {
  return (
    <div className="z-50 fixed top-5 left-0 right-0 flex items-center justify-center">
      <nav className="flex w-fit bg-white/50 backdrop-blur rounded-full">
        <ul className="p-2 flex justify-center items-center text-black/75">
          <li className="m-3">
            <Link className="text-xs" href="/">
              Beranda
            </Link>
          </li>
          <li className="px-5 py-3 text-white bg-blue-500 rounded-full">
            <Link className="text-xs" href="/auth/register/user">
              Belum punya Akun?
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TabLogin;
