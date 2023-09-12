const Navbar = () => {
    return (
        <nav className="flex flex-row bg-white px-8 py-4 border-b-2">
            <h2>PMO Project</h2>
        </nav>
    )
}

const Home = () => {
    return (
        <section className="w-full min-h-screen">
            <Navbar />
        </section>
    )
}

export default Home;
