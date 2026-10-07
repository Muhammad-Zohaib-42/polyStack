import Link from "next/link";
import { useAuthContext } from "./AuthContext";

const DashboardLink = () => {
  const {user} = useAuthContext()

  return (
    <Link
      href={!user || !user.isLogin ? "/login" : !user.isVerified ? "/verify-email" : "/dashboard"}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500 text-white cursor-pointer transition-all duration-300 hover:bg-emerald-600 text-[15px] tracking-wide"
    >
      MZ
    </Link>
  );
};

export default DashboardLink;
