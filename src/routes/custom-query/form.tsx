import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/custom-query/form')({
  component: () => {
    return <div>Hello "/custom-query/form"!</div>;
  },
})

