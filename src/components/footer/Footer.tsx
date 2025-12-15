
const TAB_NAME = import.meta.env.VITE_TAB_NAME || "Me-Tab";

export default function Footer() {
  return (
    <footer className="">

      <span className="text-gray-500 text-sm">
        @{TAB_NAME}
      </span>
    </footer>
  )
}