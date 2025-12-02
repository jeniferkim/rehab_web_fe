// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="flex h-10 items-center justify-center border-t bg-white text-xs text-gray-400">
      © {new Date().getFullYear()} RehabAI · Personal Rehab Coach
      가천대학교 2025 2학기 P-실무프로젝트 컴퓨터공학과 JCDD
    </footer>
  );
}
