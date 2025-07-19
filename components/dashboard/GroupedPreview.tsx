"use client"
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardQuickCard from '@/components/dashboard/DashboardQuickCard'
import { featureMap } from '@/lib/feature-map'

export default function GroupedPreview() {
  const [tab, setTab] = useState(featureMap[0]?.label ?? '')

  return (
    <Tabs value={tab} onValueChange={setTab} className="mb-4">
      <TabsList className="mb-2">
        {featureMap.map(group => (
          <TabsTrigger key={group.label} value={group.label}>
            {group.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {featureMap.map(group => (
        <TabsContent key={group.label} value={group.label}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map(item => (
              <DashboardQuickCard
                key={item.href}
                title={item.label}
                link={item.href}
                icon={<item.icon className="h-4 w-4" />}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
