import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function ShadcnDemo() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Shadcn UI Components Demo</h2>
        <p className="text-muted-foreground">
          All components are configured with the Antigravity theme colors
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Buttons</h3>
        <div className="flex gap-4 flex-wrap">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Badges</h3>
        <div className="flex gap-4 flex-wrap">
          <Badge>Default Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Card</h3>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Antigravity Directory</CardTitle>
            <CardDescription>
              A beautiful card component with purple theme colors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This card showcases the Antigravity theme applied to Shadcn UI components.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Input</h3>
        <Input placeholder="Enter text here..." className="max-w-md" />
      </div>
    </div>
  )
}
