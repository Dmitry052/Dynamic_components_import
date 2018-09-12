import React from "react";

class TestImport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: ["T1", "T2", "T3", "T4"],
      componentDir: "./components"
    };
  }

  componentWillMount() {
    this.state.files.forEach((item, i) => {
      this.setState({
        components: {
          ...this.state.components,
          [`module-${i}`]: null
        }
      });
    });
  }

  async componentDidMount() {
    const { files, componentDir } = this.state;

    try {
      files.forEach(async (fileName, i) => {
        /* eslint-disable prefer-template */
        const module = await import("" + `${componentDir}/${fileName}`);
        this.setState({
          components: {
            ...this.state.components,
            [`module-${i}`]: module.default
          }
        });
      });
    } catch (error) {
      console.info(error);
    }
  }

  render() {
    const { components } = this.state;

    return (
      <div>
        {Object.keys(components).map(name => {
          if (components[name]) {
            const component = components[name]();
            return React.cloneElement(component, { key: name });
          }
          return null;
        })}
      </div>
    );
  }
}

export default TestImport;
