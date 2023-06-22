"use client";
export function Refresh() {
  return (
    <button
      className="text-blue-500 hover:text-blue-700"
      onClick={() => {
        window.location.reload();
      }}
    >
      Reload
    </button>
  );
}
