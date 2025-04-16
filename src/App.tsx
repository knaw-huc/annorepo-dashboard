import './App.css'
import {ContainersPage} from "./ContainersPage.tsx";

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <div className="flex flex-col md:flex-row flex-grow">
          <aside
            className="w-full md:w-64 p-4 order-1 md:order-1 bg-gray-100"
          >
            <p className="text-xl font-bold text-gray-900">AnnoRepo Dashboard</p>
          </aside>
          <main className="flex-grow p-4 order-2 md:order-2">
            Admin &gt; Containers &gt;
          </main>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <aside
          className="w-full md:w-64 p-4 order-1 md:order-1 bg-gray-100"
        >
          <ul>
            <li>Containers</li>
            <li>Users</li>
            <li>Annotations</li>
            <li>Custom queries</li>
          </ul>
        </aside>
        <main className="flex-grow p-4 order-2 md:order-2">
          <ContainersPage/>
        </main>
      </div>
    </div>
  )
}
