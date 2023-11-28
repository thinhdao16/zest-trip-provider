/* eslint-disable @typescript-eslint/no-var-requires */

export const MyComponent = () => {
  return (
    <div>
      <h1>My SVG Component</h1>
      <img src={require("./my-svg-file.svg").default} alt="My SVG" />
    </div>
  );
};
