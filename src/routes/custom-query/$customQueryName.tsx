import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/custom-query/$customQueryName')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/custom-query/$customQueryName"!</div>
}
