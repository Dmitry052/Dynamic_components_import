import React from "react";

class TestImport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      componentDir: [
        "./components/T1",
        "./components/T2",
        "./components/T3",
        "./components/T4"
      ]
    };
  }

  componentWillMount() {
    this.state.componentDir.forEach((item, i) => {
      this.setState({
        components: {
          ...this.state.components,
          [`module-${i}`]: null
        }
      });
    });
  }

  async componentDidMount() {
    const { componentDir } = this.state;

    componentDir.forEach(async (path, i) => {
      /* eslint-disable prefer-template */
      const module = await import("" + path);
      this.setState({
        components: {
          ...this.state.components,
          [`module-${i}`]: module.default
        }
      });
    });
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
