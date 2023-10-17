import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Index";
const data = [
  {
    title: "Item 1",
    description: "Description for Item 1",
    endpoint: "/endpoint1",
  },
  {
    title: "Item 2",
    description: "Description for Item 2",
    endpoint: "/endpoint2",
  },
  {
    title: "Item 3",
    description: "Description for Item 3",
    endpoint: "/endpoint3",
  },
  // Add more data as needed
];
const List = ({
  items,
}: {
  items: Array<{ title: string; description: string }>;
}) => (
  <div className="flex">
    <div className="flex-1">
      <p>abc</p>
      {items.map((item, index) => (
        <div key={index} className="border p-4">
          <div className="font-semibold text-lg">{item.title}</div>
        </div>
      ))}
    </div>
    <div className="flex-1">
      <p>bcd</p>
      {items.map((item, index) => (
        <div key={index} className="border p-4">
          <div className="text-gray-500">{item.description}</div>
        </div>
      ))}
    </div>
  </div>
);

function Review() {
  const sidebarToggle = useOutletContext() as () => void;
  const [activeButton, setActiveButton] = useState(0);

  const renderComponent = () => {
    switch (activeButton) {
      case 1:
        return <Component1 />;
      case 2:
        return <Component2 />;
      case 3:
        return <Component3 />;
      default:
        return null;
    }
  };

  const Component1 = () => (
    <div>
      <p>This is Component 1</p>
    </div>
  );

  const Component2 = () => (
    <div>
      <p>This is Component 2</p>
    </div>
  );

  const Component3 = () => (
    <div>
      <p>This is Component 3</p>
    </div>
  );

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div>
            <button
              className={`button ${
                activeButton === 1 ? "active bg-black" : ""
              }`}
              onClick={() => setActiveButton(1)}
            >
              1
            </button>
            <button
              className={`button ${
                activeButton === 2 ? "active bg-black" : ""
              }`}
              onClick={() => setActiveButton(2)}
            >
              2
            </button>
            <button
              className={`button ${
                activeButton === 3 ? "active bg-black" : ""
              }`}
              onClick={() => setActiveButton(3)}
            >
              3
            </button>
            {renderComponent()}
          </div>
        </div>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">List of Items</h1>
          <List items={data} />
        </div>
      </main>
    </>
  );
}

Review.propTypes = {};

export default Review;
