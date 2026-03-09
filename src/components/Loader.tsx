import { motion } from "framer-motion";

type LoaderProps = {
  message?: string;
  position?: "center" | "onsite";
};

function Loader({message, position = "center"}: LoaderProps) {
  const _position = position === "center" ? "z-50 inset-0 fixed"  : "";
  return (
    <div className={` ${_position} flex-col gap-8 flex items-center justify-center `}>
      <motion.span
        initial={{ y: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        animate={{ y: [30, 0, 30] }}
        className="block w-7 h-7 rounded-full bg-[#175542]"
      ></motion.span>
      <motion.span
        transition={{ duration: 2, repeat: Infinity }}
        animate={{ width: [50, 0, 50] }}
        className=" rounded-lg  h-4 block bg-neutral-100"
      >
        {" "}
      </motion.span>
      <span className="text-xs text-neutral-400 shadow-sm">{message}</span>
    </div>
  );
}

export default Loader;
