const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Cloudflare Blog. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with React, Cloudflare Pages, and D1 Database
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer