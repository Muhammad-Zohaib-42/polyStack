import { useAuthContext } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateArticleBtn = () => {
  const {user} = useAuthContext()
  const router = useRouter()

  function createArticleHandler() {
    if (!user) {
      router.push("/login")
    } else if (!user.isVerified) {
      router.push("/verify-email")
    } else if (!user.isLogin) {
      router.push("/login")
    }
  }

  return (
    <button onClick={createArticleHandler} className="px-3 md:px-5 py-0.5 ml-1 md:ml-2 flex items-center gap-1 rounded-full cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 outline-none">
      <Plus size={20} />
      <span className="font-semibold">Create</span>
    </button>
  );
};

export default CreateArticleBtn;
