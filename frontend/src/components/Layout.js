import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";
import Footer from "./Footer";

function Layout({ children, cartCount, setSearch, setSelectedCategory }) {

  return (
    <div>

      <Navbar cartCount={cartCount} setSearch={setSearch} />

      <CategoryBar setSelectedCategory={setSelectedCategory} />

      <div className="container-fluid">
        {children}
      </div>

    </div>
  );

}

export default Layout;