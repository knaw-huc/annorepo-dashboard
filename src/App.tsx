import './App.css'

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <p>annorepo-dashboard</p>
      </header>
      <div className="flex flex-col md:flex-row flex-grow">
        <aside
          className="w-full md:w-64 p-4 order-1 md:order-1 border-r"
        >
          <ul>
            <li>Home</li>
            <li>Containers</li>
          </ul>
        </aside>
        <main className="flex-grow p-4 order-2 md:order-2">
          <p>Content</p>
        </main>
      </div>
      <footer className="p-4 border-t">
        <p>Footer</p>
      </footer>
    </div>
  )
}
