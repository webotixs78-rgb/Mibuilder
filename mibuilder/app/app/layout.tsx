import { MondaySidebar } from "@/components/layout/monday-sidebar"
import { MondayContent } from "@/components/layout/monday-content"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <MondaySidebar />
      <div className="flex-1 flex flex-col">
        {children || <MondayContent />}
      </div>
    </div>
  )
}
