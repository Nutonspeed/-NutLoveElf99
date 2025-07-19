import { generateComponentMap } from '@/lib/componentMap'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'

export const metadata = { title: 'Component Map' }

export default async function ComponentMapPage() {
  const map = await generateComponentMap()
  const json = JSON.stringify(map, null, 2)
  const href = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Component Map</h1>
      <a href={href} download="component-map.json">
        <Button variant="secondary">Download JSON</Button>
      </a>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Pages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {map.map(item => (
            <TableRow key={item.component}>
              <TableCell className="font-mono">{item.component}</TableCell>
              <TableCell>
                {item.pages.map(p => (
                  <div key={p} className="font-mono text-xs">{p}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
