import { mockTasks } from "@/lib/mock-tasks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"

export default function TeamRolePage({ params }: { params: { role: string } }) {
  const { role } = params
  const tasks = mockTasks.filter((t) => t.role === role)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">งานสำหรับทีม {role}</h1>
        {tasks.length > 0 ? (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {task.title}
                    {task.status !== "completed" && (
                      <Badge variant="secondary" className="ml-2">
                        {task.status === "inProgress" ? "กำลังทำ" : "รอดำเนินการ"}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-1">
                  {task.orderId && <p>ออเดอร์: {task.orderId}</p>}
                  {task.dueDate && (
                    <p>กำหนดเสร็จ: {new Date(task.dueDate).toLocaleDateString("th-TH")}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">ไม่มีงานสำหรับบทบาทนี้</p>
        )}
      </div>
    </div>
  )
}
