export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center items-center p-4">
      {year}. All right reserved.
    </footer>
  );
}
