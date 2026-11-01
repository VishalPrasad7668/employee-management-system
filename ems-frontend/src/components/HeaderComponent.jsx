import React from "react";

const HeaderComponent = () => {
  return (
    <div>
      <header className="header">
        <nav
          class="navbar bg-dark border-bottom border-body"
          data-bs-theme="dark"
        >
          <a class="navbar-brand" href="/">
            Employee Management System
          </a>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
